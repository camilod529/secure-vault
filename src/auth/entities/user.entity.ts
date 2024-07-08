import { Cash } from 'src/cash/entities/cash.entity';
import { Vault } from 'src/vault/entities/vault.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text', {
    select: false,
  })
  password: string;

  @Column('text')
  fullName: string;

  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  @Column('bool', {
    default: false,
  })
  deleted: boolean;

  @OneToMany(() => Cash, (c) => c.createdBy)
  transactions: Cash[];

  @ManyToOne(() => Vault, (v) => v.users, {
    eager: true,
    nullable: true,
  })
  vaults: Vault[];

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  emailToLowerCaseOnUpdate() {
    this.email = this.email.toLowerCase().trim();
  }
}
