export enum StatusEnum {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthday: string;
  email: string;
  password: string;
  avatarUrl?: string;
}

export interface AuthState {
  users: IUser[];
  data: IUser | null;
  status: StatusEnum;
}
