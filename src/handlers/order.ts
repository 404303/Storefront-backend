import { Router } from 'express';
import { Order, OrderInput } from '../interface/order';
import { getUserIdFromToken } from '../jwt/jwt';
import { createOrder, getUserOrders } from '../model/order';

const orderRouter = Router();

orderRouter.post('/order/create', async (req, res) => {
  try {
    const userId = await getUserIdFromToken(req.headers.authorization);
    const order: OrderInput = {
      userId: userId,
      productId: req.body.productId,
      quantity: req.body.quantity,
    };
    const result = await createOrder(order);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err.message);
  }
});
orderRouter.get('/order', async (req, res) => {
  try {
    const userId = await getUserIdFromToken(req.headers.authorization);
    const result = await getUserOrders(Number(userId));
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

export default orderRouter;
