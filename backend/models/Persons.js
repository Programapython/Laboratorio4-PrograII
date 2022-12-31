const mongoose = require("mongoose")

const Person = mongoose.model('person',{
    _id: string,
    dni: number,
    name: string,
    surname: string,
    age: number,
    salary: number

})

module.exports = Person
