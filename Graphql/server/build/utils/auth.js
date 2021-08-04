"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config/config"));
var isAuthenticated = function (req, res, next) {
    try {
        var header = req.headers["authorization"];
        if (typeof header === "undefined") {
            return res
                .status(401)
                .json({ message: "authentication credentials are not provided" });
        }
        var token = header.split(" ")[1];
        if (!token) {
            return res
                .status(401)
                .json({ message: "authentication credetils were not provided" });
        }
        var decoded = jsonwebtoken_1.default.verify(token, config_1.default.JWTKEY);
        req.userId = decoded.userId;
        next();
    }
    catch (e) {
        console.log("problem is here in authenticating a user" + e);
        return res.status(500).json({ message: "Server side Error isAuth" });
    }
};
exports.isAuthenticated = isAuthenticated;
// export const isAdmin = async (
//   req: authBody,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const user = await User.findByPk(req.body.userId);
//     if (user && user.RoleId !== 2) {
//       return res.status(400).json({ message: "not authenticated" });
//     }
//     req.user && (req.user.isAdmin = true);
//     next();
//   } catch (e) {
//     console.trace(e);
//     console.log("problem is here in util is Admin");
//     return res.status(500).json({ message: "Server side Error isAdmin" });
//   }
// };
