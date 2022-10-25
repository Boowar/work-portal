const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index')
const cors = require('cors')

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// We create a wrapper to workaround async errors not being transmitted correctly.
function makeHandlerAwareOfAsyncErrors(handler) {
    return async function(req, res, next) {
		try {
			await handler(req, res);
		} catch (error) {
			next(error);
		}
	};
}

// We provide a root route just as an example
app.get('/', (req, res) => {
    console.log(routes)
});

app.use('/api', makeHandlerAwareOfAsyncErrors(routes))

module.exports = app;