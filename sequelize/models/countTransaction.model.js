const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {sequelize.define('CountTransaction',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    count: {type: DataTypes.INTEGER, defaultValue: 0},
})}