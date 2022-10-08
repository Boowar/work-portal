const sequelize = require('./sequelize')

async function reset() {
    console.log('Will rewrite the SQLite example database, adding some dummy data.')

    await sequelize.sync({ force: true })

    await sequelize.models.User.bulkCreate([
        {username: 'admin', email: 'admin@mail.ru', password: '$2a$05$d03lRFN5F1jeH/TsaG4jmeSw8pyYCZxCt2vTH4xtWHl2yeUTE2DDG', role: 'admin'},
        {username: 'user', email: 'user@mail.ru', password: '$2a$05$R8CSf6O1mU/ojU0xP3Q.seQpJ0ROVPfE4FQSZMtTwAXGYkto0o0FC', role: 'user'}
    ])

    await sequelize.models.Item.bulkCreate([
        {name: 'Поликлиника', userId: 1},
        {name: 'Стационар', userId: 1}
    ])

    await sequelize.models.CountTransaction.bulkCreate([
        {count: 0, itemId: 1, userId: 1},
        {count: 0, itemId: 2, userId: 2},
        {count: 1, itemId: 2, userId: 2},
        {count: 2, itemId: 2, userId: 2},
        {count: 1, itemId: 1, userId: 1},
        {count: 2, itemId: 1, userId: 1},
        {count: 1, itemId: 2, userId: 2},
    ])

    console.log('Done!')

}

reset()