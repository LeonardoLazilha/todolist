import taskModel from "../schemas/task.schema";

class TaskService {
  //criar task
  async create(task: any) {
    const createdTask = await taskModel.create(task);
    return createdTask;
  }

  //todas as taks
  async findAll() {
    const findedTasks = await taskModel.find();
    return findedTasks;
  }

  //achar pelo id da task
  async findById(id: any) {
    const findedTask = await taskModel.findById({ _id: id });
    return findedTask;
  }

  //achar task por user id
  async findByUserId(userId: string) {
    const userTasks = await taskModel.find({ user: userId });
    return userTasks;
  }

  //filtrar task pela categoria
  async filterTaskByCategory(categoryId: string) {
    const tasks = await taskModel.find();
    const filteredTasks = tasks.filter(
      (task) => task.category?.toString() === categoryId
    );
    return filteredTasks;
  }

  //tasks concluidas
  async completedTasks() {
    const tasks = await taskModel.find();
    const completedTasks = tasks.filter((task) => task.status === "concluida");
    return completedTasks;
  }

  //tasks pendentes
  async pendingTasks() {
    const tasks = await taskModel.find();
    const pendingTasks = tasks.filter((task) => task.status === "pendente");
    return pendingTasks;
  }

  //numero de task do user
  async countUserTasks(userId: string) {
    const userTasks = await taskModel.find({ user: userId });
    const taskCount = userTasks.length;
    return taskCount;
  }

  //task mais recente
  async findLatestTaskByUser(userId: string) {
    const latestTask = await taskModel
      .findOne({ user: userId })
      .sort({ createdAt: -1 });
    return latestTask;
  }

  //pegar detalhes da task
  async getTaskDetailsById(id: string) {
    const taskDetails = await taskModel
      .findById(id)
      .select("description status -_id");
    return taskDetails;
  }

  //associar task e categoria
  async associateTaskWithCategory(taskId: string, categoryId: string) {
    const updatedTask = await taskModel.updateOne(
      { _id: taskId },
      { $set: { category: categoryId } }
    );
    return updatedTask;
  }

  //conclusao de task avg
  async avgCompletedTasksByUser(userId: string) {
    const tasks = await taskModel.find({ user: userId, status: "concluida" });
    const taskCompletedCount = tasks.length;
    return taskCompletedCount;
  }

  //task com descricao mais longa NAO DEU CERTO!!!
  async longestDescriptionTask() {
    const tasks = await taskModel.find();
    const longestDescription = tasks.reduce((taskAnterior, taskAtual) => {
      return taskAnterior.description.length > taskAtual.description.length
        ? taskAnterior
        : taskAtual;
    });
    return longestDescription.description;
  }

  //tarefa mais antiga do user
  async OldestTaskByUser(userId: string) {
    const oldestTask = await taskModel.findOne({ userId }).sort({ createdAt: 1 });
    return oldestTask;
  }

  //atualizar task
  async update(id: string, newData: any) {
    const updatedTask = await taskModel.findByIdAndUpdate(id, newData, {
      new: true,
    });
    return updatedTask;
  }

  //deletar task
  async delete(id: any) {
    const deletedTask = await taskModel.deleteOne({ _id: id });
    return deletedTask;
  }
}

export default new TaskService();
