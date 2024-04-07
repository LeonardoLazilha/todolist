import mongoose, { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    color: { type: String, required: true },
    user: { type: String, require: true, ref: "User" },
  },
  {
    timestamps: true,
    collection: "category",
  }
);

export default model("Category", categorySchema);
