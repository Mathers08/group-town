export interface INews {
  id: string;
  title: string;
  content: string;
}

export interface NewsState {
  news: INews[];
}
