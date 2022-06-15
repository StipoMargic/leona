const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const { connection } = require("./config/db")
const User = require("./models/User")
const Cart = require("./models/Cart")
const Product = require("./models/Product")
const Order = require("./models/Order")
const CartProduct = require("./models/CartProduct")
const OrderProduct = require("./models/OrderProduct")
const ProductCategory = require("./models/ProductCategory")


const init = async () => {
try {
  await connection.authenticate();
  await Cart.sync({ force: false })
  await User.sync({ force: false })
  await ProductCategory.sync({ force: false })
  await Product.sync({ force:  false })
  await Order.sync({ force: false })
  await CartProduct.sync({ force: false })
  await OrderProduct.sync({ force: false })
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
}
init()


const app = express();
const port = 4000;

const shop = express.Router();

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use("/api", shop);

shop.get("/", (req, res) => {
  return res.status(404).json("Radi")
})

app.listen(port, ()=>{
    console.log("Running on port " + port);
});
