export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  date_of_birth: Date;
  roleId: number;
}

export interface signin {
  email: string;
  password: string;
}
