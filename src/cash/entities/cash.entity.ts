import { User } from 'src/auth/entities/user.entity';
import { Vault } from 'src/vault/entities/vault.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transactions')
export class Cash {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('float')
  amount: number;

  @Column('text', {
    default: 'COP',
  })
  currency: string;

  @Column('timestamptz', {
    default: new Date(),
  })
  created_at?: Date;

  @Column('timestamptz', {
    nullable: true,
  })
  updated_at?: Date;

  @Column('bool', {
    default: false,
  })
  deleted: boolean;

  @ManyToOne(() => User, (u) => u.transactions, {
    eager: true,
  })
  createdBy: User;

  @ManyToOne(() => Vault, (u) => u.money, {
    eager: true,
  })
  vault: Vault;
}
