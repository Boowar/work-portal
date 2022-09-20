function applyExtraSetup(sequelize) {
	const { Item, CountTransaction, User } = sequelize.models;

	Item.hasMany(CountTransaction)
    CountTransaction.belongsTo(Item)

    User.hasMany(Item)
    Item.belongsTo(User)

    User.hasMany(CountTransaction)
    CountTransaction.belongsTo(User)
}

module.exports = { applyExtraSetup };