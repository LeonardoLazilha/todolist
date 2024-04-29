import app from '../app';
import { describe, it, afterAll } from '@jest/globals';
import mongoose from 'mongoose';
import TaskModel from '../task/schemas/task.schema';
import request from 'supertest';


describe('/user', () => {
    afterAll(async () => {
        await mongoose.connection.close()
    });

    it('Teste para inserir uma tarefa no banco de dados', async () => {
        const taskTest = {
            title: 'Estudar',
            description: 'Estudar para as provas',
            createdAt: new Date(),
            type: 'Educacao',
        };

        const response = await request(app).post('/task').send(taskTest)
        const findTask = await TaskModel.findById(response.body._id)


        expect(response.status).toEqual(201)
        expect(findTask).toBeDefined();
        expect(taskTest.title).toBe(findTask?.title);
        expect(taskTest.description).toBe(findTask?.description);
        expect(taskTest.createdAt).toBe(findTask?.createdAt);
        expect(taskTest.type).toBe(findTask?.type);
    });


    it('Teste para buscar todas tarefas no banco de dados', async () => {
        const response = await request(app).get('/task')
        const taskTestAll = await TaskModel.countDocuments()

        expect(response.body.length).toEqual(taskTestAll)
    })
   
})