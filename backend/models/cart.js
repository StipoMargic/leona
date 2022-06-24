const { DataTypes} = require("sequelize")
const { connection } = require("../config/db");

const Cart = connection.define("Cart",{
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  },
);

module.exports = Cart