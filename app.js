const express = require('express');
const app = express();
const toDoRoutes = require('./src/Routes/TaskRouter');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
app.get('/', function(req, res) {
    const path = 'README.md';
    const file = fs.readFileSync(path, 'utf8');
    res.send(file.toString());
  });
app.use('/todo', toDoRoutes);
app.listen(process.env.PORT, () => console.log("Aplication Started"));
