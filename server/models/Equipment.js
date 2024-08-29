const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name:{type:String},
    icon:{type:String},
    category:[{type: mongoose.SchemaTypes.ObjectId,ref:'Category'}],
   
})
module.exports = mongoose.model('Equipment',schema)