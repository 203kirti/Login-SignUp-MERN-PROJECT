const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONN;

mongoose.connect(mongo_url)
    .then(()=>{
        console.log("mongo db connected successfully")
    }).catch((error)=>{
        console.log("mongo sb connection error")
    })