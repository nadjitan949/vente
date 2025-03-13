const express = require('express')
const { users, admins, categories, marques, products } = require('../controllers/get.controller')
const { get } = require('./post.routes')
const verifyToken = require('../middleware/auth')

const getRouter = express.Router()

getRouter.get('/users', verifyToken, users)
getRouter.get('/admins', verifyToken, admins)
getRouter.get('/categories', categories)
getRouter.get('/marques', marques)
getRouter.get('/products', products)


module.exports = getRouter