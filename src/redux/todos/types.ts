import { IUser, StatusEnum } from "../auth/types";

export interface ITodo {
  _id: string;
  title: string;
  content: string;
  isCompleted: boolean;
  isEditable: boolean;
  user: IUser;
}

export interface TodosState {
  todos: ITodo[];
  status: StatusEnum;
}
