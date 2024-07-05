import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCashDto } from './create-cash.dto';
import { IsOptional } from 'class-validator';

export class UpdateCashDto extends PartialType(CreateCashDto) {
  @ApiProperty()
  // @IsDateString()
  @IsOptional()
  updated_at?: Date;
}
