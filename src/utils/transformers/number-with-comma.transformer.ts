import { MaybeType } from '../types/maybe.type';

export const numberWithCommaTransformer = (value: any): MaybeType<string> =>
  (value ?? '0').toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
