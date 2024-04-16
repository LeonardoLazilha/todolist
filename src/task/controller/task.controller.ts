import { Request, Response } from "express";
import taskService from "../service/task.service";
import categoryService from "../../category/service/category.service";

class TaskController {
  async create(req: Request, res: Response) {
    try {
      const task = await taskService.create(req.body);
      return res.status(201).json(task);
    } catch (error: any) {
      return res.json({
        status: res.status(500),
        error: error.message,
      });
    }
  }

  async findAll(req: Request, res: Response) {
    const findedTasks = await taskService.findAll();
    return res.json(findedTasks);
  }

  async findById(req: Request, res: Response) {
    const findedTask = await taskService.findById(req.params.id);
    return res.json(findedTask);
  }

  async findByUserId(req: Request, res: Response) {
    const userId = req.params.userId;
    try {
      const userTasks = await taskService.findByUserId(userId);
      return res.status(200).json(userTasks);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "falha ao buscar tasks do usuário",
      });
    }
  }

  async filterTaskByCategory(req: Request, res: Response) {
    const categoryId = req.params.categoryId;
    try {
      const filteredTasks = await taskService.filterTaskByCategory(categoryId);
      return res.status(200).json(filteredTasks);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "erro ao filtrar tarefas por categoria",
      });
    }
  }

  async completedTasks(req: Request, res: Response) {
    const userId = req.params.userId;
    try {
      const completedTasks = await taskService.completedTasks();
      return res.status(200).json(completedTasks);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Falha ao buscar tasks concluídas",
      });
    }
  }

  async pendingTasks(req: Request, res: Response) {
    const userId = req.params.userId;
    try {
      const pendingTasks = await taskService.pendingTasks();
      return res.status(200).json(pendingTasks);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Falha ao buscar tasks concluídas",
      });
    }
  }

  async countUserTasks(req: Request, res: Response) {
    const userId = req.params.userId;
    try {
      const taskCount = await taskService.countUserTasks(userId);
      return res.status(200).json({ count: taskCount });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "falha ao contar tarefas do usuário",
      });
    }
  }

  async findLatestTaskByUser(req: Request, res: Response) {
    const userId = req.params.userId;
    try {
      const latestTask = await taskService.findLatestTaskByUser(userId);
      return res.status(200).json(latestTask);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "falha ao buscar tarefa mais recente do usuário",
      });
    }
  }

  async getTaskDetails(req: Request, res: Response) {
    const taskId = req.params.id;
    try {
      const taskDetails = await taskService.getTaskDetailsById(taskId);
      return res.status(200).json(taskDetails);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "falha ao buscar detalhes da tarefa",
      });
    }
  }

  async associateTaskWithCategory(req: Request, res: Response) {
    try {
      const { taskId, categoryId } = req.params;
      const updatedTask = await taskService.associateTaskWithCategory(
        taskId,
        categoryId
      );
      return res.status(200).json(updatedTask);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "falha ao associar task com a categoria",
      });
    }
  }
  
  async avgCompletedTasksByUser(req: Request, res: Response) {
    const userId = req.params.userId;
    try {
      const completedTasks = await taskService.avgCompletedTasksByUser(userId);
      const totalTasks = await taskService.countUserTasks(userId);
      const average = totalTasks > 0 ? completedTasks / totalTasks : 0;
      const formattedAvg = average.toFixed(2);
      return res.status(200).json({ average: `${formattedAvg}%` });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "falha ao calcular a media de tasks concluidas",
      });
    }
  }

  async longestDescriptionTask(req: Request, res: Response) {
    try {
      const longestDescription = await taskService.longestDescriptionTask();
      return res.status(200).json(longestDescription);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "falha ao buscar tarefa com maior descrição",
      });
    }
  }

  async OldestTaskByUser(req: Request, res: Response) {
    try {
      const userId = req.params.userId
      const oldestTask = await taskService.OldestTaskByUser(userId);
      return res.status(200).json(oldestTask);
    } catch (error) {
      return res.status(500).json({ 
        status: 500,
        message: 'Falha ao buscar tarefa mais antiga' 
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedTask = await taskService.update(id, req.body);
      return res.status(200).json(updatedTask);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "falha ao atualizar task",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const deletedTask = await taskService.delete(req.params.id);
      return res.status(200).json(deletedTask);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "falha ao deletar task",
      });
    }
  }
}

export default new TaskController();
