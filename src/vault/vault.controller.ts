import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VaultService } from './vault.service';
import { CreateVaultDto } from './dto/create-vault.dto';
import { UpdateVaultDto } from './dto/update-vault.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';

@Controller('vault')
@Auth()
export class VaultController {
  constructor(private readonly vaultService: VaultService) {}

  @Post()
  create(@Body() createVaultDto: CreateVaultDto, @GetUser() user: User) {
    return this.vaultService.create(createVaultDto, user);
  }

  @Get()
  findAll() {
    return this.vaultService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vaultService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVaultDto: UpdateVaultDto) {
    return this.vaultService.update(+id, updateVaultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vaultService.remove(+id);
  }
}
