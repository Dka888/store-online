import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoute from '../app/routes/userRoute.js'; 
import productRoute from '../app/routes/productRoute.js';
import basketRoute from '../app/routes/basketRoute.js';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = process.env.PORT || 3333;



app.get('/', (req, res) => {
  const path = `/api/item/${uuidv4()}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get('/item/:slug', (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

app.use(cors());
app.use(bodyParser.json());
app.use('/users', userRoute);
app.use('/products', productRoute);
app.use('/basket', basketRoute);
app.use('/', (req, res) => {
  res.send('Its wprking')
})

export default app;




