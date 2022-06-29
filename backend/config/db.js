const { Sequelize } = require("sequelize");

const db = "mysql://root:00000000@localhost/leona";
module.exports.connection = new Sequelize(db);
