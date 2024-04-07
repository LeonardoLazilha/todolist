import express from "express";
import mongoose from "mongoose";
import { routes } from "./routes";

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.database();
    this.routes();
  }

  public middleware() {
    this.express.use(express.json());
  }

  public async database() {
    try {
      await mongoose.connect("mongodb://localhost:27017/gerenciador_tarefas");
      console.log("Conexao realizada com sucesso.");
    } catch (error) {
      console.log("Erro ao tentar conectar com o banco.");
    }
  }

  public routes() {
    this.express.use(routes);
  }
}

export default new App().express;
