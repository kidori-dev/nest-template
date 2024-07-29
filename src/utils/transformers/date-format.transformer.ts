import { MaybeType } from '../types/maybe.type';
import moment from 'moment';

export const dateFormatTransformer = (value: string): MaybeType<string> =>
  moment(value).format('YYYY.MM.DD HH:mm');
