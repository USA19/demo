"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = void 0;
var fs_1 = __importDefault(require("fs"));
var deleteFile = function (filePath) {
    fs_1.default.unlink(filePath, function (err) {
        if (err) {
            throw err;
        }
    });
};
exports.deleteFile = deleteFile;