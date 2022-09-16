const Router = require('express')
const router = new Router()
const itemRouter = require('./itemRouter')
const userRouter = require('./userRouter')
const countTransactionRouter = require('./countTransactionRouter')

router.use('/user', userRouter)
router.use('/item', itemRouter)
router.use('/counttransaction', countTransactionRouter)

module.exports = router