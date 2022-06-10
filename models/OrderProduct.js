const { DataTypes, Deferrable } = require("sequelize")
const { connection } = require("../config/db");
const { order } = require("./Order");
const { product } = require("./Product");

module.exports.orderProduct = connection.define("Order Product",{
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  order_id: {
    type: DataTypes.UUID,
    references: {
      model: order,
      key: 'id',
      deferrable: Deferrable.INITIALLY_IMMEDIATE
    },
  },
  product_id: {
    type: DataTypes.UUID,
    references: {
      model: product,
      key: 'id',
      deferrable: Deferrable.INITIALLY_IMMEDIATE
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
  price: {
    type: DataTypes.FLOAT,
  }
});

