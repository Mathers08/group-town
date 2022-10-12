export interface ITodo {
  id: string;
  title: string;
  content: string;
  isComplete: boolean;
}

export interface TodosState {
  todos: ITodo[];
}
