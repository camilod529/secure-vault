import { Injectable } from '@nestjs/common';
import { CreateVaultDto } from './dto/create-vault.dto';
import { UpdateVaultDto } from './dto/update-vault.dto';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class VaultService {
  create(createVaultDto: CreateVaultDto, user: User) {
    return 'This action adds a new vault';
  }

  findAll() {
    return `This action returns all vault`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vault`;
  }

  update(id: number, updateVaultDto: UpdateVaultDto) {
    return `This action updates a #${id} vault`;
  }

  remove(id: number) {
    return `This action removes a #${id} vault`;
  }
}
