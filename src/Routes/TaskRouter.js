const express = require('express');
const router = express.Router();
const todoController = require('../Controllers/TaskController')

router.get('/task/get', todoController.getTask);
router.get('/task/get-all', todoController.getAllTasks);
router.post('/task/create', todoController.createTask);
router.patch('/task/update', todoController.updateTask);
router.delete('/task/delete', todoController.deleteTask)

module.exports = router ;

