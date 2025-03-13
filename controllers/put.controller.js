const { User, Category, Admin, Marque, Products } = require("../models/shopModels")
const bcrypt = require('bcrypt')
const { marques } = require("./get.controller")

const REQUEST_SUCCESSFULL = 200
const NOT_FOUND = 404

module.exports.setUser = async (req, res) => {
    try {

        const { password, ...userDatas } = req.body
        const hashPassword = await bcrypt.hash(password, 10)

        const user = await User.findByPk(
            req.params.id
        )

        if (!user) {
            return res.status(NOT_FOUND).json({ message: "Cet utilisateur n'existe pas" })
        }

        await user.update({ ...userDatas, password: hashPassword })
        res.status(REQUEST_SUCCESSFULL).json({
            message: "Utilisateur modifié !",
            info: user
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports.setAdmin = async (req, res) => {
    try {

        if (req.user.type !== "admin") return res.json({ message: "Pour admin uniquement !" })
        const { password, ...adminDatas } = req.body
        const hashPassword = await bcrypt.hash(password, 10)

        const admin = await Admin.findByPk(
            req.params.id
        )
        if (!admin) {
            return res.status(NOT_FOUND).json({ message: "Cet admin n'existe pas" })
        }

        await admin.update({ ...adminDatas, password: hashPassword })
        res.status(REQUEST_SUCCESSFULL).json(admin)
    } catch (error) {
        console.log(error)
    }
}

module.exports.setCategory = async (req, res) => {
    try {
        if (req.user.type !== "admin") return res.json({ message: "Pour admin uniquement !" })
        const categorie = await Category.findByPk(
            req.params.id
        )
        if (!categorie) {
            return res.status(NOT_FOUND).json({
                message: "Categorie introuvable",
            })
        }
        if (req.files && req.files.image) {
            const basePath = 'uploads';
            const uploadPath = basePath + '/' + req.files.image.name.replaceAll(' ', '');
            
            req.files.image.mv(uploadPath, async function (err) {
                if (err) return res.status(500).send({ err });
            });

            req.body.image = uploadPath
        }
        await categorie.update(req.body)
        res.status(REQUEST_SUCCESSFULL).json(categorie)
    } catch (error) {
        console.log(error)
    }
}

module.exports.setMarque = async (req, res) => {
    try {
        if (req.user.type !== "admin") return res.json({ message: "Pour admin uniquement !" })
        const marque = await Marque.findByPk(
            req.params.id
        )
        if (!marque) {
            return res.status(NOT_FOUND).json({ message: "Marque introuvable" })
        }

        if (req.files && req.files.image) {
            const basePath = 'uploads';
            const uploadPath = basePath + '/' + req.files.image.name.replaceAll(' ', '');

            // Déplacer l'image
            req.files.image.mv(uploadPath, async function (err) {
                if (err) return res.status(500).send({ err });
            });

            // Mettre à jour l'attribut image dans req.body
            req.body.image = uploadPath
        }

        await marque.update(req.body)
        res.status(REQUEST_SUCCESSFULL).json(marque)
    } catch (error) {
        console.log(error)
    }
}

module.exports.setProduct = async (req, res) => {
    try {
        if (req.user.type !== "admin") return res.json({ message: "Pour admin uniquement !" })
        const product = await Products.findByPk(req.params.id)
        if (!product) {
            return res.status(NOT_FOUND).json({ message: "Ce produit n'existe pas" })
        }

        if (req.files && req.files.image) {
            const basePath = 'uploads';
            const uploadPath = basePath + '/' + req.files.image.name.replaceAll(' ', '');

            // Déplacer l'image
            req.files.image.mv(uploadPath, async function (err) {
                if (err) return res.status(500).send({ err });
            });

            // Mettre à jour l'attribut image dans req.body
            req.body.image = uploadPath
        }

        await product.update(req.body)
        res.status(REQUEST_SUCCESSFULL).json(product)

    } catch (error) {
        console.log(error)
    }
}