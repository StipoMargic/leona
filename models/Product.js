const { DataTypes} = require("sequelize")
const { connection } = require("../config/db");

module.exports.product = connection.define("Products",{
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
   
  },
  price: {
    type: DataTypes.FLOAT,
  }
});