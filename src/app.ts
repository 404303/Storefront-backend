import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import userRouter from './handlers/user';
import productRouter from './handlers/product';
import orderRouter from './handlers/order';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(userRouter, productRouter, orderRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Udacity Storefront API');
});

app.listen(port, () => {
  console.log(`server running http://localhost:${port}`);
  console.log(`press CTRL+C to stop server`);
});

export default app;
