import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsString, MinLength } from 'class-validator';

export class CreateCashDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty()
  @IsInt()
  amount: number;

  @ApiProperty()
  @IsString()
  @IsIn(['COP', 'USD', 'MXN', 'EUR'])
  currency: string;
}
