import app from '../app';
import { describe, it, afterAll } from '@jest/globals';
import mongoose from 'mongoose';
import CategoryModel from '../category/schemas/category.schema';
import request from 'supertest';


describe('/category', () => {
    afterAll(async () => {
        await mongoose.connection.close()
    });

    it('Teste para inserir uma categoria no banco de dados', async () => {
        const categoryTest = {
            name: 'Faculdade',
            color: 'purple',
            user: 'Lombrigo',
        };

        const response = await request(app).post('/category').send(categoryTest)
        const findCategory = await CategoryModel.findById(response.body._id)


        expect(response.status).toEqual(201)
        expect(findCategory).toBeDefined();
        expect(categoryTest.name).toBe(findCategory?.name);
        expect(categoryTest.color).toBe(findCategory?.color);
        expect(categoryTest.user).toBe(findCategory?.user);

    });


    it('Teste para buscar todas categorias no banco de dados', async () => {
        const response = await request(app).get('/task')
        const categoryTestAll = await CategoryModel.countDocuments()

        expect(response.body.length).toEqual(categoryTestAll)
    })
   
})