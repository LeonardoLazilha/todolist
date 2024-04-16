import { Request, Response } from "express";
import categoryService from "../service/category.service";

class CategoryController {
  async create(req: Request, res: Response) {
    try {
      const category = await categoryService.create(req.body);
      return res.status(201).json(category);
    } catch (error) {
      return res.json({
        status: res.status(500),
        message: "falha ao criar usuario",
      });
    }
  }

  async findAll(req: Request, res: Response) {
    const findedCategories = await categoryService.findAll();
    return res.json(findedCategories);
  }

  async findById(req: Request, res: Response) {
    try {
      const categoryId = req.params.id;
      const findedCategory = await categoryService.findById(categoryId);
      return res.json(findedCategory);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "falha ao buscar categoria",
      });
    }
  }

  async getCategoryDetails (req: Request, res: Response) {
    const categoryId = req.params.id;
    try {
      const categoryDetails = await categoryService.getCategoryDetailsById(categoryId);
      return res.status(200).json(categoryDetails);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "falha ao buscar detalhes da categoria",
      });
    }
  }


  //como associar um user a uma categoria?
  async findAllByUserId(req: Request, res: Response) {
    const userId = req.params.userId;
    try {
      const userCategories = await categoryService.findAllByUserId(userId);
      return res.status(200).json(userCategories);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "falha ao buscar categorias do usuário",
      });
    }
  }

  async update(req: Request, res: Response) {
    const categoryId = req.params.id;
    const { name, color } = req.body;
    try {
      const updatedCategory = await categoryService.update(categoryId, {
        name,
        color,
      });
      return res.status(200).json(updatedCategory);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Falha ao atualizar categoria",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const deletedCategory = await categoryService.delete(req.params.id);
      return res.status(200).json(deletedCategory);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "falha ao deletar categoria",
      });
    }
  }
}

export default new CategoryController();
