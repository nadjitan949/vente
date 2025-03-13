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
    origin: ['https://benjamainboutique.onrender.com'], // Ajoute ton domaine front-end ici
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use('/uploads', express.static('uploads'))

app.use('/api', postRouter)
app.use('/api', getRouter)
app.use('/api', putRouter)
app.use('/api', delRouter)

app.listen(port, () => {
    console.log(`Serveur en ligne sur: ${port}`)
})