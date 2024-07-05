import { Injectable } from '@nestjs/common';
import { CreateCashDto } from './dto/create-cash.dto';
import { UpdateCashDto } from './dto/update-cash.dto';

@Injectable()
export class CashService {
  create(createCashDto: CreateCashDto) {
    return 'This action adds a new cash';
  }

  findAll() {
    return `This action returns all cash`;
  }

  findOne(id: string) {
    return `This action returns a #${id} cash`;
  }

  update(id: string, updateCashDto: UpdateCashDto) {
    return `This action updates a #${id} cash`;
  }

  remove(id: string) {
    return `This action removes a #${id} cash`;
  }
}
