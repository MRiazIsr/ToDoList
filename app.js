const express = require('express');
const app = express();
const toDoRoutes = require('./Routes/toDoRouter');
const connectDB = require('./DB/DbConnection');

const resDBConnection = connectDB.callOpenConnection;
const closeDbConnection = connectDB.callCloseConnection;
app.use = ('/todo', toDoRoutes);

app.listen(3000, () => console.log("Heelloooow World"));
