const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name:{type:String},
    icon:{type:String},
    effect:[{
        name:{type:mongoose.SchemaTypes.ObjectId,ref:'Runeattribute'},
        bootsScore:{type:String}
    }]
})
module.exports = mongoose.model('Rune',schema)