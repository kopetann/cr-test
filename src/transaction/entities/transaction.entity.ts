import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../../common/entities/common.entity';

@Entity('transactions')
export class TransactionEntity extends CommonEntity {
  @Column({
    nullable: true,
  })
  blockId: number;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column({
    type: 'bigint',
  })
  value: number;
}
