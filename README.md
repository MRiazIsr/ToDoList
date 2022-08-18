# CRUD API for To Do Tasks 
* If on github readmy params looking not readable you can open it After Application is started in borwser: 'http://localhost:3000/' 
  
### Technology used in the aplication: ###
* Node.js version 18+
* Expres.js for routing
* Jest for tests
* Mongodb placed on aws Ireland cluster
* Mongose for operations with mongodb  
---------------------------------------------------------------------------------- 
### To start the application:
* Clone project from: https://github.com/MRiazIsr/ToDoList.git  
* Run the "npm install" command
* Create ".env" file from "env.examle"  
* Run the "npm run start"
* To test fail cases run "npm test fail", and "npm run success" for success cases  
------------------------------------------------------------------------------------------------------------------    
### API Documentation (postman)
* Request format: JSON,
* Header: Content-type - Application/json


* Get One Task By Id:<br>
|      URI       |      TYPE     |    PARAMS     |     PARAM TYPE    |     REQUIRED     |     DEFAULT    | 
|----------------|:-------------:|:-------------:|:-----------------:|:----------------:|:--------------:|         
| /todo/task/get |      GET      |      id       |  Url PARAM (?id=) |       TRUE       |                |

* Get List Of Tasks:<br>  
|      URI       |      TYPE     |    PARAMS     |     PARAM TYPE    |     REQUIRED     |     DEFAULT    | 
|----------------|:-------------:|:-------------:|:-----------------:|:----------------:|:--------------:|         
|   /todo/list   |      GET      |     limit     |  Url PARAM (?id=) |       TRUE       |                |
|                |               |     offset    |  Url PARAM (?id=) |       FALSE      |       0        |

* Create Task:<br> 
|      URI              |      TYPE     |    PARAMS     |     PARAM TYPE    |     REQUIRED     |     DEFAULT    | 
|-----------------------|:-------------:|:-------------:|:-----------------:|:----------------:|:--------------:|         
|   /todo/task/create   |     POST      |      name     |       STRING      |       TRUE       |                |
|                       |               |      task     |       STRING      |       TRUE       |                |
|                       |               |   todo_when   |      TIMESTAMP    |       TRUE       |                |
|                       |               |  is_completed |       BOOLEAN     |       FALSE      |     BOOLEAN    |

* Update Task:<br>
|      URI              |      TYPE     |    PARAMS     |     PARAM TYPE    |     REQUIRED     |     DEFAULT    | 
|-----------------------|:-------------:|:-------------:|:-----------------:|:----------------:|:--------------:|         
|   /todo/task/update   |     PATCH     |       id      |       STRING      |       TRUE       |                |
|                       |               |      name     |       STRING      |       FALSE      |                |
|                       |               |      task     |       STRING      |       FALSE      |                |
|                       |               |   todo_when   |      TIMESTAMP    |       FALSE      |                |
|                       |               |  is_completed |       BOOLEAN     |       FALSE      |                |

* Delete Task:<br>
|      URI              |      TYPE     |    PARAMS     |     PARAM TYPE    |     REQUIRED     |     DEFAULT    | 
|-----------------------|:-------------:|:-------------:|:-----------------:|:----------------:|:--------------:|         
|   /todo/task/delete   |     DELETE    |       id      |       STRING      |       TRUE       |                |

------------------------------------------------------------------------------------------------------------------  
### Response                                   
* ERROR STATUS CODES :
- 200 Status OK,
- 400 Bad Ruqest (Validation Problems),
- 500 Server Error (Database Connection Error, Code Error),
### Response examples
* /list:<br> 
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

* /task/get:<br>
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
* /task/create:<br> 
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
* task/delete:<br> 
{
    "status": true,
    "method": "deleteTask",
    "result": {
        "_id": "62fabd492e51471a9ccf8ae1"
    },
    "status_code": 200
}      
