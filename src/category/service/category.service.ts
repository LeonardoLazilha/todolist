import categoryModel from "../schemas/category.schema";

class CategoryService {
  async create(category: any) {
    const createdCategory = await categoryModel.create(category);
    return createdCategory;
  }

  async findAll() {
    const findedCategories = await categoryModel.find();
    return findedCategories;
  }

  async findById(id: string) {
    const findedCategory = await categoryModel.findById(id);
    return findedCategory;
  }

  async getCategoryDetailsById(id: string) {
    const categoryDetails = await categoryModel
      .findById(id)
      .select("description status -_id");
    return categoryDetails;
  }

  // como associar?
  async findAllByUserId(userId: string) {
    const userCategories = await categoryModel.find({ user: userId });
    return userCategories;
  }

  async update(id: string, newData: any) {
    const updatedCategory = await categoryModel.findByIdAndUpdate(id, newData, {
      new: true,
    });
    return updatedCategory;
  }

  async delete(id: any) {
    const deletedTask = await categoryModel.deleteOne({ _id: id });
    return deletedTask;
  }
}

export default new CategoryService();
