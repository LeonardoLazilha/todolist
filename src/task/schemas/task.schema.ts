import { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    type: { type: String },
    category: {
      name: { type: String, default: "geral" },
      color: { type: String, default: "#ccc" },
    },
    status: {
      type: String,
      enum: ["pendente", "em andamento", "concluida"],
      default: "pendente",
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
    collection: "tasks",
  }
);

export default model("Task", taskSchema);
