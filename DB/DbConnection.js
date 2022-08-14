const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const url = process.env.DB_CONNECTION

async function openConnection(url) {

    try {
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true,});
    } catch (error) {
        handleError('Action: Connection Open.', error);
    }

}

async function closeConnection() {

    try {
        await mongoose.connection.close();
    } catch (error) {
        handleError('Action: Connection Close.', error);
    }

}

function handleError(action, error) {
    console.log(error); 
}

const callOpenConnection = openConnection(url);
const callCloseConnection = closeConnection();

module.exports = { openConnection, closeConnection } ;

        
