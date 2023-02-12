import { Order, OrderInput, OrderProduct } from '../interface/order';
import { pool } from '../server';

export const createOrder = async (order: OrderInput): Promise<string> => {
  // validate the order
  if (!order.userId || !order.productId || !order.quantity) {
    throw new Error('please provide all the information');
  }
  const product = await pool.query(
    `SELECT * FROM product WHERE id = ${order.productId}`,
  );
  if (product.rows.length === 0) {
    throw new Error(`the product id: ${order.productId} doesn't exist`);
  }
  try {
    const sql = `INSERT INTO orders(user_id, status) VALUES(${order.userId}, 'ACTIVE') RETURNING *`;
    const orderResult = await pool.query(sql);
    const orderId = orderResult.rows[0].id;
    const orderProduct = `INSERT INTO order_products(order_id, product_id, quantity) VALUES(${orderId}, ${order.productId}, ${order.quantity})`;
    await pool.query(orderProduct);
    return 'order has been created';
  } catch (err) {
    throw new Error(`the order can't be created`);
  }
};

export const getUserOrders = async (
  userId: number,
): Promise<OrderProduct[]> => {
  try {
    const order = await pool.query(
      `SELECT * FROM orders WHERE user_id = ${userId}`,
    );
    const orderIds = order.rows.map((order) => order.id);
    const sql = `SELECT * FROM order_products op JOIN orders o ON op.order_id=o.id join product p ON op.product_id =p.id
    WHERE o.id IN(${orderIds})`;
    const result = await pool.query(sql);
    const orders: OrderProduct[] = [];
    for (const order of result.rows) {
      const obj = {
        id: order.id,
        userId: order.user_id,
        status: order.status,
        products: {
          id: order.product_id,
          name: order.name,
          price: `${order.price}$`,
          quantity: order.quantity,
        },
      };
      orders.push(obj);
    }
    return orders;
  } catch (err) {
    console.log(err);
    throw new Error(`can't find the orders for user id: ${userId}`);
  }
};
