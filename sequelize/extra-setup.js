function applyExtraSetup(sequelize) {
	const { Item, CountTransaction, User } = sequelize.models;

	//Item.CountTransaction = Item.hasMany(CountTransaction)
    CountTransaction.Item = CountTransaction.belongsTo(Item, {
        as: 'item',
        foreignKey: 'itemId'
      })

    //User.Item = User.hasMany(Item)
    Item.User = Item.belongsTo(User, {
        as: 'user',
        foreignKey: 'userId'
      })

    //User.CountTransaction = User.hasMany(CountTransaction)
    CountTransaction.User = CountTransaction.belongsTo(User, {
        as: 'user',
        foreignKey: 'userId'
      })
    console.log('applyExtraSetup ready')
}

module.exports = { applyExtraSetup };