const { Sequelize } = require('sequelize')
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DATABASE_NAME,  // Nom de la base de données
    process.env.DATABASE_USER,  // Utilisateur
    process.env.DATABASE_PASSWORD,  // Mot de passe
    {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        dialect: process.env.DATABASE_DIALECT || 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
);

async function connect() {
    try {
        await sequelize.authenticate()
        console.log('Connexion réussie !')
        await sequelize.sync({ alter: true })
        console.log('Base de donnée synchronisée !')
    } catch (err) {
        console.log(`Erreur de connexion ${err}`);
    }
}

connect()

module.exports = { connect, sequelize }