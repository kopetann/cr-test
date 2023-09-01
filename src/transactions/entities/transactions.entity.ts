import { Entity } from 'typeorm';
import { CommonEntity } from '../../common/entities/common.entity';

@Entity('transactions')
export class TransactionsEntity extends CommonEntity {}
