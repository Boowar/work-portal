const {CountTransaction} = require('../sequelize/models/models')
const ApiError = require('../error/ApiError');

class CountTransactionController {
    async create(req, res) {
        const {name} = req.body
        const item = await CountTransaction.create({name})
        return res.json(item)
    }

    async getAll(req, res) {
        const items = await CountTransaction.findAll()
        return res.json(items)
    }

    async getOne(req,res) {
        const {id} = req.params
        const item = await CountTransaction.findOne(
            {
                where: {id}
            }
        )
            return res.json(item)
    }
}

module.exports = new CountTransactionController()