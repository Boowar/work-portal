require('dotenv').config()
//const express = require('express')
const app = require('./app')
const sequelize = require('./sequelize')
//const models = require('./routes/index')
//const cors = require('cors')
//const router = require('./routes/index')
//const errorHandler = require('./middleware/ErrorHandlingMiddleware')
//const path = require('path')

const PORT = process.env.PORT || 3001

//const app = express()
//app.use(cors())
//app.use(express.json())
//app.use('/api', router)

//app.use(errorHandler)

async function assertDatabaseConnectionOk() {
	console.log(`Checking database connection...`);
	try {
		await sequelize.authenticate();
		console.log('Database connection OK!');
	} catch (error) {
		console.log('Unable to connect to the database:');
		console.log(error.message);
		process.exit(1);
	}
}

async function init() {
	await assertDatabaseConnectionOk();

	console.log(`Starting Sequelize + Express example on port ${PORT}...`);

	app.listen(PORT, () => {
		console.log(`Express server started on port ${PORT}. Try some routes, such as '/api/users'.`);
	});
}

init();

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()


        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


//start()

