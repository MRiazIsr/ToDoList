const express = require('express');
const app = express();
const toDoRoutes = require('./src/Routes/TaskRouter');

app.use(express.json());
app.use('/todo', toDoRoutes);

app.listen(3000, () => console.log("Heelloooo World"));
