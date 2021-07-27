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

export interface signinResponse {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    date_of_birth: Date;
    roleId: number;
  };
  token: string;
}


export interface PostUser {
  firstName: string;
  lastName: string;
  email: string;
 
  date_of_birth: Date;
  RoleId: number;
  profileImageUrl?:string
}



