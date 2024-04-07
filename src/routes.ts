import { Router } from "express";
import userController from "./user/controller/user.controller";
import taskController from "./task/controller/task.controller";
import categoryController from "./category/controller/category.controller";

const routes = Router();

//-- User
routes.post("/user", userController.create);
routes.get("/users", userController.findAll);
routes.get("/user/:id", userController.findById);
routes.delete("/user/:id", userController.delete);
routes.put("/user/:id", userController.update);

//-- Tasks
routes.post("/task", taskController.create);
routes.delete("/task/:id", taskController.delete);
routes.get("/task", taskController.findAll);
routes.get("/task/:id", taskController.findById);
routes.put("/task/:id", taskController.update);
routes.get("/task/user/:userId", taskController.findByUserId);
routes.get("/task/:id/details", taskController.getTaskDetails);
routes.put("/task/:taskId/category/:categoryId",taskController.associateTaskWithCategory);
routes.get("/task/category/:categoryId", taskController.filterTaskByCategory);
routes.get("/task/completed/:userId", taskController.completedTasks);
routes.get("/task/pendind/:userId", taskController.pendingTasks);
routes.get("/task/count/:userId", taskController.countUserTasks);
routes.get("/task/latest/:userId", taskController.findLatestTaskByUser);

//-- Category
routes.post("/category", categoryController.create);
routes.get("/category", categoryController.findAll);
routes.get("/category/:id", categoryController.findById);
routes.delete("/category/:id", categoryController.delete);
routes.get("/category/user/:userId", categoryController.findAllByUserId);
routes.put("/category/:id", categoryController.update);

export { routes };
