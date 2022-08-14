const request = require('supertest');
//for url need to find better solution
const url = 'http://localhost:3000/todo';



describe('GET /list', () => {
    it("200", async () => {
        const response = await request(url).get('/list');
        expect(response.statusCode).toBe(200);
        expect(response.error).toBe(false);
    })
})

describe('POST /list/create', () => {
    const newTodo = {
        id,
        item,
        is_complited,
        timestamp
      }
      afterAll(async () => {
        await request(baseURL).delete(`/todo/${newTodo.id}`)
      })
      it('item added 201', async () => {
        const response = await request(baseURL).post("/todo").send(newTodo);
        const lastItem = response.body.data[response.body.data.length-1]
        expect(response.statusCode).toBe(201);
        expect(lastItem.item).toBe(newTodo["item"]);
        expect(lastItem.completed).toBe(newTodo["completed"]);
      });
})

describe('PUT /list/update', () => {
    const newTodo = {
        // todo 
      }
      beforeAll(async () => {
        await request(baseURL).post("/todo").send(newTodo);
      })
      afterAll(async () => {
        await request(baseURL).delete(`/todo/${newTodo.id}`)
      })
      it('updated 201', async () => {
        const response = await request(baseURL).put(`/todos/${newTodo.id}`).send({
          completed: true,
        });
        expect(response.statusCode).toBe(201);
        expect(response.body.data.completed).toBe(true);
      });
})

describe('DELETE /list/delete', () => {
    const newTodo = {
        // todo
      }
      beforeAll(async () => {
        await request(baseURL).post("/todo").send(newTodo);
      })
      it('deleted 201', async () => {
        const response = await request(baseURL).delete(`/todos/${newTodo.id}`);
        const todos = response.body.data
        const exists = todos.find(todo => {
          newTodo.id == todoId
        })
        expect(exists).toBe(undefined)
      });
})