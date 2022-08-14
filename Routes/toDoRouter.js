const express = require('express');
const router = express.Router();
const todoController = require('../Controllers/toDoController')

module.exports = app => {
    router.get('/list', todoController.get);
    router.post('/list/create', todoController.create);
    router.put('/list/update', todoController.update);
    router.delete('/list/delete', todoController.delete)
}
