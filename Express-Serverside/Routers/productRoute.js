const express = require('express')
const app = express.Router()
const auth = require('../auth.js')
const ProductControl = require('../Controller/Products')
app.post('/sendmessage', ProductControl.sendmessage)
app.get('/getmessages', ProductControl.getmessage)
app.post('/createroom', ProductControl.createroom)
app.post('/joinroom', auth, ProductControl.sendroommess)
app.post('/getroommessages', auth, ProductControl.getroommess)

app.get('/',(req,res)=>{res.send('done')})
module.exports = app