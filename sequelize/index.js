const { applyExtraSetup } = require('./extra-setup');
const sequelize = require('./db')


const modelDefiners = [
	require('./models/user.model'),
	require('./models/item.model'),
	require('./models/countTransaction.model')
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	console.log('modelDefiner ready: ', modelDefiner)
	modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;