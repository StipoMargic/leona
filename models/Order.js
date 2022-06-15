const { DataTypes, Deferrable } = require("sequelize")
const { connection } = require("../config/db");
const User = require("./User")

const Order = connection.define("Order", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  order_time: {
    type: DataTypes.DATE,
  },
  total: {
    type: DataTypes.FLOAT,
  },
  user_id: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'id',
      deferrable: Deferrable.INITIALLY_IMMEDIATE
    }
  },
});

module.exports = Order