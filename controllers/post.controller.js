const { User, Admin, Category, Marque, Products } = require('../models/shopModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { use } = require('../routes/post.routes')
const { sequelize } = require('../config/connnexionDB')
const { Op } = require('sequelize')

const REQUEST_SUCCESSFULL = 200
const NOT_FOUND = 404

// ================= Authentification ====================== //

module.exports.addUser = async (req, res) => {
    try {
        const { password, ...userData } = req.body
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({ ...userData, password: hashPassword })
        res.status(REQUEST_SUCCESSFULL).json({
            message: 'Utilisateur crée !',
            infos: newUser
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports.UserLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email: email } })
        if (!user) return res.status(NOT_FOUND).json({ message: 'Utilisateur introuvable !' })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(NOT_FOUND).json({ message: "Email ou mot de passe incorrect !" })
        res.status(REQUEST_SUCCESSFULL).json({
            id: user.id,
            email: user.email,
            token: jwt.sign({ id: user.id, type: 'user' }, 'SECRET_KEY', { expiresIn: '1h' })
        })

    } catch (error) {
        console.log(error)
    }
}

module.exports.addAdmin = async (req, res) => {
    try {
        const { password, ...adminData } = req.body
        const hashPasswordAdmin = await bcrypt.hash(password, 10)
        const newAdmin = await Admin.create({ ...adminData, password: hashPasswordAdmin })
        res.status(REQUEST_SUCCESSFULL).json({
            message: 'Nouvelle Admin crée !',
            infos: newAdmin
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports.AdminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const admin = await Admin.findOne({ where: { email: email } })
        if (!admin) return res.status(NOT_FOUND).json({ message: 'Admin introuvable !' })
        const isMatch = await bcrypt.compare(password, admin.password)
        if (!isMatch) return res.status(NOT_FOUND).json({ message: 'Email ou mot de passe incorrect !' })

        res.status(REQUEST_SUCCESSFULL).json({
            message: 'connexion réussie !',
            id: admin.id,
            email: admin.email,
            token: jwt.sign({ id: admin.id, type: 'admin' }, 'SECRET_KEY', { expiresIn: '1h' })
        })
    } catch (error) {
        console.log(error)
    }
}



// ================= Items ============================== //

module.exports.addCategory = async (req, res) => {
    try {
        if (req.user.type !== "admin") return res.json({ message: "Pour admin uniquement !" })
        const basePath = 'uploads'
        const uploadPath = basePath + '/' + req.files.image.name.replaceAll(' ', '')
        req.files.image.mv(uploadPath, async function (err) {
            if (err) return res.status(500).send({ err })
        })
        req.body.image = uploadPath
        const newCategory = await Category.create(req.body)
        res.json({
            message: 'Nouvelle categorie',
            infos: newCategory
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports.addMarque = async (req, res) => {
    try {
        if (req.user.type !== "admin") return res.json({ message: "Pour admin uniquement !" })
        const basePath = 'uploads'
        const uploadPath = basePath + '/' + req.files.image.name.replaceAll(' ', '')
        req.files.image.mv(uploadPath, async function (err) {
            if (err) return res.status(500).send({ err })
        })
        req.body.image = uploadPath
        const newMarque = await Marque.create(req.body)
        res.json({
            message: 'Nouvelle marque créée !',
            infos: newMarque
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports.addProducts = async (req, res) => {
    try {
        if (req.user.type !== "admin") return res.json({ message: "Pour admin uniquement !" })
        const basePath = 'uploads'
        const uploadPath = basePath + '/' + req.files.image.name.replaceAll(' ', '')
        req.files.image.mv(uploadPath, async function (err) {
            if (err) return res.status(500).send({ err })
        })
        req.body.image = uploadPath
        const newProduct = await Products.create(req.body)
        res.json({
            message: 'Nouveau produit crée !',
            infos: newProduct
        })
    } catch (error) {
        console.log(error)
    }
}


// ========================== Filtres ================================= //

module.exports.productsBycategories = async (req, res) => {
    try {
        const categorie = Category.findByPk(req.params.id)
        if (!categorie) return res.status(NOT_FOUND).json({ message: "Categorie introuvable" })
        const products = await Products.findAll({ where: { categoryId: req.params.id } })
        if (!products) return res.status(NOT_FOUND).json({ message: "Aucun produits disponible pour cette categorie !" })
        res.status(REQUEST_SUCCESSFULL).json(products)
    } catch (error) {
        console.log(error)
    }
}

module.exports.productsByMarque = async (req, res) => {
    try {
        const marque = await Marque.findByPk(req.params.id)
        if (!marque) return res.status(NOT_FOUND).json({ message: "Marque introuvable !" })
        const products = await Products.findAll({ where: { marqueId: req.params.id } })
        if (!products) res.status(NOT_FOUND).json({ message: "Aucun produit disponible pour cette marque !" })
        res.status(REQUEST_SUCCESSFULL).json(products)
    } catch (error) {
        console.log(error)
    }
}

module.exports.productById = async (req, res) => {
    try {
        const product = await Products.findByPk(req.params.id)
        if(!product) return res.status(NOT_FOUND).json({ message: 'Produits introuvable' })
        res.status(REQUEST_SUCCESSFULL).json(product)
    } catch (error) {
        console.log(error)
    }
}
module.exports.searchProduct = async (req, res) => {
    try {
        const { query } = req.body
        if(!query || query.trim() === '') return res.json({ message: "Veuillez entrer un mot de recherche" })
        const products = await Products.findAll({ where: { name: { [Op.iLike]: `%${query}%` } } })
        if (products.length === 0) return res.status(NOT_FOUND).json({ message: "Aucun produit ne correspond a votre recherche !" })
        res.status(REQUEST_SUCCESSFULL).json(products)
    } catch (error) {
        console.log(error)
    }
}