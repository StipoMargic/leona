const { DataTypes, Deferrable } = require("sequelize")
const { connection } = require("../config/db");
const Product  = require("./Product")

const ProductCategory = connection.define("ProductCategory", {
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
});

module.exports = ProductCategory