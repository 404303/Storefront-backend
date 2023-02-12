import supertest from 'supertest';
import app from '../app';
import { JWTPayload } from '../interface/jwtpayload';

const request = supertest(app);
let token;

describe('testing for Endpoints ', () => {
  it('test for create user', async () => {
    const res = await request
      .post('/user/create')
      .send({
        firstName: 'SecondTest',
        lastName: 'The SmallerTester',
        password: 'NotSoSecretPassword',
      })
      .set('content-type', 'application/json');
    const result: JWTPayload = res.body;
    token = result.token;
    expect(result.firstName).toEqual('SecondTest');
    expect(res.status).toBe(200);
  });
  it('test for get all users', async () => {
    const res = await request.get('/user').auth(token, { type: 'bearer' });
    const result = res.body;
    expect(res.status).toBe(200);
    expect(result.length).toBeGreaterThan(0);
  });
  it('test for get user by id', async () => {
    const res = await request.get('/user/1').auth(token, { type: 'bearer' });
    const result = res.body;
    expect(res.status).toBe(200);
    expect(result.id).toEqual(1);
  });
  describe('testing for product model', () => {
    it('should create a new product', async () => {
      const res = await request
        .post('/product/create')
        .send({
          name: 'test',
          price: 10,
        })
        .set('content-type', 'application/json')
        .auth(token, { type: 'bearer' });
      const result = res.body;
      expect(result).toBe('product has been created');
      expect(res.status).toBe(200);
    });
    it('should get all products', async () => {
      const res = await request.get('/product').auth(token, { type: 'bearer' });
      const result = res.body;
      expect(res.status).toBe(200);
      expect(result.length).toBeGreaterThan(0);
    });
    it('should get a product by id', async () => {
      const res = await request
        .get('/product/1')
        .auth(token, { type: 'bearer' });
      const result = res.body;
      expect(res.status).toBe(200);
      expect(result.id).toEqual(1);
    });
  });
  describe('testing for order model', () => {
    it('should create a new order', async () => {
      const res = await request
        .post('/order/create')
        .send({
          productId: 1,
          quantity: 2,
        })
        .set('content-type', 'application/json')
        .auth(token, { type: 'bearer' });
      const result = res.body;
      expect(result).toBe('order has been created');
      expect(res.status).toBe(200);
    });
    it('should get all orders', async () => {
      const res = await request.get('/order/').auth(token, { type: 'bearer' });
      const result = res.body;
      expect(res.status).toBe(200);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
