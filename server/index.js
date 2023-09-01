import express, { json } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './app/routes/userRoute.js';
import productRoute from './app/routes/productRoute.js';
import basketRoute from './app/routes/basketRoute.js';
import cors from 'cors';
import 'dotenv/config.js';

const app = express();
const port = process.env.PORT;
const db = process.env.MONGODB_URI;

app.use(cors());
app.use(bodyParser.json());
app.use('/', (req, res) => {
  res.send('Server is running');
})
app.use('/users', userRoute);
app.use('/products', productRoute);
app.use('/basket', basketRoute);


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

