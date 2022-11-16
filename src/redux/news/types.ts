import { IUser, StatusEnum } from "../auth/types";

export enum NewsImportanceEnum {
  ALL = 'все',
  EASY = 'не очень важно',
  MEDIUM = 'средняя важность',
  HARD = 'очень важно'
}

export const allImportance = [
  {
    id: 0,
    color: '',
    title: NewsImportanceEnum.ALL.toString()
  },
  {
    id: 1,
    color: 'green',
    title: NewsImportanceEnum.EASY.toString()
  },
  {
    id: 2,
    color: 'yellow',
    title: NewsImportanceEnum.MEDIUM.toString()
  },
  {
    id: 3,
    color: 'red',
    title: NewsImportanceEnum.HARD.toString()
  },
];

export interface INews {
  _id: string;
  title: string;
  content: string;
  importance: string;
  viewsCount: number;
  user: IUser;
  createdAt: string;
  updatedTime: string;
  isEditable: boolean;
}

export interface NewsState {
  news: INews[];
  status: StatusEnum;
}
