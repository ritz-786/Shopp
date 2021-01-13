import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import buyerRouter from './routes/buyer';
import sellerRouter from './routes/seller';
import productRouter from './routes/products';

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (_req, res) => {
  res.send('Welcome To DoorStep!');
});

app.use('/buyer', buyerRouter);
app.use('/seller', sellerRouter);
app.use('/products', productRouter);

mongoose
  .connect(
    `mongodb+srv://ruffle:${process.env.MONGODB_PASSWORD}@cluster0-rimcx.mongodb.net/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  // eslint-disable-next-line no-console
  .then(() => console.log('Database Connected'));

export default app;
