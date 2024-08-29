module.exports = app =>{
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const inflection = require('inflection')
    const multer = require('multer')
    const assert = require('http-assert')
    const upload = multer({dest: __dirname + '/../../uploads'})
    const Admin = require('../../models/Adminuser')
   const authMiddleWare = require('../../middleWare/auth')
   const resourceMiddleWare = require('../../middleWare/resource')
   const router = express.Router()

   //  const Category = require('../../models/Category')
    router.post('/',async(req , res)=>{
       const model = await req.Model.create(req.body)
       res.send(model)
    })
    router.get('/',async(req , res)=>{
      const queryOptions = {}
      if(req.Model.modelName === 'Category'){
         queryOptions.populate = 'ParentCategory'
      }
      if (req.Model.modelName === 'Hero') {
         queryOptions.populate = 'Category';
        //  queryOptions.populate = 'recommendedRunes';

     }
     if (req.Model.modelName === 'Rune') {
      queryOptions.populate = {
        path: 'effect.name',
        model: 'Runeattribute', // Make sure this matches your Runeattribute model name
      };
    }
      const items = await req.Model.find().setOptions(queryOptions)
      res.send(items)
     })
     router.get('/:id',async(req , res)=>{
        const model = await req.Model.findById(req.params.id)
      
        res.send(model)
      }),

     router.put('/:id',async(req , res)=>{
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
     })
     router.delete('/:id',async(req , res)=>{
        await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success:true
        })
     })
     
    app.use('/admin/api/rest/:resource',authMiddleWare(),resourceMiddleWare(),router)
   

    app.use('/admin/api/upload',authMiddleWare(),upload.single('file'),async (req,res) => {
      const file = req.file
      file.url = `http://localhost:3000/uploads/${file.filename}`
      res.send(file)
    })
    
    app.use('/admin/api/login',async (req,res)=>{
      const {username,password} = req.body
      const loginuser = await Admin.findOne({username}).select('+password')
      assert(loginuser,422,'User does not exise!')
      const isVaild = require('bcrypt').compareSync(password,loginuser.password)
      assert(isVaild,422,'Wrong Password')
      //JWT TOKEN
      const token = jwt.sign({id:loginuser._id},app.get('secret'))
      return res.send({token})
    })
    //错误处理函数
    app.use(async(err,req,res,next)=>{
      console.log(err)
      res.status(err.statusCode || 500).send({
         message: err.message
      })
    })
}