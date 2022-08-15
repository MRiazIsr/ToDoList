const mongoose = require('mongoose');
const connectDB = require('../DB/DbConnection');

const openDBConnection = connectDB.callOpenConnection;
const closeDbConnection = connectDB.closeConnection;


const ToDoTaskSchema = mongoose.Schema({

    name: 'string',
    task: 'string',
    is_completed: 'boolean',
    todo_when: 'date',

}, { timestamps: true });

const toDoTasks = mongoose.model('ToDoTask', ToDoTaskSchema);

async function getOne(id) {

    try {

        await openDBConnection();
        let task = await toDoTasks.findById(id);
        await closeDbConnection();

        return task;
        
    } catch (e) {
        
        await closeDbConnection();
    
        return e;

    }
    
}

async function getAll(id) {

    try {

        await openDBConnection();
        let tasks = await toDoTasks.find();
        await closeDbConnection();
    
        return tasks;
        
    } catch (e) {

        await closeDbConnection();
    
        return e;
    }
    
}

async function create(body) {

    try {

        await openDBConnection();
        let task = await toDoTasks.create(body);
        await closeDbConnection();
    
        return task;
        
    } catch (e) {

        await closeDbConnection();
    
        return e;
    }
    
}

async function update(body) {

    

    let indificator = { id : body.id};
    let updates = {};

    try {

        Object.keys(body).forEach(key => {

            if( key != 'id' ) { 
                updates[key] = body[key] 
            }
            
        });
        
        await openDBConnection();
        let task = await toDoTasks.findOneAndUpdate(indificator, updates, {
            new: true,
        });
        await closeDbConnection();

        return task;

    } catch (e) {

        await closeDbConnection();

        return task;

    }
    
}

async function deleteTask(id) {

    let options = {select : '_id'};

    try {
    
        await openDBConnection();  
        let task = await toDoTasks.findByIdAndDelete(id, options);
        await closeDbConnection();
        
        return task;

    } catch (e) {

        console.log(e);

        await closeDbConnection();

        return e;
    }
   
}


module.exports = {getOne, create, update, deleteTask, getAll};