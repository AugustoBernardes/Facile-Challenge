const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
// ===================================

// Importing routes
const UserRoutes = require('./Routes/UserRoute')
const {undefinedRoutes} = require('./Controllers/UndefinedRoute')
// ===================================

const app = express()
app.use(express.urlencoded({extended:true}))

// Declaring variables
const PORT = process.env.PORT || 5876
const DB_KEY = process.env.DB_KEY 
// ===================================

// Connecting with Data Base
mongoose.connect(DB_KEY)

const db = mongoose.connection

db.once('error', () => {console.log(`DataBase wasn't load!`)})
db.once('open', () => {console.log(`DataBase loaded!`)})
// ===================================

// Routes
app.use('/',UserRoutes)
app.use('*',undefinedRoutes)
// ===================================

// Running Server
app.listen(PORT, () => {console.log(`Server running on PORT: ${PORT}`)})
// ===================================