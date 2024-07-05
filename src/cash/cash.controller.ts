import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CashService } from './cash.service';
import { CreateCashDto } from './dto/create-cash.dto';
import { UpdateCashDto } from './dto/update-cash.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';

@Controller('transactions')
export class CashController {
  constructor(private readonly cashService: CashService) {}

  @Auth()
  @Post()
  create(@Body() createCashDto: CreateCashDto, @GetUser() user: User) {
    return this.cashService.create(createCashDto, user);
  }

  @Get()
  findAll() {
    return this.cashService.findAll();
  }

  @Get(':query')
  findOne(@Param('query') query: string) {
    return this.cashService.findOne(query);
  }

  @Patch(':id')
  @Auth()
  update(
    @Param('id') id: string,
    @Body() updateCashDto: UpdateCashDto,
    @GetUser() user: User,
  ) {
    return this.cashService.update(id, updateCashDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cashService.remove(id);
  }
}
