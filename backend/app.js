// DATOS GENERALES DE LA BASE DE DATO EN MONGOOSE:
// Nombre del proyecto: MIAPI
//Nombre de la base de datos: APICLUSTER
//Ususario: test2
//Contraseña: test2

const express = require('express')
const mongoose = require('mongoose')
const person = require('./models/person')
//NUEVAS LINEAS AGREGADAS
const cors = require('cors')

const app = express()
const DB_USER = "test2"
const DB_PASSWORD = "test2"
const COLLECTION = "LaboratorioIII"
app.use(express.json())
app.use(cors({origin:"http://localhost:4200"}))

app.get('/person', async (req, res) => {
    try {
        const people = await person.find()
        res.status(200).json(people)
        
    } catch (error) {
        res.status(500).json({error:error})
    }
})


app.get('/person/:id', async (req, res) => {
    //console.log(req)
    const id = req.params.id   //Estraer el valor del "id" del dato
    try { 
        const peopleone = await person.findOne({_id:id})
    
        if (!peopleone){
          return res.status(422).json({ message: 'ususario no encontrado'})
        }
        res.status(200).json(peopleone) 
    } catch (error) {
        return res.status(500).json({error:error}) 
    }
    
})

app.post("/person", async (req, res) => {
    const {dni, name, surname, age, salary} = req.body
    if(!name) {
        res.status(422).json({error: 'Name is mandatory'})
        return
    }
    const Person ={
        dni,
        name,
        surname,
        age,
        salary
    }
    try{
        await person.create(Person)
        res.status(201).json({message: "Person is defined"})
    } catch (error) {
        res.status(500).json({error: error})
    } 
})

app.patch('/person/:id', async (req, res) => {
    const id = req.params.id
    const {dni, name, surname, age, salary} = req.body
    const newData = {
        dni,
        name,
        surname,
        age,
        salary
    } 
    try{
       const updatePerson = await person.updateOne({_id:id}, newData)
       console.log(updatePerson)
       if (updatePerson.matchedCount === 0 ){ //validación antes de actualizar
        return res.status(422).json({message: 'Persona no encontrada'})
       }
       res.status(200).json(newData)

    } catch(error){
        res.status(500).json({ error : error })
    }
})

app.delete('/person/:id', async (req, res) => {
    const id = req.params.id
    try{
        const peopleOne = await person.findOne({_id:id})
        if (!peopleOne){
          return res.status(422).json({ message: 'Ususario no encontrado'})
        }
        const newData = await person.deleteOne( {_id : id})
        res.status(200).json({message : 'El usuario fue removido'})
    } catch (error){
        res.status(500).json({error : error})
    }
    
})

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.h8qpoxo.mongodb.net/${COLLECTION}?retryWrites=true&w=majority`
    ).then(() => {
        console.log('conectado al MONGODB')
        app.listen(5000)
    })
    .catch((err) => {
        console.log("err")
})