const mongoose = require('mongoose')
// ===================================

const nameSchema = new mongoose.Schema({
    name:{type:String}
},{
    collection:'Names'
})

module.exports = mongoose.model('Name',nameSchema)