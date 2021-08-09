import { Association, DataTypes, Model } from "sequelize";
import "reflect-metadata";
import { ObjectType, Field } from "type-graphql";

import { UserInterface, UserCreationAttributes } from "../interfaces/user";
import Role from "./Role.model";
import sequelize from "../config/database";

@ObjectType()
class User
  extends Model<UserInterface, UserCreationAttributes>
  implements UserInterface
{
  @Field()
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  @Field()
  public name!: string;
  @Field()
  public firstName!: string;
  @Field()
  public lastName!: string;
  @Field()
  public email!: string;

  @Field() // timestamps!
  date_of_birth!: Date;

  @Field({ nullable: true })
  bio!: string;
  @Field({ nullable: true })
  profileImageUrl!: string;
  @Field()
  password!: string;
  @Field({ nullable: true })
  RoleId!: number;

  @Field()
  public readonly createdAt!: Date;
  @Field()
  public readonly updatedAt!: Date;
  @Field((type) => Role, { nullable: true })
  public readonly role?: Role;

  public static associations: {
    RoleId: Association<User, Role>;
  };
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
    },

    lastName: {
      type: DataTypes.STRING,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "email",
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    bio: {
      type: DataTypes.STRING,
    },
    profileImageUrl: {
      type: DataTypes.STRING,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    sequelize, // passing the `sequelize` instance is required
  }
);

Role.hasOne(User);
User.belongsTo(Role);

export default User;
