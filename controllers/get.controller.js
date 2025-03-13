const { User, Admin, Category, Marque, Products } = require('../models/shopModels')

const REQUEST_SUCCESSFULL = 200
const NOT_FOUND = 404

module.exports.users = async (req, res) => {
    try {
        const users = await User.findAll()
        res.json(users)
    } catch (error) {
        console.log(error)
    }
}

module.exports.admins = async (req, res) => {
    try {
        if(req.user.type !== "admin") return res.json({ message: "Pour admin uniquement !" })  
        const admins = await Admin.findAll()
        res.status(REQUEST_SUCCESSFULL).json(admins)
    } catch (error) {
        
    }
}

module.exports.categories = async (req, res) => {
    try {

        const categories = await Category.findAll()
        res.status(REQUEST_SUCCESSFULL).json(categories)
    } catch (error) {
        console.log(error)
    }
}

module.exports.marques = async (req, res) => {
    try {

        const marques = await Marque.findAll()
        res.status(REQUEST_SUCCESSFULL).json(marques)
    } catch (error) {
        console.log(error)
    }
}

module.exports.products = async (req, res) => {
    try {
        const products = await Products.findAll()
        res.status(REQUEST_SUCCESSFULL).json(products)
    } catch (error) {
        console.log(error)
    }
}
