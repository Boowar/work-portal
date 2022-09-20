const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('User',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, unique: true,},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const CountTransaction = sequelize.define('CountTransaction',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    count: {type: DataTypes.INTEGER, defaultValue: 0},
})

const Item = sequelize.define('Item',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, defaultValue: 0},
})

Item.hasMany(CountTransaction)
CountTransaction.belongsTo(Item)

User.hasMany(Item)
Item.belongsTo(User)

User.hasMany(CountTransaction)
CountTransaction.belongsTo(User)

const createAdmin = async () => await User.create({username: 'admin', email: 'admin@mail.ru', password: '123', role: 'admin'}).then(res=>console.log(res)).catch(err=>console.log(err))
const createUser = async () => await User.create({username: 'user', email: 'user@mail.ru', password: '123', role: 'user'}).then(res=>console.log(res)).catch(err=>console.log(err))
const createItem = async (name) => await Item.create({name: name, userId: 1}).then(res=>console.log(res)).catch(err=>console.log(err))


 
module.exports = {
    User,
    CountTransaction,
    Item,
    createAdmin,
    createUser,
    createItem,
}