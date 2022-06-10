const { DataTypes, Deferrable} = require("sequelize")
const { connection } = require("../config/db");
const { user } = require("./User")

const Cart = connection.define("Cart",{
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  },
);

module.exports.cart = Cart