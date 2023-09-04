import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoute from '../app/routes/userRoute.js'; 
import productRoute from '../app/routes/productRoute.js';
import basketRoute from '../app/routes/basketRoute.js';

const app = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(bodyParser.json());
app.use('/users', userRoute);
app.use('/products', productRoute);
app.use('/basket', basketRoute);


mongoose.connect(proccess.env.MONGODB_URI)
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

export default app;




