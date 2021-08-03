import express from "express";
const router = express.Router();
import { updateUser } from "../controller/user.controller";
import { isAuthenticated } from "../utils/auth";

router.put("/edit", isAuthenticated, updateUser);

export default router;
