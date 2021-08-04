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
var database_1 = __importDefault(require("../config/database"));
var Post_model_1 = __importDefault(require("./Post.model"));
var PostMedia = /** @class */ (function (_super) {
    __extends(PostMedia, _super);
    function PostMedia() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PostMedia;
}(sequelize_1.Model));
PostMedia.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    mediaUrl: {
        type: sequelize_1.DataTypes.STRING(1000),
    },
}, {
    tableName: "postMedia",
    sequelize: database_1.default,
});
exports.default = PostMedia;
Post_model_1.default.hasMany(PostMedia);
PostMedia.belongsTo(Post_model_1.default);
