const request = require('supertest');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const errorConstants = require('../src/errorConstants');
dotenv.config();
const url = process.env.SITE_URL_TESTS;

describe('GET /list', () => {
    const id = new mongoose.Types.ObjectId();
    const newTask = {
        _id : id,
        name : "TDD",
        task : "Do Test",
        is_completed : false,
        todo_when : Date.now()
    };
    const offsetLimitObject = {
        offset : 0,
        limit : 2
    };

    beforeAll(async () => {
        await request(url).post("/task/create").send(newTask);
    });  

    afterAll(async () => {
        const idToDelete = { id : id };
        await request(url).delete("/task/delete").send(idToDelete);
    });

    it("List exists. Status code: 200", async () => {
        const response = await request(url).get(`/list?offset=${offsetLimitObject.offset}&limit=${offsetLimitObject.limit}`);
        const body = response.body;
        const responseLength = Object.keys(body.result).length > 0;

        expect(response.statusCode).toBe(errorConstants.statusOk);
        expect(body.status).toBe(true);
        expect(responseLength).toBe(true);
    });
})
describe('GET /task/get', () => {
    const id = new mongoose.Types.ObjectId();
    const newTask = {
        _id : id,
        name : "TDD",
        task : "Do Test",
        is_completed : false,
        todo_when : Date.now()
    };

    beforeAll(async () => {
        await request(url).post("/task/create").send(newTask);
    });  

    afterAll(async () => {
        const idToDelete = { id : id };
        await request(url).delete("/task/delete").send(idToDelete);
    });

    it("Taks exists. Status code: 200", async () => {
        const response = await request(url).get(`/task/get?id=${id}`);
        const body = response.body;
        const checkId = body.result._id == id;
        
        expect(response.statusCode).toBe(errorConstants.statusOk);
        expect(body.status).toBe(true);
        expect(checkId).toBe(true);
        expect(body.result.name).toBe(newTask.name);
        expect(body.result.task).toBe(newTask.task);
        expect(body.result.timestamp).toBe(newTask.timestamp);
        expect(body.result.is_complited).toBe(newTask.is_complited);
    });      

})



describe('POST /task/create', () => {
    const id = new mongoose.Types.ObjectId();
    const newTask = {
        _id : id,
        name : "TDD",
        task : "Do Test",
        is_completed : false,
        todo_when : Date.now()
    };

    afterAll(async () => {
        const idToDelete = { id : id };
        await request(url).delete("/task/delete").send(idToDelete);
    });

    it('Task created. Status code 200', async () => {

        const response = await request(url).post("/task/create").send(newTask);
        const body = response.body;
        const idExists = body.result._id == id;
        
        expect(response.statusCode).toBe(200);
        expect(idExists).toBe(true);
        expect(body.status).toBe(true);
        expect(body.result.name).toBe(newTask.name);
        expect(body.result.task).toBe(newTask.task);
        expect(body.result.timestamp).toBe(newTask.timestamp);
        expect(body.result.is_complited).toBe(newTask.is_complited);
    });
})

describe('PATCH /task/update', () => {
    const id = new mongoose.Types.ObjectId();

    const newTask = {
        _id : id,
        name : "TDD",
        task : "Do Test",
        is_completed : false,
        todo_when : Date.now()
    };

    beforeAll(async () => {
        await request(url).post("/task/create").send(newTask);
    })
    afterAll(async () => {
        const idToDelete = { id : id };
        await request(url).delete("/task/delete").send(idToDelete);
    })
    it('Task updated. status code 200', async () => {

        let update = { 
          id : id,
          is_completed : true 
        };

        const response = await request(url).patch("/task/update").send(update);
        const body = response.body;

        expect(response.statusCode).toBe(200);
        expect(body.status).toBe(true);

        Object.keys(update).forEach(key => {
            if (key !== 'id') {
                expect(body.result[key]).toBe(update[key]);
            }
        });
    });
})

describe('DELETE /list/delete', () => {

    const id = new mongoose.Types.ObjectId();

    const newTask = {
        _id : id,
        name : "TDD",
        task : "Do Test",
        is_completed : false,
        todo_when : Date.now()
    };

    beforeAll(async () => {
        await request(url).post("/task/create").send(newTask);
    });

    it('Task deleted. Status code 200', async () => {

        const idToDelete = { id : id };
        const response = await request(url).delete("/task/delete").send(idToDelete);
        const body = response.body;
        const exists = body.result._id == id;

        expect(response.statusCode).toBe(200);
        expect(body.status).toBe(true);
        expect(exists).toBe(true);

    });
})