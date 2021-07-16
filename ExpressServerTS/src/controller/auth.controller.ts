import { Request, NextFunction, Response } from "express";
import UserModel from "../Model/user.model.js";
import { UserInterface } from "../interfaces/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config";

interface loginBody extends Request {
  body: { email: string; password: string };
}

interface signupBody extends Request {
  body: UserInterface;
}
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user: UserInterface = (await UserModel.findOne({
      where: { email: email },
    })) as unknown as UserInterface;

    console.log("USER >>>>", user);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User With this email does not exist" });
    }

    const doMatch = bcrypt.compareSync(password, user.password);
    if (!doMatch) {
      return res
        .status(400)
        .json({ message: "you have entered wrong email or password" });
    }
    const token = jwt.sign({ userId: user.id }, config.JWTKEY, {
      expiresIn: "365d",
    });
    res.status(200).json({ user, token });
  } catch (e) {
    console.trace(e);
    res.status(200).json({ messsage: "something went wrong in login" });
  }
};

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("ey");
    const userBody = req.body as UserInterface;
    const email = userBody.email;
    const password = userBody.password;

    const user = await UserModel.findOne({ where: { email: email } });
    if (user) {
      return res
        .status(400)
        .json({ message: "the user with this email already exist try other" });
    }
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    // const newUser = new UserModel({
    // firstName: userBody.firstName.toString(),
    // lastName: userBody.lastName.toString(),
    // date_of_birth: new Date(userBody.date_of_birth),
    // email: email.toString(),
    // password: hashedPassword.toString(),
    // });
    // const newUse = await UserModel.create({
    //   firstName: userBody.firstName,
    //   lastName: userBody.lastName.toString(),
    //   date_of_birth: new Date(userBody.date_of_birth),
    //   email: email.toString(),
    //   password: hashedPassword.toString(),
    // });
    // await newUser.save();

    res.status(200).json({ message: "user created successfully" });
  } catch (e) {
    console.trace(e);
    res.status(200).json({ messsage: "something went wrong in login" });
  }
};

export default { login, signup };
