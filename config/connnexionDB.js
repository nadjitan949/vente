const { Sequelize } = require('sequelize')
require('dotenv').config();

const sequelize = new Sequelize(
    'postgresql://posgres:wHpibXXxAulOAUokiz4LBu87u1a4fQss@dpg-cv9gmn8fnakc739psa2g-a.oregon-postgres.render.com/shop_7f4w',
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