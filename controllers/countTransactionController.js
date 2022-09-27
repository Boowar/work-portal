const {CountTransaction} = require('../sequelize/models/countTransaction.model')
const ApiError = require('../error/ApiError');

class CountTransactionController {
    async create(req, res) {
        const {name} = req.body
        const item = await Item.create({name})
        return res.json(item)
    }

    async getAll(req, res) {
        const items = await Item.findAll()
        return res.json(items)
    }

    async getOne(req,res) {
        const {id} = req.params
        const item = await DeviceMotionEvent.findOne(
            {
                where: {id}
            }
        )
            return res.json(item)
    }
}

module.exports = new CountTransactionController()