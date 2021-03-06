const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connection } = require("./config/db");
const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");
const OrderProduct = require("./models/OrderProduct");
const ProductCategory = require("./models/ProductCategory");
const bcrypt = require("bcrypt");
const upload = require("./config/uploadMiddleware");
const Resize = require("./config/Resize");
const { signJwt, verifyJwt } = require("./config/jwt");

const init = async () => {
	try {
		await connection.authenticate();
		await User.sync({ alter: true });
		await ProductCategory.sync({ alter: true });
		await Product.sync({ alter: true });
		await Order.sync({ alter: true });
		await OrderProduct.sync({ alter: true });
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};
init();

const app = express();
const port = 4000;

const shop = express.Router();
const userRouter = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use("/api", shop);
app.use("/api", userRouter);
app.use(verifyJwt);
shop.get("/", (req, res) => {
	return res.status(404).json("Radi");
});

shop.post("/post", upload.single("image"), async function (req, res) {});

shop.post(
	"/categories",
	[verifyJwt, upload.single("image")],
	async (req, res) => {
		if (req.user.role !== "admin") {
			return res.status(401).json({ message: "You are not allowed here!" });
		}
		const imagePath = path.join(__dirname, "/public/images");
		const fileUpload = new Resize(imagePath);
		if (!req.file) {
			res.status(401).json({ error: "Please provide an image" });
		}
		const filename = await fileUpload.save(req.file.buffer);
		const [category, created] = await ProductCategory.findOrCreate({
			where: { name: req.body.name },
			defaults: {
				name: req.body.name,
				imageURL: filename,
			},
		});
		if (created) {
			return res.status(201).json(category);
		}
	}
);

shop.get("/categories", async (req, res) => {
	return res.status(200).json(await ProductCategory.findAll());
});

shop.get("/categories/:name", async (req, res) => {
	const category = await ProductCategory.findOne({
		where: { name: req.params.name },
	});
	if (category === null) {
		return res.status(404).json({ message: "Category not found!" });
	}
	return res.json(await category.getProducts());
});

shop.delete("/categories/:name", verifyJwt, async (req, res) => {
	if (req.user.role !== "admin") {
		return res.status(401).json({ message: "You are not allowed here!" });
	}
	const category = await ProductCategory.findOne({
		where: { name: req.params.name },
	});
	if (category === null) {
		return res.status(404).json({ message: "Category not found!" });
	}
	await ProductCategory.destroy({
		where: { name: req.params.name },
	});
	return res.status(204).json();
});

shop.patch("/categories/:name", verifyJwt, async (req, res) => {
	if (req.user.role !== "admin") {
		return res.status(401).json({ message: "You are not allowed here!" });
	}
	const category = await ProductCategory.findOne({
		where: { name: req.params.name },
	});
	if (category === null) {
		return res.status(404).json({ message: "Category not found!" });
	}
	const updating = await ProductCategory.update(
		{
			...req.body,
		},
		{
			where: { name: req.params.name },
		}
	);
	if (updating[0] === 1) {
		const updatedCategory = await ProductCategory.findOne({
			where: { name: req.body.name },
		});
		return res.json(updatedCategory);
	}
	return res.status(500).json({ message: "Server error..." });
});

shop.get("/products", async (req, res) => {
	return res.json(await Product.findAll());
});

shop.get("/products/:pName", async (req, res) => {
	const product = await Product.findOne({
		where: { name: req.params.pName },
	});
	if (product === null) {
		return res.status(404).json({ message: "Product not found!" });
	}
	return res.json(product);
});

shop.delete("/products/:pName", verifyJwt, async (req, res) => {
	if (req.user.role !== "admin") {
		return res.status(401).json({ message: "You are not allowed here!" });
	}
	const product = await Product.findOne({
		where: { name: req.params.pName },
	});
	if (product === null) {
		return res.status(404).json({ message: "Product not found!" });
	}
	await Product.destroy({
		where: { name: req.params.pName },
	});
	return res.status(204).json();
});

shop.post(
	"/products",
	[upload.single("image"), verifyJwt],
	async (req, res) => {
		if (req.user.role !== "admin") {
			return res.status(401).json({ message: "You are not allowed here!" });
		}
		const product = await Product.findOne({
			where: { name: req.body.name },
		});
		if (product !== null) {
			return res.status(404).json({ message: "Product already exist!" });
		}
		const imagePath = path.join(__dirname, "/public/images");
		const fileUpload = new Resize(imagePath);
		if (!req.file) {
			res.status(401).json({ error: "Please provide an image" });
		}
		const filename = await fileUpload.save(req.file.buffer);
		try {
			const newProduct = await Product.create({
				...req.body,
				imageURL: filename,
			});
			return res.status(201).json(newProduct);
		} catch (error) {
			console.log(error);
		}
	}
);

shop.patch("/products/:pName", verifyJwt, async (req, res) => {
	if (req.user.role !== "admin") {
		return res.status(401).json({ message: "You are not allowed here!" });
	}

	const p = await Product.findOne({ where: { name: req.params.pName } });
	const updating = Product.update(
		{
			...req.body,
		},
		{
			where: { name: req.params.pName },
		}
	);

	if (updating[0] === 1) {
		return res.status(201).json(await Product.findByPk(p.id));
	}

	return res.status(500).json({ message: "Server error... " });
});

userRouter.post("/login", async (req, res) => {
	const user = await User.findOne({
		where: { email: req.body.email },
	});
	if (user === null) {
		return res
			.status(404)
			.json({ message: "User not found! Please register first." });
	}
	if (bcrypt.compareSync(req.body.password, user.password)) {
		const token = signJwt(user.id, user.role);
		const newUser = { ...user.dataValues, token };
		return res.json(newUser);
	} else {
		return res.status(400).json({ message: "Invalid credentials!" });
	}
});
userRouter.route("/register").post(async (req, res) => {
	const [user, created] = await User.findOrCreate({
		where: { email: req.body.email },
		defaults: {
			role: "buyer",
			...req.body,
		},
	});
	if (created) {
		return res.json(user);
	}
});

app.listen(port, () => {
	console.log("Running on port " + port);
});
