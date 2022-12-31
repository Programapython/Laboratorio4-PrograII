const mongoose = require("mongoose")

const person = mongoose.model('person',{
    dni: Number,
    name:String,
    surname: String,
    age:Number,
    salary: Number,
})

module.exports = person