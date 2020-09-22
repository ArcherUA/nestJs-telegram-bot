import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'usdRateArchive' })
export class UsdRateArchive extends BaseEntity<UsdRateArchive> {
  @Column()
  buy: string;

  @Column()
  sale: string;
}
