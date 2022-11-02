const { Sequelize } = require('sequelize');

module.exports = new Sequelize({
    dialect: 'postgres',
    url: 'postgres://admin:J4zryWAYc5Pmw0BvQjRwPEhK5VmDmXxm@dpg-cdh5tjpgp3jpn59skq10-a.frankfurt-postgres.render.com/workportal'
  });