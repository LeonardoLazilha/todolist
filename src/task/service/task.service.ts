import taskModel from '../schemas/task.schema'

class TaskService {
    async create(task: any) {
        const createdTask = await taskModel.create(task); 
        return createdTask;
    }

    async delete(id: any) {
        const deletedTask = await taskModel.deleteOne({_id: id})
        return deletedTask
    }

    async findAll() {
        const findedTasks = await taskModel.find();
        return findedTasks;
    }

    async findById(id: any) {
        const findedTask = await taskModel.findById({_id: id});
        return findedTask;
    }

    async update(id: string, newData: any) {
        const updatedTask = await taskModel.findByIdAndUpdate(id, newData, { new: true });
        return updatedTask;
    }

    async findAllByUserId(userId: string) {
        const userTasks = await taskModel.find({user: userId})
        return userTasks
    }

    async getTaskDetailsById(id: string) {
        const taskDetails = await taskModel.findById(id).select('description status -_id');
        return taskDetails;
    }

    async associateTaskWithCategory (taskId: string, categoryId: string) {
        const updatedTask = await taskModel.updateOne(
            { _id: taskId }, 
            { $set: { category: categoryId } }
    )}

    async filterTaskByCategory (categoryId: string) {
        const filteredTasks = await taskModel.find({ category: categoryId })
        return filteredTasks
    }

    async completedTasks(userId: string) {
        const completedTasks = await taskModel.find({ user: userId, status: 'concluida' });
        return completedTasks;
    }

    async pendingTasks(userId: string) {
        const pendingTasks = await taskModel.find({ user: userId, status: 'pendente' });
        return pendingTasks;
    }
    
    

    async countUserTasks(userId: string) {
        const taskCount = await taskModel.countDocuments({ user: userId });
        return taskCount;
    }
    
    async findLatestTaskByUser (userId: string) {
        const latestTask = await taskModel.findOne({user: userId}).sort({createdAt: -1})
        return latestTask
    }
}


export default new TaskService();
