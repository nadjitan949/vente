const express = require('express')
const { connect } = require('./config/connnexionDB')
const postRouter = require('./routes/post.routes')
const getRouter = require('./routes/get.routes')
const putRouter = require('./routes/put.routes')
const delRouter = require('./routes/delete.routes')
const fileUpload = require('express-fileupload')
const cors = require('cors');
require("dotenv").config();

const port = process.env.PORT || 8000

const app = express()

connect()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload())
app.use(cors({
    origin: 'http://localhost:5173' , // ou '*' pour permettre toutes les origines
}));

app.use('/uploads', express.static('uploads'))

app.use('/api', postRouter)
app.use('/api', getRouter)
app.use('/api', putRouter)
app.use('/api', delRouter)

app.listen(port, () => {
    console.log(`Serveur en ligne sur: ${port}`)
})