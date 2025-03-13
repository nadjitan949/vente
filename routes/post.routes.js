const express = require('express')
const {
    
    addUser,
    addAdmin,
    addCategory,
    addMarque,
    addProducts,
    UserLogin,
    AdminLogin,
    productsBycategories,
    productsByMarque,
    searchProduct,
    productById

} = require('../controllers/post.controller')

const verifyToken = require('../middleware/auth')

const postRouter = express.Router()

// ============ Authentification route ============== //

postRouter.post('/UserSignup', addUser)
postRouter.post('/AdminSignup', addAdmin)
postRouter.post('/UserLogin', UserLogin)
postRouter.post('/AdminLogin', AdminLogin)

// ============= Routes =============================//

postRouter.post('/addCategory', verifyToken, addCategory)
postRouter.post('/addMarque', verifyToken, addMarque)
postRouter.post('/addProduct', verifyToken, addProducts)

// ============== Filtres =========================== //

postRouter.post('/category/:id', productsBycategories)
postRouter.post('/marque/:id', productsByMarque)
postRouter.post('/product/:id', productById)
postRouter.post('/search', searchProduct)

module.exports = postRouter
