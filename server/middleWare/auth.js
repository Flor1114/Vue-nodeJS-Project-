module.exports = options =>{
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const Admin = require('../models/Adminuser')


    return async (req,res,next)=>{
        const token= String(req.headers.authorization || '').split(' ').pop()
        assert(token,401,'Please Login!')
        const {id} = jwt.verify(token,req.app.get('secret'))
        assert(id,401,'Please Login!')
  
        req.user = await Admin.findById(id)
        // console.log(req.user)
        assert(req.user,401,'Please Login!')
        await next()
      }
}