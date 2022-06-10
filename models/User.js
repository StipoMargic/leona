const { DataTypes} = require("sequelize")
const { connection } = require("../config/db");
const { cart } = require("./cart");

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
            model: cart,
            key: "id"
        }
    },
});

User.hasOne(cart, {
foreignKey: "cart_id"
});
cart.belongsTo(User)

module.exports.user = User;