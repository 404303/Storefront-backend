import { JWTPayload } from '../interface/jwtpayload';
import { OrderInput } from '../interface/order';
import { Product } from '../interface/product';
import { User } from '../interface/user';
import { createOrder, getUserOrders } from '../model/order';
import { createProduct, getProduct, getProductById } from '../model/product';
import { createUser, getUserByIndex, getUsers } from '../model/user';

describe('testing for all models', () => {
  describe('testing for user model', () => {
    it('should create a new user', async () => {
      const user: User = {
        firstName: 'test',
        lastName: 'the tester',
        password: 'testSecretPassword',
      };
      const testUser: JWTPayload = await createUser(user);
      expect(testUser.firstName).toEqual(user.firstName);
    });
    it('should get all users', async () => {
      const users = await getUsers();
      expect(users.length).toBeGreaterThan(0);
    });

    it('should get a user by id', async () => {
      const user = await getUserByIndex(1);
      expect(user.id.toString()).toBe('1');
    });
  });
  describe('testing for product model', () => {
    it('should create a new product', async () => {
      const product: Product = {
        name: 'test',
        price: 10,
      };
      const testProduct: string = await createProduct(product);
      expect(testProduct).toBe('product has been created');
    });
    it('should get all products', async () => {
      const products = await getProduct();
      expect(products.length).toBeGreaterThan(0);
    });
    it('should get a product by id', async () => {
      const product = await getProductById(1);
      expect(product.id).toEqual(1);
    });
  });
  describe('testing for order model', () => {
    it('should create a new order', async () => {
      const order: OrderInput = {
        userId: '1',
        productId: '1',
        quantity: '2',
      };
      const testOrder: string = await createOrder(order);
      expect(testOrder).toBe('order has been created');
    });
    it('should get all orders', async () => {
      const orders = await getUserOrders(1);
      expect(orders.length).toBeGreaterThan(0);
    });
  });
});
