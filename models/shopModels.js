const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/connnexionDB')


const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, unique: true, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }
},
{
    timestamps: true
})

const Admin = sequelize.define('Admin', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, unique: true, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }
},
{
    timestamps: true
})

const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, unique: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false }
},
{
    timestamps: true
})

const Marque = sequelize.define('Marque', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, unique: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false }
},
{
    timestamps: false
})


const Products = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, unique: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: true },
    image: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false }

},
{
    timestamps: true
})

const Commande = sequelize.define('Commande', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, unique: true, primaryKey: true },
    status: { type: DataTypes.ENUM('en attente', 'payée', 'expédiée', 'livrée', 'annulée'), defaultValue: 'en attente' }
}, 
{ timestamps: true }
);

// Une Commande peut contenir plusieurs Products (relation Many-to-Many)
const CommandeProduct = sequelize.define('CommandeProduct', {
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
}, { timestamps: false });


// ======================= Relations tables ========================

Category.hasMany(Products, { foreignKey: 'categoryId' })
Products.belongsTo(Category, { foreignKey: 'categoryId' })

Marque.hasMany(Products, { foreignKey: 'marqueId' })
Products.belongsTo(Marque, { foreignKey: 'marqueId' })

User.hasMany(Commande, { foreignKey: 'userId' })
Commande.belongsTo(User, { foreignKey: 'userId' })

Commande.belongsToMany(Products, { through: CommandeProduct });
Products.belongsToMany(Commande, { through: CommandeProduct });


module.exports = { User, Admin, Marque, Category, Products, Commande }