const { DataTypes } = require("sequelize");
const { connection } = require("../config/db");
const bcrypt = require("bcrypt");

const User = connection.define("User", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false,
		primaryKey: true,
	},
	firstName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	role: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

User.beforeCreate((user) => {
	const hashedPassword = bcrypt.hashSync(user.password, 5);
	user.password = hashedPassword;
});

module.exports = User;
