import app from '../app';
import { describe, it, afterAll } from '@jest/globals';
import mongoose from 'mongoose';
import UserModel from '../user/schemas/user.schema';
import request from 'supertest';


describe('/user', () => {
    afterAll(async () => {
        await mongoose.connection.close()
    });

    it('Teste para inserir um usuário no banco de dados', async () => {
        const userTest = {
            username: 'lombrigo',
            weight: 50,
            password: 'L0mbr1g0',
            email: 'lombrigo_teste@gmail.com'
        };

        const response = await request(app).post('/user').send(userTest)
        const findUser = await UserModel.findById(response.body._id)


        expect(response.status).toEqual(201)
        expect(findUser).toBeDefined();
        expect(userTest.username).toBe(findUser?.username);
        expect(userTest.weight).toBe(findUser?.weight);
        expect(userTest.password).toBe(findUser?.password);
        expect(userTest.email).toBe(findUser?.email);
    });


    it('Teste para buscar todos os users no banco de dados', async () => {
        const response = await request(app).get('/user')
        const userTestAll = await UserModel.countDocuments()

        expect(response.body.length).toEqual(userTestAll)
    })
   
})