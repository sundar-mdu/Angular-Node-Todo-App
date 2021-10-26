import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import paypal from 'paypal-rest-sdk'

import router from './router/todo.js'
import payRouter from './router/pay.js'

//for payment integration
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AZSTAQqJdIF6hAftn2mv1po_JgHGReWzi5oOg_OlLvrqWY2wUqUQpPCtdG1EjuheSxW3IWEMQUwKOBM6',
    'client_secret': 'EFTYa_aPKEg6FSh_xARc2Dxd9NxjCtWvW-D0uTfhUvNyKXPLHN8PckxA-OW61h5DFlGx_4-3F6BOryNn'
});

const app = express()

app.use(bodyParser.json({ limit: "30mb", extended:'true'}))
app.use(bodyParser.urlencoded({ limit: "30mb", extended:'true'}))
app.use(cors())

app.use('/todo', router)
app.use('/pay', payRouter)

const CONNECTION_URL =  "mongodb://myUserAdmin:abc123@localhost:27017/?authSource=admin"
const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>app.listen(PORT, ()=>console.log(`Server running on port: ${PORT}`)))
    .catch((error)=>console.log('err',error.message))

// mongoose.set('useFindAndModify', false)