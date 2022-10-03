const sequelize = require('./sequelize')

async function reset() {
    console.log('Will rewrite the SQLite example database, adding some dummy data.')

    await sequelize.sync({ force: true })

    await sequelize.models.User.bulkCreate([
        {username: 'admin', email: 'admin@mail.ru', password: '123', role: 'admin'},
        {username: 'user', email: 'user@mail.ru', password: '111', role: 'user'}
    ])

    await sequelize.models.Item.bulkCreate([
        {name: 'Поликлиника', UserId: 1},
        {name: 'Стационар', UserId: 1}
    ])

    await sequelize.models.CountTransaction.bulkCreate([
        {count: 0, ItemId: 1, UserId: 1},
        {count: 0, ItemId: 2, UserId: 2},
        {count: 1, ItemId: 2, UserId: 2},
        {count: 2, ItemId: 2, UserId: 2},
        {count: 1, ItemId: 1, UserId: 1},
        {count: 2, ItemId: 1, UserId: 1},
        {count: 1, ItemId: 2, UserId: 2},
    ])

    console.log('Done!')

}

reset()