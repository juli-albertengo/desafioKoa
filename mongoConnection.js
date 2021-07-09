require('dotenv').config();
const mongoose = require('mongoose')

async function mongoConnection(){
    try{
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
        return `Mongo DB Connection established`;
    } catch(error){
        return `Error connecting to Mongo => ${error}`;
    }

}

module.exports = mongoConnection