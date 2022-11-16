import { NewsImportanceEnum } from "../news/types";

export interface ISort {
  name: string;
  sortProperty: NewsImportanceEnum | 'все';
}

export interface FilterState {
  searchValue: string,
  categoryId: number,
  sortType: ISort
}
