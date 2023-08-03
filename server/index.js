import express, { json } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './app/routes/userRoute.js';
import productRoute from './app/routes/productRoute.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3333;
app.use(cors());
app.use(bodyParser.json());
app.use('/users', userRoute);
app.use('/products', productRoute);


mongoose.connect('mongodb+srv://dymitrkosow:fullStack4444@cluster0.zkbb11w.mongodb.net/?retryWrites=true&w=majority')
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

