const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name:{type:String},
    ParentCategory:{type:mongoose.SchemaTypes.ObjectId,ref:'Category'},
})
module.exports = mongoose.model('Category',schema)
schema.virtual('children',{
    localField:'_id',
    foreignField:'ParentCategory',
    justOne:false,
    ref:'Category'
})
schema.virtual('newsList',{
    localField:'_id',
    foreignField:'multipleCategories',
    justOne:false,
    ref:'Article'
})