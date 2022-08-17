# CRUD API for creating/updating/reading/deleting To Do Tasks  
================================================================================================================  
### Technology used in the aplication: ###
* node.js version 18+
* expres.js for routing
* mongodb placed on aws Ireland cluster
* mongose for operations with mongodb  
------------------------------------------------------------------------------------------------------------------   
### To start the application:
* Clone project from: https://github.com/MRiazIsr/ToDoList.git  
* Run the "npm install" command
* Create ".env" file from "env.examle"  
* Run the "npm run start"
* To test fail cases run "npm test fail", and "npm run success" for success cases  
------------------------------------------------------------------------------------------------------------------    
### API Documentation (postman)
* Request format: JSON,
* get one task by id - TYPE GET "/todo/task/get?" | Url params: "id" of required task | REQUIRED |
* get one task by id - TYPE GET "/todo/list?" | Url params: "limit" of required tasks | REQUIRED | 
                                                Url params: "offset" of required tasks | OPTIONAL, DEFAULT 0 |

* create task - TYPE POST "/todo/task/create" | Post params: 
                                                "name" of required task | REQUIRED, STRING |
                                                "task" for to do | REQUIRED, STRING |
                                                "todo_when" of required task | REQUIRED, TIMESTAMP |
                                                "is_completed" status of task | OPTIONAL, BOOLEAN, DEFAULT false |

* update task - TYPE PATCH "/todo/task/update" | Post params: 
                                                "id" of required task | REQUIRED, STRING |
                                                "task" for to do | OPTIONAL, STRING |
                                                "todo_when" of required task | OPTIONAL, TIMESTAMP |
                                                "is_completed" status of task | OPTIONAL, BOOLEAN, DEFAULT false |

* delete task - TYPE DELETE "/todo/task/delete" | Post params: 
                                                "id" of required task | REQUIRED, STRING |
------------------------------------------------------------------------------------------------------------------  
### Response                                   
* ERROR STATUS CODES :
- 200 Status OK,
- 400 Bad Ruqest (Validation Problems),
- 500 Server Error (Database Connection Error, Code Error),
* Response examples
- /list 
{
    "status": true,
    "method": "getAll",
    "result": [
        {
            "_id": "62fabd492e51471a9ccf8ae1",
            "name": "make a call 2",
            "task": "Do Test",
            "is_completed": true,
            "todo_when": "2022-08-15T21:40:25.315Z",
            "createdAt": "2022-08-15T21:40:26.123Z",
            "updatedAt": "2022-08-16T15:00:20.945Z",
            "__v": 0
        },
        {
            "_id": "62fabf43a9ebff5aa1758335",
            "name": "make a call 2",
            "task": "Do Test",
            "is_completed": true,
            "todo_when": "2022-08-15T21:48:51.682Z",
            "createdAt": "2022-08-15T21:49:00.540Z",
            "updatedAt": "2022-08-16T22:37:09.809Z",
            "__v": 0
        }
    ],
    "status_code": 200
}
* /task/get: 
{
    "status": true,
    "method": "getOne",
    "result": {
        "_id": "62fabd492e51471a9ccf8ae1",
        "name": "make a call 2",
        "task": "Do Test",
        "is_completed": true,
        "todo_when": "2022-08-15T21:40:25.315Z",
        "createdAt": "2022-08-15T21:40:26.123Z",
        "updatedAt": "2022-08-16T15:00:20.945Z",
        "__v": 0
    },
    "status_code": 200
}
* /task/create:
{
    "status": true,
    "method": "createTask",
    "result": {
        "name": "name",
        "task": "go sleep",
        "is_completed": false,
        "todo_when": "2005-08-16T21:30:11.000Z",
        "_id": "62fd32112f1670a9689111b0",
        "createdAt": "2022-08-17T18:23:13.348Z",
        "updatedAt": "2022-08-17T18:23:13.348Z",
        "__v": 0
    },
    "status_code": 200
}
* task/delete:
{
    "status": true,
    "method": "deleteTask",
    "result": {
        "_id": "62fabd492e51471a9ccf8ae1"
    },
    "status_code": 200
}

                                             
