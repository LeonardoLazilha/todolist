import { Router } from "express";
import userController from "./user/controller/user.controller";
import taskController from "./task/controller/task.controller";
import categoryController from "./category/controller/category.controller";

const routes = Router();

//-- User
routes.post("/user", userController.create);
routes.get("/users", userController.findAll); // nao foi pedido mas fiz
routes.get("/user/:id", userController.findById);
routes.delete("/user/:id", userController.delete);
routes.put("/user/:id", userController.update);

//-- Tasks
routes.post("/task", taskController.create); //criar task
routes.delete("/task/:id", taskController.delete); //deletar task
routes.put("/task/:id", taskController.update); //atualizar task
routes.get("/task/user/:userId", taskController.findByUserId); //task por user
routes.get("/task/:id/details", taskController.getTaskDetails); // detalhes

// nao foi pedido mas fiz (task)
routes.put("/task/:taskId/category/:categoryId",taskController.associateTaskWithCategory); //associar task e categoria
routes.get("/task", taskController.findAll); //achar tds tasks
routes.get("/task/:id", taskController.findById); //achar task pelo taskId


//-- Category
routes.post("/category", categoryController.create);
routes.get("/category", categoryController.findAll);
routes.get("/category/:id", categoryController.findById);
routes.get("/category/:id", categoryController.getCategoryDetails)
routes.delete("/category/:id", categoryController.delete);
routes.get("/category/user/:userId", categoryController.findAllByUserId);
routes.put("/category/:id", categoryController.update);


//------ USANDO METODOS DE ARRAY
routes.get("/task/category/:categoryId", taskController.filterTaskByCategory); //filtar task por categoria
routes.get("/task/completed/:userId", taskController.completedTasks);
routes.get("/task/pendind/:userId", taskController.pendingTasks);
routes.get("/task/count/:userId", taskController.countUserTasks);
routes.get("/task/latest/:userId", taskController.findLatestTaskByUser);


//-Rota para calcular a média de conclusão das tarefas. OK
routes.get("/task/avgCompletedTasks/:userId", taskController.avgCompletedTasksByUser);

//Rota para encontrar a tarefa com a descrição mais longa. F
routes.get('/task/longestDescriptionTask', taskController.longestDescriptionTask);

//Rota para encontrar a tarefa mais antiga de um usuário. F
routes.get('/task/oldestTaskByUser/:userId', taskController.OldestTaskByUser);

export { routes };
