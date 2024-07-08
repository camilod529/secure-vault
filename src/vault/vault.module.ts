import { Module } from '@nestjs/common';
import { VaultService } from './vault.service';
import { VaultController } from './vault.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vault } from './entities/vault.entity';

@Module({
  controllers: [VaultController],
  providers: [VaultService],
  imports: [TypeOrmModule.forFeature([Vault]), AuthModule],
})
export class VaultModule {}
