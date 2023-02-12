export interface User {
  id?: number;
  password: string;
  firstName: string;
  lastName: string;
  salt?: string;
  token?: string;
}

export interface getUser {
  id: string;
  password: string;
  firstName: string;
  lastName: string;
  salt: string;
}
