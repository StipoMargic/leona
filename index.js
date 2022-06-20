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
const bcrypt = require("bcrypt");
const { signJwt, verifyJwt } = require("./config/jwt");

const init = async () => {
  try {
    await connection.authenticate();
    await Cart.sync({ force: false })
    await User.sync({ alter: true })
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
const userRouter = express.Router()

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use("/api", shop);
app.use("/api", userRouter);
app.use(verifyJwt)
shop.get("/", (req, res) => {
  return res.status(404).json("Radi")
})


shop.post("/categories",verifyJwt, async ( req, res) => {
  console.log(req.userId)
})

userRouter.post("/login", async (req, res) => {
  const user = await User.findOne({
    where: { email: req.body.email  }
  });
  if (user === null) {
      return res.json({ "message": "User not found! Please register first."})
  } 
  if (bcrypt.compareSync(req.body.password, user.password)) {
    const token = signJwt(user.id, user.role);
    const newUser = {...user.dataValues, token}
    return res.json(newUser);
  } else {
  return res.json({"message": "Invalid credentials!"})
  }
})
userRouter.route('/register').post(async  (req, res) => {
  const [user, created] = await User.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      role: "buyer",
      ...req.body
    }
  });
  if (created) {
    return res.json(user); 
  }
});

app.listen(port, ()=>{
    console.log("Running on port " + port);
});
