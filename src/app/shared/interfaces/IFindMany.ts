import { IBaseModel } from './IBaseModel';

export interface IFindMany<T = IBaseModel> {
  data: T[];
  page: number;
  total: number;
}
