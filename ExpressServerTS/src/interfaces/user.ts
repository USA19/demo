import { Optional } from "sequelize";
export interface UserInterface {
  id: number;
  firstName: string;
  lastName: string;
  date_of_birth: Date;
  email: string;
  profileImageUrl?: string;
  password: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreationAttributes
  extends Optional<UserInterface, "id" | "bio" | "profileImageUrl"> {}
