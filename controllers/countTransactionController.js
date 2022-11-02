const {models} = require('../sequelize')
const sequelize = require('../sequelize')
const ApiError = require('../error/ApiError');

class CountTransactionController {
    async create(req, res) {
        try {
            const {itemId, userId, count} = req.body
        //let {itemID} = req.body
        //itemID ? itemId = itemID : itemID = undefined
        console.log('CountTransactionController create req.body:', req.body)
        console.log('CountTransactionController create itemId:', itemId)
        //console.log('CountTransactionController create itemID:', itemID)
        console.log('CountTransactionController create userId:', userId)
        console.log('CountTransactionController create count:', count)
        const rating = await models.CountTransaction.create({itemId, userId, count})
        console.log('CountTransactionController create rating:', rating)
        return res.json(rating)}
        catch (error) {
            console.log('error',error)
        }
    }

    async getAll(req, res) {
        try {
        console.log('CountTransaction: getAll')
        const items = await models.CountTransaction.findAll({include: models.Item})
        return res.json(items)
        } catch (error) {
            console.log('error',error)
        }
    }

    async getAllCurrentCount(req, res) {
        try {
        console.log('CountTransaction: getAllCurrentCount')
        const items = await models.CountTransaction.findAll({
            attributes: {include:[[sequelize.fn('MAX', sequelize.col('CountTransaction.id')), 'id']]},
            include: [{model: models.Item, as: 'item'}],
            group: ['itemId']
        })
            console.log('CountTransaction: getAllCurrentCount', items)
            return res.json(items)
        } catch (error) {
            console.log('error',error)
        }
    }

    async getOneCurrentCount(req, res) {
        try {
        console.log('CountTransaction: getOneCurrentCount req.params', req.params)
        const {id} = req.params
        const item = await models.CountTransaction.findOne({
            where: {itemId: id},
            attributes: {
                include:[[sequelize.fn('MAX', sequelize.col('CountTransaction.id')), 'id']]
            },
            include: [{model: models.Item, as: 'item'}],
            group: ['itemId']
        })
        console.log('CountTransaction: getOneCurrentCount', item)
        return res.json(item)
    } catch (error) {
        console.log('error',error)
    }
    }    

    async getOne(req,res) {
        try {
        const {id} = req.params
        const item = await models.CountTransaction.findOne(
            {
                where: {id}
            }
        )
            return res.json(item)
        } catch (error) {
            console.log('error',error)
        }
    }

}

module.exports = new CountTransactionController()