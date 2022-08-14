const express = require('express');
const app = express();
const toDoRoutes = require('./Routes/toDo');
const mongoose = require('mongoose');


mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser : true } , () =>  {
    console.log('Connection: True');
})

app.listen(3000, () => console.log("Heelloooow World"));


app.use = ('/toDoList', toDoRoutes);