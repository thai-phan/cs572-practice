export type User = {
  fullname: string,
  email: string,
  password: string,
  picture_url?: string;
};

export type Token = {
  _id: string,
  email: string,
  fullName: string;
};

export const Initial_State: Token = {
  _id: '',
  email: '',
  fullName: ''
};


export type Diary = {
  _id: string,
  user_id: string,
  title: string,
  description: string,
};

export interface StandardResponse<T> {
  success: boolean;
  data: T;
}
