import { Exclude, Expose, Transform } from 'class-transformer';
import moment from 'moment';

export class UserDto {
  @Exclude()
  password: string;

  @Exclude()
  public previousPassword: string;

  @Expose({ name: 'createdAt' })
  @Transform(
    ({ obj }) => {
      if (!obj.hasOwnProperty('createdAt')) {
        return null;
      }
      return moment(new Date(obj.createdAt)).format('YYYY.MM.DD HH:mm');
    },
    { toClassOnly: true },
  )
  createdAt: string;

  @Expose({ name: 'updatedAt' })
  @Transform(
    ({ obj }) => {
      if (!obj.hasOwnProperty('updatedAt')) {
        return null;
      }
      return moment(new Date(obj.createdAt)).format('YYYY.MM.DD HH:mm');
    },
    { toClassOnly: true },
  )
  updatedAt: string;

  @Exclude()
  deletedAt: string;

  @Exclude()
  __entity: string;
}
