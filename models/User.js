const { DataTypes} = require("sequelize")
const { connection } = require("../config/db");
const Cart = require("./Cart");

const User = connection.define('User', {
  id: {
  type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cart_id: {
        type: DataTypes.UUID,
        references: {
            model: Cart,
            key: "id"
        }
    },
});

User.hasOne(Cart, {
  foreignKey: "cart_id",
  onDelete: "CASCADE"
});
Cart.belongsTo(User, {
  onDelete: "CASCADE"
}) 


module.exports = User;