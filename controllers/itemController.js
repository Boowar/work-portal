const {models} = require('../sequelize')
const ApiError = require('../error/ApiError');

class ItemController {
    /*
    Функция для создания объекта Item.
    Принимает на вход имя объекта Item {name}
    Принимает на вход id пользователя, который создал объект Item {userId}

    Функция автоматически создает транзакцию для объекта Item, со значением {count = 0}
    */
    async create(req, res) {
        const {name, userId} = req.body
        console.log('ItemController create req.body:  ', req.body)
        const item = await models.Item.create({
            name,
            userId}
        )
        const itemId = item.dataValues.id
        console.log('ItemController item:  ', item)
        console.log('ItemController item.dataValues.id:  ', item.dataValues.id)
        const rating = await models.CountTransaction.create({itemId, userId, count:0})     
       // console.log('ItemController rating:  ', rating)
        return res.json(rating)
    }

    async rename(req, res) {
        const {itemId, name} = req.body
        console.log('ItemController rename req.body:', req.body)
        const item = await models.Item.findOne({
            where: {id: itemId}}
        )
        console.log('ItemController rename item:', item)
        const rename = await item.update({name: name})
        console.log('ItemController rename rename:', rename)
        return res.json(rename)
    }

    async delete(req, res) {
        const {itemId} = req.body
        console.log('ItemController delete req.body:', req.body)
        console.log('ItemController delete itemId:', itemId)
        const deletedCountTransaction = await models.CountTransaction.destroy({
            where: {
                itemId: itemId
            }
        })
        console.log('ItemController delete deletedCountTransaction:', deletedCountTransaction)
        const deletedItem = await models.Item.destroy({
            where: {
                id: itemId
            }
        })
        console.log('ItemController delete deletedItem:', deletedItem)

        return res.json(deletedItem)
    }

    /*
    Функция для получения всех объектов Item.
    Не принимает на вход данные

    На выходе объект {items}
    */
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