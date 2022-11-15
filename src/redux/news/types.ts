import { IUser, StatusEnum } from "../auth/types";

export enum NewsImportanceEnum {
  EASY = 'green',
  MEDIUM = 'yellow',
  HARD = 'red'
}

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
