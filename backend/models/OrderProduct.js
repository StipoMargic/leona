const { DataTypes, Deferrable } = require("sequelize")
const { connection } = require("../config/db");
const Order = require("./Order");
const Product = require("./Product");

const OrderProduct = connection.define("Order Product",{
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  order_id: {
    type: DataTypes.UUID,
    references: {
      model: Order,
      key: 'id',
      deferrable: Deferrable.INITIALLY_IMMEDIATE
    },
  },
  product_id: {
    type: DataTypes.UUID,
    references: {
      model: Product,
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



module.exports = OrderProduct