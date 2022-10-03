const {Item} = require('../sequelize/models/models')
const ApiError = require('../error/ApiError');

class ItemController {
    async create(req, res) {
        const {name} = req.body
        const item = await Item.create({name})
        return res.json(item)
    }

    async getAll(req, res) {
        console.log('ItemController: getAll')
        const items = await Item.findAll()
        return res.json(items)
    }

    async getOne(req,res) {
        const {id} = req.params
        const item = await Item.findOne(
            {
                where: {id}
            }
        )
            return res.json(item)
    }
}

module.exports = new ItemController()