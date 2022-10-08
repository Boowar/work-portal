const {CountTransaction} = require('../sequelize/models/countTransaction.model')
const {models} = require('../sequelize')
const ApiError = require('../error/ApiError');

class ItemController {
    async create(req, res) {
        const {name, userId} = req.body
        console.log('ItemController req.body:  ', req.body)
        const item = await models.Item.create({
            name,
            userId}
            /*User:{
                user_id: '1',
            }}/*,{
                include :{assosiation: models.Item.User}
            }*/
        )
        const itemId = item.dataValues.id
        console.log('ItemController item:  ', item)
        console.log('ItemController item.dataValues.id:  ', item.dataValues.id)
        const rating = await models.CountTransaction.create({itemId, userId, count:0})     
       // console.log('ItemController rating:  ', rating)
        return res.json(rating)
    }

    async getAll(req, res) {
        console.log('ItemController: getAll')
        const items = await Item.findAll()
        return res.json(items)
    }

    async getOne(req,res) {
        const {id} = req.params
        const item = await models.Item.findOne(
            {
                where: {id}
            }
        )
            return res.json(item)
    }

}

module.exports = new ItemController()