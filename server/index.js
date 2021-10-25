import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'

import router from './router/todo.js'

const app = express()

app.use(bodyParser.json({ limit: "30mb", extended:'true'}))
app.use(bodyParser.urlencoded({ limit: "30mb", extended:'true'}))
app.use(cors())

app.use('', router)

const CONNECTION_URL =  "mongodb://myUserAdmin:abc123@localhost:27017/?authSource=admin"
const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>app.listen(PORT, ()=>console.log(`Server running on port: ${PORT}`)))
    .catch((error)=>console.log('err',error.message))

// mongoose.set('useFindAndModify', false)