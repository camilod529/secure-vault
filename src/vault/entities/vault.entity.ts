import { User } from 'src/auth/entities/user.entity';
import { Cash } from 'src/cash/entities/cash.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vaults')
export class Vault {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  password: string;

  @Column('bool', {
    default: false,
  })
  deleted: boolean;

  @Column('timestamptz', {
    default: new Date(),
  })
  created_at?: Date;

  @Column('timestamptz', {
    nullable: true,
  })
  updated_at?: Date;

  @OneToMany(() => Cash, (c) => c.vault)
  money: Cash[];

  @OneToMany(() => User, (u) => u.vaults)
  users: User[];
}
