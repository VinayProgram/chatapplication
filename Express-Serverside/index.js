const express = require('express')
const app = express()
const router = require('./Routers/productRoute')
const Mongodb = require('mongoose')
const cors = require('cors')
const auth = require('./auth.js')
app.use(cors())
app.use(express.json({ limit: "50mb" }));

async function main() {
  let connection = await Mongodb.connect('url')
  if (connection) {
    console.log('connected')
  } else { console.log('check network') }
}
main()

app.use('/', router)
app.listen(2500)