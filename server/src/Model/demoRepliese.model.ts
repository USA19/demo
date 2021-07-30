// import { Association, DataTypes, Model } from "sequelize";
// import sequelize from "../config/database";
// import User from "./user.model";
// import Post from "./Post.model";
// import DemoComment from "./demoComments.mode";
// import {
//   commentInterface,
//   CommentCreationAttributes,
// } from "../interfaces/comment";

// class Reply
//   extends Model<commentInterface, CommentCreationAttributes>
//   implements commentInterface
// {
//   public id!: number; // Note that the `null assertion` `!` is required in strict mode.
//   public comment!: string;
//   rootId!: number;
//   PostId!: number;
//   public readonly createdAt!: Date;
//   public readonly updatedAt!: Date;

//   public static associations: {
//     User: Association<Reply, User>;
//     PostId: Association<Reply, Post>;
//   };
// }

// Reply.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     comment: {
//       type: DataTypes.STRING,
//     },
//   },
//   {
//     tableName: "comments",
//     sequelize, // passing the `sequelize` instance is required
//   }
// );

// DemoComment.hasMany(Reply, { as: "CommentId" });
// Reply.belongsTo(DemoComment);
// User.hasMany(Reply);
// Reply.belongsTo(User);
// // Post.hasMany(Reply);
// // Reply.belongsTo(Post);
// export default Reply;
