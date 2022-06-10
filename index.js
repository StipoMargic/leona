const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const { connection } = require("./config/db")
const { user } = require("./models/User")
const { cart } = require("./models/Cart")
const { product } = require("./models/Product")
const { order } = require("./models/Order")
const { cartProduct } = require("./models/CartProduct")
const { orderProduct } = require("./models/OrderProduct")
const { productCategory } = require("./models/ProductCategory")


const init = async () => {
try {
  await connection.authenticate();
  await user.sync({ force: true })
  // await product.sync({ force: true })
  await cart.sync({ force: true })
  // await order.sync({ force: true })
  // await cartProduct.sync({ force: true })
  // await orderProduct.sync({ force: true })
  // await productCategory.sync({ force: true })
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
