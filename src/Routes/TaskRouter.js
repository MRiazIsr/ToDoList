const express = require('express');
const router = express.Router();
const todoController = require('../Controllers/TaskController')

router.get('/list', todoController.getAllTasks);
router.get('/task', todoController.getTask);
router.post('/task', todoController.createTask);
router.patch('/task', todoController.updateTask);
router.delete('/task', todoController.deleteTask)

module.exports = router ;

