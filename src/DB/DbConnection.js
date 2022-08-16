const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const errorConstants = require('../errorConstants');
const url = process.env.DB_HOST

exports.openConnection = async () => {

    try {
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true,});
    } catch (e) {
        responseObject = createReturnObject(false, 'openConnection', e.toString(), errorConstants.statusServerError);
        
        return responseObject;
    }

}

exports.closeConnection = async () => {

    try {
        await mongoose.connection.close();
    } catch (error) {
        console.log(e.toString());
    }

}

createReturnObject = (status, method, result, statusCode) => {
    let responseObject = {
        status : status,
        method : method,
        result : result,
        status_code : statusCode 
    };

    return responseObject;
} 


        
