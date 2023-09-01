import express, { json } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './app/routes/userRoute.js';
import productRoute from './app/routes/productRoute.js';
import basketRoute from './app/routes/basketRoute.js';
import cors from 'cors';
import 'dotenv/config.js';
import Product from "../models/product.js";

const app = express();
const port = process.env.PORT;
const db = process.env.MONGODB_URI;

app.use(cors());
app.use(bodyParser.json());
app.use('/users', userRoute);
app.use('/products', productRoute);
app.use('/basket', basketRoute);
app.use('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
    res.send(products);
  } catch (error) {
    res.status(500).json({ error: "Error while fetching products" });
  }
})

mongoose.connect(db)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

const start = async() => {
  try {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch(e) {
    console.log('Error', e)
  }
};

start();

