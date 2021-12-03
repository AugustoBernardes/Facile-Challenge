const express = require('express')
// ===================================

// Importing Actions
// ===================================
const {encrypting,decrypting,loadHomePage} = require('../Controllers/UserController')


const route = express.Router()

// GET
route.get('/',loadHomePage)
route.get('/encrypts/:id',decrypting)
// ===================================

// POST
route.post('/encrypts', encrypting)
// ===================================

module.exports = route