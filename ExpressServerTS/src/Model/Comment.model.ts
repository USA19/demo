import { Association, DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import User from "./user.model";
import Post from "./Post.model";
import {
  commentInterface,
  CommentCreationAttributes,
} from "../interfaces/comment";

class Comment
  extends Model<commentInterface, CommentCreationAttributes>
  implements commentInterface
{
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public comment!: string;
  rootId!: number;
  // postId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public static associations: {
    rootId: Association<Comment, Comment>;
    user: Association<Comment, User>;
    postId: Association<Comment, Post>;
  };
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.STRING,
    },
    rootId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "comments",
    sequelize, // passing the `sequelize` instance is required
  }
);

Comment.hasMany(Comment);
Comment.belongsTo(Comment, { as: "root" });
User.hasMany(Comment);
Comment.belongsTo(User);
Post.hasMany(Comment);
Comment.belongsTo(Post);
export default Comment;
