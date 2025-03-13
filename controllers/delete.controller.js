const { User, Admin, Category, Marque, Products } = require("../models/shopModels")

const REQUEST_SUCCESSFULL = 200
const NOT_FOUND = 404

module.exports.delUser = async (req, res) => {
    try {
        if(req.user.type !== "admin") return res.json({ message: "Pour admin uniquement !" })  
        const user = await User.findByPk(req.params.id)
        if(!user){
            return res.status(NOT_FOUND).json({ message: "Utilisateur introuvable" })
        }
        await user.destroy()
        res.status(REQUEST_SUCCESSFULL).json({ message: `Utilisateur ID: ${req.params.id} supprimé !` })
    } catch (error) {
        console.log(error)
    }
}

module.exports.delAdmin = async (req, res) => {
    try {
        if(req.user.type !== "admin") return res.json({ message: "Pour admin uniquement !" })  
        const admin = await Admin.findByPk(req.params.id)
        if(!admin){
            return res.status(NOT_FOUND).json({ message: "Admin introuvable !" })
        }
        await admin.destroy()
        res.status(REQUEST_SUCCESSFULL).json({ message: `Admin ID: ${req.params.id} supprimé !` })
    } catch (error) {
        console.log(error)
    }
}

module.exports.delCategory = async (req, res) => {
    try {
        if(req.user.type !== "admin") return res.json({ message: "Pour admin uniquement !" })  
        const categorie = await Category.findByPk(req.params.id)
        if(!categorie){
            return res.status(NOT_FOUND).json({ message: "Categorie introuvable !" })
        }
        await categorie.destroy()
        res.status(REQUEST_SUCCESSFULL).json({ message: `Categorie ID: ${req.params.id} supprimé` })
    } catch (error) {
        console.log(error)
    }
}

module.exports.delMarque = async (req, res) => {
    try {
        if(req.user.type !== "admin") return res.json({ message: "Pour admin uniquement !" })  
        const marque = await Marque.findByPk(req.params.id)
        if(!marque){
            return res.status(NOT_FOUND).json({ message: "Marque introuvable" })
        }
        await marque.destroy()
        res.status(REQUEST_SUCCESSFULL).json({ message: `Marque ID: ${req.params.id} supprimé` })
        
    } catch (error) {
        console.log(error)
    }
}

module.exports.delProduct = async (req, res) => {
    try {
        if(req.user.type !== "admin") return res.json({ message: "Pour admin uniquement !" })  
        const product = await Products.findByPk(req.params.id)
        if(!product){
            return res.status(NOT_FOUND).json({ message: "Produit introuvable" })
        }
        await product.destroy()
        res.status(REQUEST_SUCCESSFULL).json({ message: `Produit ID: ${req.params.id} supprimé` })
    } catch (error) {
        console.log(error)
    }
}