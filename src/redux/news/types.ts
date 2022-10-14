export interface INews {
  id: string;
  title: string;
  content: string;
  importance: string;
}

export interface NewsState {
  news: INews[];
}
