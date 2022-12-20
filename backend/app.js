const express = require('express')
const mongoose = require('mongoose')
const colors = require('colors')

const app = express()
app.use(express.json())

const Users = require('./models/users')
const { json } = require('express')

const DB_USER = "test2"
const DB_PASSWORD = "test2"
const COLLECTION = "LaboratorioII"

app.use(express.json())

app.get('/', (req,res) =>{
  res.send('<h1>Bienvenido</h1><h2>Esta es la página de inicio</h2><a href="/users">Ver usuarios<a>')
})

//READ_1
app.get('/users', async (req,res) =>{
  try {
      const Usuario = await Users.find()
      if (!Usuario || Usuario == ""){
        return res.status(200).json({mesage: 'No hay datos para mostrar'})
      }
      res.status(200).json(Usuario)
  }  catch (error) {
      res.status(500).json({ error:error})
  }
})

//READ_2
app.get('/users/:id', async(req,res) =>{
  //console.log(req)
  const id = req.params.id //extraer id del dato
  try {
      const user = await Users.findOne({_id: id})
      if(!user){
        res.status(422).json({mesage: "User not found"})
        return
      }
      res.status(200).json(user)
  } catch (error) {
      res.status(500).json({error: error})
  }
}) 

//POST
app.post('/users',async (req, res)=> {
  try {
    const {dni,name, surname, nameUser, gender, age, salary, job} = req.body
    if(!dni || !name || !surname){
      res.status(422).json({error: 'El DNI, Nombre y Apellidos son datos obligatorio'})
    }
    const user ={
      dni,
      name,
      surname,
      nameUser,
      gender,
      age,
      salary,
      job
    }
    await Users.create(user)
    res.status(201).json({message: 'persona definida'})
  } catch (error) {
    res.status(500).json({error:error})
  }
})

//UPDATE

app.patch('/users/:id', async (req, res) => {
  const id = req.params.id
  const {name, surname, nameUser, gender, age, salary, job} = req.body
  const newData = {
    name,
    surname,
    nameUser,
    gender,
    age,
    salary,
    job
  } 
  try{
     const update = await Users.updateOne({_id:id}, newData)
     //console.log(update)
     if (update.matchedCount === 0 ){ //validación antes de actualizar
      return res.status(422).json({message: 'User not found'})
     }
     const MostrarData = await Users.findOne({_id:id})
     res.status(200).json(MostrarData)

  } catch(error){
      res.status(500).json({ error : error })
  }
})

//DELETE

app.delete('/users/:id', async (req, res) => {
    const id = req.params.id
    try {
      const user = await Users.findOne({ _id: id })
      if(!user){ //validación antes de remover
        res.status(422).json({mesage: "User not found"})
        return
        }
      await Users.deleteOne({ _id: id })
      res.status(200).json({ message: 'Usuario removido'})
      
    } catch (error) {
        res.status(500).json({ error:error })
    }
})

app.all('*', (req,res) => {
  res.status(404).send('Not found')
})


mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.h8qpoxo.mongodb.net/${COLLECTION}?retryWrites=true&w=majority`
    ).then(() => {
        console.log('conectado al MONGODB'.yellow)
        app.listen(5000, () => {
          console.log('server en el puerto 5000 ...'.bgYellow)
        }) 
    })
    .catch((err) => {
        console.log("err".bgRed)
})