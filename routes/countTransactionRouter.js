const Router = require('express')
const router = new Router()
const countTransactionController = require('../controllers/countTransactionController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), countTransactionController.create)
router.get('/', countTransactionController.getAll)

module.exports = router