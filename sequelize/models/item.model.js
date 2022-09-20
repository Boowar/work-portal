const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {sequelize.define('Item',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, defaultValue: 0},
})}