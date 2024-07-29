import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { Exclude } from 'class-transformer';
import moment from 'moment/moment';
import { IsEmail } from 'class-validator';

@Entity({ name: 'email_code' })
export class EmailCode extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  code: string;

  @IsEmail()
  @Column()
  email: string;

  @Column()
  expireAt: Date;

  @BeforeInsert()
  async setExpireAt() {
    this.expireAt = moment().add(5, 'm').toDate();
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Exclude()
  __entity: string;
}
