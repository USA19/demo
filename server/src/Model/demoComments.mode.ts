// import { Association, DataTypes, Model } from "sequelize";
// import sequelize from "../config/database";
// import User from "./user.model";
// import Post from "./Post.model";
// import DemoRepliese from "./demoRepliese.model";
// import {
//   commentInterface,
//   CommentCreationAttributes,
// } from "../interfaces/comment";

// class DemoComment
//   extends Model<commentInterface, CommentCreationAttributes>
//   implements commentInterface
// {
//   public id!: number; // Note that the `null assertion` `!` is required in strict mode.
//   public comment!: string;
//   rootId!: number;
//   PostId!: number;
//   public readonly createdAt!: Date;
//   public readonly updatedAt!: Date;
//   public Replies?: DemoRepliese[];
//   public static associations: {
//     User: Association<DemoComment, User>;
//     PostId: Association<DemoComment, Post>;
//   };
// }

// DemoComment.init(
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
// // Comment.isHierarchy();
// // Comment.hasMany(Comment);
// // Comment.belongsTo(Comment);
// // Comment.isHierarchy();
// User.hasMany(DemoComment);
// DemoComment.belongsTo(User);
// // Post.hasMany(DemoComment);
// // DemoComment.belongsTo(Post);
// export default DemoComment;
