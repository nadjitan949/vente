const express = require('express')
const { delUser, delAdmin, delCategory, delMarque, delProduct } = require('../controllers/delete.controller')
const verifyToken = require('../middleware/auth')

const delRouter = express.Router()

delRouter.delete('/delUser/:id', verifyToken, delUser)
delRouter.delete('/delAdmin/:id', verifyToken, delAdmin)
delRouter.delete('/delCategory/:id', verifyToken, delCategory)
delRouter.delete('/delMarque/:id', verifyToken, delMarque)
delRouter.delete('/delProduct/:id', verifyToken, delProduct)


module.exports = delRouter