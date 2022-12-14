const Router = require('express')
const router = new Router()
const itemController = require('../controllers/itemController')
const checkRole = require('../middleware/checkRoleMiddleware')

//router.post('/create', checkRole('ADMIN'), itemController.create)
router.post('/create', itemController.create)
router.post('/rename', itemController.rename)
router.post('/delete', itemController.delete)
router.get('/', itemController.getAll)
router.get('/:id', itemController.getOne)

module.exports = router