import userModel from "../schemas/user.schema";

class UserService {
  async create(user: any) {
    const createdUser = await userModel.create(user);
    return createdUser;
  }

  async findAll() {
    const findedUsers = await userModel.find();
    return findedUsers;
  }

  async findById(id: any) {
    const findedUser = await userModel.findById(id);
    return findedUser;
  }

  async update(id: string, newData: any) {
    const updatedUser = await userModel.findByIdAndUpdate(id, newData, {
      new: true,
    });
    return updatedUser;
  }

  async delete(id: any) {
    const deletedUser = await userModel.deleteOne({ _id: id });
    return deletedUser;
  }
}

export default new UserService();
