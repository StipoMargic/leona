const { Sequelize } = require("sequelize")

const db = "mysql://root:@localhost/leona"
module.exports.connection = new Sequelize(db);