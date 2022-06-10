const { DataTypes, Deferrable } = require("sequelize")
const { connection } = require("../config/db");
const { product }  = require("./Product")

module.exports.productCategory = connection.define("ProductCategory", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  product_id: {
    type: DataTypes.UUID,
    references: {
      model: product,
      key: 'id',
      deferrable: Deferrable.INITIALLY_IMMEDIATE
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
});