import { Request, Response } from "express";
import userService from "../service/user.service";

class UserController {
  async create(req: Request, res: Response) {
    try {
      const user = await userService.create(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.json({
        status: 500,
        message: "falha ao criar usuario",
      });
    }
  }

  async findAll(req: Request, res: Response) {
    const findedUsers = await userService.findAll();
    return res.json(findedUsers);
  }

  async findById(req: Request, res: Response) {
    const findedUsers = await userService.findById(req.params.id);
    return res.json(findedUsers);
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedUser = await userService.update(id, req.body);
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "falha ao atualizar usuário",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const deletedUser = await userService.delete(req.params.id);
      return res.status(200).json(deletedUser);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "falha ao deletar usuário",
      });
    }
  }
}

export default new UserController();
