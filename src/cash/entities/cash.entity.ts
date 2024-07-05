import { User } from 'src/auth/entities/user.entity';
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

  @Column('date', {
    default: new Date(),
  })
  created_at: Date;

  @Column('date', {
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
}
