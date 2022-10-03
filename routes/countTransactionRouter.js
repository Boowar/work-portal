const Router = require('express')
const router = new Router()
const countTransactionController = require('../controllers/countTransactionController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), countTransactionController.create)
router.get('/alltransactions', countTransactionController.getAll)
router.get('/', countTransactionController.getAllCurrentCount)

module.exports = router