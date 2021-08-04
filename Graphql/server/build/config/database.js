"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var sequelize = new sequelize_1.Sequelize("sammy", "tecmint", "securep@wd", {
    dialect: "postgres",
    host: "localhost",
    define: {
        timestamps: true, // it auto create created_at, updated_at in every table
    },
});
// this is conntection string we made and exporting so that when our app starts
// this file hould run and we will connect to db
exports.default = sequelize;
