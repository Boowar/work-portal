const ApiError = require('../error/ApiError');
const {models} = require('../sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJwt = (id, username, role) => {
    return jwt.sign(
        {id, username, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {username, password, role, email} = req.body
        if (!username || !password) {
            return next(ApiError.badRequest('Некорректный name или password'))
        }
        const candidate = await models.User.findOne({where: {username}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким name уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await models.User.create({username, email, role, password: hashPassword})
        const token = generateJwt(user.id, user.username, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        console.log('UserController: login')
        const {username, password} = req.body
        const user = await models.User.findOne({where: {username}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.username, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.username, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()