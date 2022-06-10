const { DataTypes, Deferrable } = require("sequelize")
const { connection } = require("../config/db");
const { user } = require("./User")

module.exports.order = connection.define("Order", {
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
      model: user,
      key: 'id',
      deferrable: Deferrable.INITIALLY_IMMEDIATE
    }
  },
});

