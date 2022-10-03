const {CountTransaction, Item} = require('../sequelize/models/models')
const sequelize = require('../sequelize')
const ApiError = require('../error/ApiError');

class CountTransactionController {
    async create(req, res) {
        const {name} = req.body
        const item = await CountTransaction.create({name})
        return res.json(item)
    }

    async getAll(req, res) {
        console.log('CountTransaction: getAll')
        const items = await CountTransaction.findAll({include: Item})
        return res.json(items)
    }

    async getAllCurrentCount(req, res) {
        console.log('CountTransaction: getAll')
        const items = await CountTransaction.findAll({
            order: [sequelize.fn('MAX', sequelize.col('CountTransaction.id'))],
            include: Item, 
            group: ['itemId']
        })
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