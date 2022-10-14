export interface INews {
  id: string;
  title: string;
  content: string;
  importance: string;
  createdAt: string;
}

export interface NewsState {
  news: INews[];
}
