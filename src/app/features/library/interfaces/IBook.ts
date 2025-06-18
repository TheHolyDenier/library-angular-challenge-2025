import { GenreType } from '../types/GenreType';
import { IBaseModel } from '../../../shared/interfaces/IBaseModel';
import { IFormModel } from '../../../shared/interfaces/IFormModel';

export interface IBook extends IBaseModel {
  title: string;
  author: string;
  year: number;
  genre: GenreType;
}

export function bookToFormModel(book: IBook): IFormModel {
  return { ...book } as IFormModel;
}
