const request = require('supertest');
const mongoose = require('mongoose');
//for url need to find better solution
const url = 'http://localhost:3000/todo';


describe('GET /list', () => {

    let id = new mongoose.Types.ObjectId();

    const newTask = {
        _id : id,
        name : "TDD",
        task : "Do Test",
        is_completed : false,
        todo_when : Date.now()
    }

    beforeAll(async () => {
        await request(url).post("/task/create").send(newTask);
    })  

    afterAll(async () => {
        let idToDelete = { id : id }
        await request(url).delete("/task/delete").send(idToDelete);
    })

    it("list exist 200", async () => {
        const response = await request(url).get('/list');
        const responseLength = Object.keys(response.body).length > 0;

        expect(response.statusCode).toBe(200);
        expect(responseLength).toBe(true);
    })
})
describe('GET /task/get', () => {

    let id = new mongoose.Types.ObjectId();

    const newTask = {
        _id : id,
        name : "TDD",
        task : "Do Test",
        is_completed : false,
        todo_when : Date.now()
    }

    beforeAll(async () => {
        await request(url).post("/task/create").send(newTask);
    })  

    afterAll(async () => {
        let idToDelete = { id : id }
        await request(url).delete("/task/delete").send(idToDelete);
    })

    it("item exist 200", async () => {
        const response = await request(url).get(`/task/get?id=${id}`);
        const item = response.body;
        const idExists = item._id == id
        
        expect(response.statusCode).toBe(200);
        expect(idExists).toBe(true);
        expect(item.name).toBe(newTask.name);
        expect(item.task).toBe(newTask.task);
        expect(item.timestamp).toBe(newTask.timestamp);
        expect(item.is_complited).toBe(newTask.is_complited);
    });      

})



describe('POST /task/create', () => {

    let id = new mongoose.Types.ObjectId();

    const newTask = {
        _id : id,
        name : "TDD",
        task : "Do Test",
        is_completed : false,
        todo_when : Date.now()
    }

    afterAll(async () => {
        let idToDelete = { id : id }
        await request(url).delete("/task/delete").send(idToDelete);
    })

    it('item added 200', async () => {

        const response = await request(url).post("/task/create").send(newTask);
        const item = response.body;
        const idExists = item._id == id
        
        expect(response.statusCode).toBe(200);
        expect(idExists).toBe(true);
        expect(item.name).toBe(newTask.name);
        expect(item.task).toBe(newTask.task);
        expect(item.timestamp).toBe(newTask.timestamp);
        expect(item.is_complited).toBe(newTask.is_complited);

    });

})

describe('PATCH /task/update', () => {
    let id = new mongoose.Types.ObjectId();

    const newTask = {
        _id : id,
        name : "TDD",
        task : "Do Test",
        is_completed : false,
        todo_when : Date.now()
    }

    beforeAll(async () => {
        await request(url).post("/task/create").send(newTask);
    })
    afterAll(async () => {
        let idToDelete = { id : id }
        await request(url).delete("/task/delete").send(idToDelete);
    })
    it('updated 200', async () => {

        let update = { 
          id : id,
          is_completed : true 
        }

        const response = await request(url).patch("/task/update").send(update);
        const item = response.body;

        expect(response.statusCode).toBe(200);

        Object.keys(update).forEach(key => {
            if (key != 'id') {
                expect(item[key]).toBe(update[key]);
            }
        });
    });
})

describe('DELETE /list/delete', () => {

    let id = new mongoose.Types.ObjectId();

    const newTask = {
        _id : id,
        name : "TDD",
        task : "Do Test",
        is_completed : false,
        todo_when : Date.now()
    }

    beforeAll(async () => {
        await request(url).post("/task/create").send(newTask);
    })

    it('deleted 200', async () => {

        let idToDelete = { id : id }
        const response = await request(url).delete("/task/delete").send(idToDelete);
        const item = response.body;
        const exists = item._id == id;

        expect(response.statusCode).toBe(200);
        expect(exists).toBe(true)

    });
})