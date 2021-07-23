import Role from "../Model/Role.model";
import { Request, NextFunction, Response } from "express";

interface roleBody extends Request {
  body: {
    name: string;
  };
}
export const postAddRole = async (
  req: roleBody,
  res: Response,
  next: NextFunction
) => {
  try {
    let role = await Role.findOne({
      where: {
        name: req.body.name.toLowerCase(),
      },
    });
    if (!role) {
      role = new Role({
        name: req.body.name.toLowerCase(),
      });
      await role.save();
    }
    res.status(200).json(role);
  } catch (e) {
    res.status(500).json({ message: "something went wrong in postAddRole" });
    console.trace(e);
  }
};

export const deleteRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) {
      return res.status(400).json({ message: "no role exist with that id" });
    }
    await Role.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "role has been deleted successfully" });
  } catch (e) {
    res
      .status(500)
      .json({ message: "something went wrong in deleting Roles category" });
    console.trace(e);
  }
};