const Router = require('express')
const router = new Router()
const countTransactionController = require('../controllers/countTransactionController')
const itemController = require('../controllers/itemController')
const checkRole = require('../middleware/checkRoleMiddleware')

//router.post('/create', checkRole('ADMIN'), countTransactionController.create)
router.post('/create', countTransactionController.create)
router.get('/alltransactions', countTransactionController.getAll)
router.get('/', countTransactionController.getAllCurrentCount)
router.get('/:id', countTransactionController.getOneCurrentCount)

module.exports = router