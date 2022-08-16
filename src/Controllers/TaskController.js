const toDoModel = require('../Models/Task');

exports.getTask = async function (req, res){
    
    let params = req.query;

    //validator on param
    
    let task = await toDoModel.getOne(params.id);
    res.send(task);
}

exports.getAllTasks = async function (req, res){
    
    //validator on param
    
    let tasks = await toDoModel.getAll();

    res.send(tasks);
}    
   

exports.createTask = async function (req,res) {
    
    let body = req.body;

    //validator on param
    
    let task = await toDoModel.create(body);
    res.send(task);
}

exports.updateTask = async function (req, res) {
    let body = req.body;

    //validator on param
    console.log(body)
    let task = await toDoModel.update(body);
    res.send(task);
}

exports.deleteTask = async function (req, res) {
    let params = req.body;
    //validator on param
    
    let task = await toDoModel.deleteTask(params.id, 'deleteTask');
    res.status(task.status_code).send(task);
}


