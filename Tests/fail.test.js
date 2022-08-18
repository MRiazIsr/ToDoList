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
    };

    beforeAll(async () => {
        await request(url).post("/task/create").send(newTask);
    });  

    afterAll(async () => {
        let idToDelete = { id : id }
        await request(url).delete("/task/delete").send(idToDelete);
    });

    it("Bad Request: Without Limit. Status Code: 400", async () => {
        const response = await request(url).get(`/list?offset=${offsetLimitObject.offset}`);
        const body = response.body;

        expect(response.statusCode).toBe(errorConstants.statusBadRequest);
        expect(body.status).toBe(false);
        expect(body.result).toBe(errorConstants.limitIsRequired);
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
        let idToDelete = { id : id }
        await request(url).delete("/task/delete").send(idToDelete);
    });

    it("Bad Request: Without ID. Status Code: 400", async () => {
        const response = await request(url).get(`/task/get`);
        const body = response.body;
        
        expect(response.statusCode).toBe(errorConstants.statusBadRequest);
        expect(body.status).toBe(false);
        expect(body.result).toBe(errorConstants.idIsRequired);
    });      
})

describe('GET /task/get', () => {
    const id = 'test';
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
        let idToDelete = { id : id }
        await request(url).delete("/task/delete").send(idToDelete);
    });

    it("Bad Request: Wrong ID Type. Status Code: 400", async () => {
        const response = await request(url).get(`/task/get?id=${id}`);
        const body = response.body;
        
        expect(response.statusCode).toBe(errorConstants.statusBadRequest);
        expect(body.status).toBe(false);
    });      
})

describe('POST /task/create', () => {
    const id = new mongoose.Types.ObjectId();
    const newTask = {
        _id : id,
        is_completed : false,
    };

    it("Bad Request: Required Params Missing. Status code: 400", async () => {
        const response = await request(url).post("/task/create").send(newTask);
        const body = response.body;
        
        expect(response.statusCode).toBe(errorConstants.statusBadRequest);
        expect(body.status).toBe(false);
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
    });

    afterAll(async () => {
        let idToDelete = { id : id }
        await request(url).delete("/task/delete").send(idToDelete);
    });

    it("Bad Request: Without ID. Status Code: 400", async () => {
        const update = { 
          is_completed : true 
        };

        const response = await request(url).patch("/task/update").send(update);
        const body = response.body;

        expect(response.statusCode).toBe(errorConstants.statusBadRequest);
        expect(body.status).toBe(false);
        expect(body.result).toBe(errorConstants.idIsRequired);
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
    });

    afterAll(async () => {
        let idToDelete = { id : id }
        await request(url).delete("/task/delete").send(idToDelete);
    });
    it("Bad Request: Bad Params Validation. Status Code: 400", async () => {
        let update = { 
            id : id,
            is_completed : 'test'
        }

        const response = await request(url).patch("/task/update").send(update);
        const body = response.body;

        expect(response.statusCode).toBe(errorConstants.statusBadRequest);
        expect(body.status).toBe(false);
    });
})

describe('DELETE /list/delete', () => {
    const id = new mongoose.Types.ObjectId();

    it("Bad Request: Without ID. Status Code: 400", async () => {
        const response = await request(url).delete("/task/delete").send();
        const body = response.body;

        expect(response.statusCode).toBe(errorConstants.statusBadRequest);
        expect(body.status).toBe(false);
        expect(body.result).toBe(errorConstants.idIsRequired);
    });
})

describe('DELETE /list/delete', () => {
    const id = { id : 'test'};

    it("Bad Request: Wrong ID Type. Status Code: 400", async () => {
        const response = await request(url).delete("/task/delete").send(id);
        const body = response.body;

        expect(response.statusCode).toBe(errorConstants.statusBadRequest);
        expect(body.status).toBe(false);
    });
})

describe('DELETE /list/delete', () => {
    const id = new mongoose.Types.ObjectId();

    it("Bad Request: Task Not Exists. Status Code: 400", async () => {
        const response = await request(url).delete("/task/delete").send(id);
        const body = response.body;

        expect(response.statusCode).toBe(errorConstants.statusBadRequest);
        expect(body.status).toBe(false);
    });
})