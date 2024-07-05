import { Module } from '@nestjs/common';
import { CashService } from './cash.service';
import { CashController } from './cash.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cash } from './entities/cash.entity';

@Module({
  controllers: [CashController],
  providers: [CashService],
  imports: [TypeOrmModule.forFeature([Cash])],
})
export class CashModule {}
