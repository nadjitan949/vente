const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]

    if(!token) return res.json({ message: 'Accèes non autorisé ! Token manquan' })

    try {
        const decode = jwt.verify(token, 'SECRET_KEY')
        req.user = decode
        next()
    } catch (error) {
        return res.json({ message: 'Token expiré !' })
    }
}

module.exports = verifyToken