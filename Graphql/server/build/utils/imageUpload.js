"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userImageHandler = exports.postImageHandler = void 0;
var multer_1 = __importDefault(require("multer"));
var fileStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./images");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
var fileFilter = function (req, file, cb) {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
exports.postImageHandler = multer_1.default({
    storage: fileStorage,
    fileFilter: fileFilter,
}).any();
exports.userImageHandler = multer_1.default({
    storage: fileStorage,
    fileFilter: fileFilter,
}).single("image");