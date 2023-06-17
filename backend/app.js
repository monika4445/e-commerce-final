const express = require('express');
const app = express();
const path = require("path");
const cors = require("cors");
require('dotenv').config();

const user_router = require('./router/userRout');
const product_router = require('./router/productRout');
const cartProduct_router = require('./router/cartproductRout');
const category_router = require('./router/categoryRout');
const order_router = require('./router/orderRout');

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(stripeSecretKey);

app.use(express.static(path.join(__dirname + "/static")))
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors()); 
app.use(express.json());

app.use("/user", user_router);
app.use("/prod", product_router);
app.use("/cartProd", cartProduct_router);
app.use("/category", category_router);
app.use("/order", order_router)


const port = process.env.PORT || 3500;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


