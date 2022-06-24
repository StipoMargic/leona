const { DataTypes} = require("sequelize")
const { connection } = require("../config/db");
const  ProductCategory = require("./ProductCategory");

const Product = connection.define("Products",{
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
    type: DataTypes.STRING
  },
  price: { 
    type: DataTypes.FLOAT,
  },
  category_id: {
        type: DataTypes.UUID,
        references: {
            model: ProductCategory,
            key: "id"
        }
    },
});

ProductCategory.hasMany(Product, {
  foreignKey: "category_id"
})
Product.belongsTo(ProductCategory)
module.exports = Product