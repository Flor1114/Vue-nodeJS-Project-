const express = require("express")
const app = express()

app.use(express.json())
app.use(require('cors')())
app.use('/uploads',express.static(__dirname+'/uploads'))
app.use('/',express.static(__dirname+'/web'))
app.use('/admin',express.static(__dirname+'/admin'))


app.set('secret','8h21h90d8da')

require('./routes/admin')(app);
require('./plugins/db')(app)
require('./routes/web')(app)


app.listen(3000,()=>{
    console.log('http://localhost:3000')
});