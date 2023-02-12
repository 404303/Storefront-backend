import { Router, Request, Response } from 'express';
import { ensureToken } from '../jwt/jwt';
import { createProduct, getProductById, getProduct } from '../model/product';
import { Product } from '../interface/product';

const productRouter = Router();

productRouter.get('/product/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await getProductById(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

productRouter.get('/product', async (req: Request, res: Response) => {
  try {
    const result = await getProduct();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

productRouter.post('/product/create', async (req: Request, res: Response) => {
  try {
    await ensureToken(req.headers.authorization);
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
    };
    const result = await createProduct(product);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

export default productRouter;
