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

const statusOk = 200;
const statusBadRequest = 400;
const statusServerError = 500;

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

async function getAll() {

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
        //check ofr id unset
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

async function deleteTask(id, method) {

    let options = {select : '_id'};

    try {
    
        let connection = await openDBConnection(); 
        let task = await toDoTasks.findByIdAndDelete(id, options);

        if (task === null) {

            let responseObject = createReturnObject(false, method, 'Cannot find task inside collection', statusBadRequest);
            return responseObject;

        } else {
            
            let responseObject = createReturnObject(true, method, task, statusOk);
            await closeDbConnection();
            return responseObject;

        }

    } catch (e) {

        await closeDbConnection();

        let responseObject = createReturnObject(false, method, e.toString(), statusServerError);
        return responseObject;

    }
   
}

function createReturnObject(status, method, result, statusCode) {

    let responseObject = {
        status : status,
        method : method,
        result : result,
        status_code : statusCode 
    };

    return responseObject;
} 


module.exports = {getOne, create, update, deleteTask, getAll};