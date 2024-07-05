import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateCashDto } from './dto/create-cash.dto';
import { UpdateCashDto } from './dto/update-cash.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cash } from './entities/cash.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class CashService {
  private readonly logger = new Logger(CashService.name);

  constructor(
    @InjectRepository(Cash)
    private readonly cashRepository: Repository<Cash>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createCashDto: CreateCashDto, user: User) {
    try {
      const transaction = this.cashRepository.create({
        ...createCashDto,
        created_at: new Date(),
        createdBy: user,
      });

      await this.cashRepository.save(transaction);

      return transaction;
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async findAll() {
    try {
      return await this.cashRepository.find({
        where: { deleted: false },
        relations: ['createdBy'],
      });
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async findOne(query: string) {
    let transaction: Cash;
    if (isUUID) {
      transaction = await this.cashRepository.findOne({
        where: { id: query, deleted: false },
      });
    } else {
      transaction = await this.cashRepository.findOne({
        where: { name: query },
      });
    }
    if (!transaction)
      throw new NotFoundException(
        `Transaction with id or name ${query} not found`,
      );

    return transaction;
  }

  async update(id: string, updateCashDto: UpdateCashDto, user: User) {
    const transaction = await this.cashRepository.preload({
      id,
      ...updateCashDto,
      updated_at: new Date(),
    });
    if (!transaction)
      throw new NotFoundException(`Transaction with id ${id} not found`);

    try {
      transaction.createdBy = user;
      await this.cashRepository.save(transaction);

      return transaction;
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async remove(id: string) {
    const transaction = await this.cashRepository.findOneBy({ id });
    if (!transaction)
      throw new NotFoundException(`Transaction with id ${id} not found`);

    try {
      transaction.deleted = true;
      await this.cashRepository.save(transaction);
    } catch (error) {
      this.handleDBException(error);
    }
  }

  private handleDBException(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error occurred, check server logs',
    );
  }
}
