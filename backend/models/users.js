const mongoose = require("mongoose")

const Users = mongoose.model('person',{
    dni: Number,
    name: String,
    surname: String,
    nameUser: String,
    gender: String,
    age: Number,
    salary: Number,
    job: String

})

module.exports = Users