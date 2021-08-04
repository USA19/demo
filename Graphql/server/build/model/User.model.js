"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var Role_model_1 = __importDefault(require("./Role.model"));
var database_1 = __importDefault(require("../config/database"));
// const User: ModelDefined<UserInterface, UserCreationAttributes> =
//   sequelize.define(
//     "User",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true,
//       },
// firstName: {
//   type: DataTypes.STRING,
// },
// lastName: {
//   type: DataTypes.STRING,
// },
// email: {
//   type: DataTypes.STRING,
//   allowNull: false,
//   unique: "email",
// },
// date_of_birth: {
//   type: DataTypes.DATE,
//   allowNull: true,
// },
// bio: {
//   type: DataTypes.STRING,
// },
// profileImageUrl: {
//   type: DataTypes.STRING,
// },
// password: {
//   type: DataTypes.STRING,
//   allowNull: false,
// },
//     },
//     {
//       tableName: "users",
//       //sequelize: sequelize, // passing the `sequelize` instance is required
//     }
//   );
// export default User;
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return User;
}(sequelize_1.Model));
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: "email",
    },
    date_of_birth: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    bio: {
        type: sequelize_1.DataTypes.STRING,
    },
    profileImageUrl: {
        type: sequelize_1.DataTypes.STRING,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "users",
    sequelize: database_1.default,
});
// import * as Sequelize from "sequelize";
// import sequelize from "../config/database";
// export interface UserAddModel {
//   email: string;
//   password: string;
// }
// export interface UserModel extends Sequelize.Model<UserModel, UserAddModel> {
//   id: number;
//   email: string;
//   password: string;
//   createdAt: string;
//   updatedAt: string;
// }
// export interface UserViewModel {
//   id: number;
//   email: string;
// }
// export const User = sequelize.define<UserModel, UserAddModel>("users", {
//   // id: {
//   //   type: Sequelize.INTEGER,
//   //   autoIncrement: true,
//   //   primaryKey: true,
//   // },
//   email: Sequelize.STRING,
//   password: Sequelize.STRING,
// });
Role_model_1.default.hasOne(User);
User.belongsTo(Role_model_1.default);
exports.default = User;
