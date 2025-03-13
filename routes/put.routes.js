const express = require('express')
const { setUser, setAdmin, setCategory, setMarque, setProduct } = require('../controllers/put.controller')
const verifyToken = require('../middleware/auth')


const putRouter = express.Router()

putRouter.put('/setUser/:id', verifyToken, setUser)
putRouter.put('/setAdmin/:id', verifyToken, setAdmin)
putRouter.put('/setCategory/:id', verifyToken, setCategory)
putRouter.put('/setMarque/:id', verifyToken, setMarque)
putRouter.put('/setProduct/:id', verifyToken, setProduct)



module.exports = putRouter
