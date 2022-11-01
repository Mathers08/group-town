export enum NewsStatusEnum {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

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
  user: { firstName: string, lastName: string };
  createdAt: string;
}

export interface NewsState {
  news: INews[];
  status: NewsStatusEnum;
}
