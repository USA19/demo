import { Optional } from "sequelize";
export interface commentInterface {
  id: number;
  comment: string;
  rootId?: number;
}

export interface CommentCreationAttributes
  extends Optional<commentInterface, "id" | "rootId"> {}
