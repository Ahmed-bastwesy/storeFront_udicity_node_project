import supertest from 'supertest';
import app from '../../../server';


const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Test responses from orders endpoints', (): void => {
  describe('endpoint: /orders', (): void => {
    it('for get all orders /orders', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/orders');
      expect(response.status).toBe(401);
    });
  });

  describe('endpoint: /orders/create', (): void => {
    it('for create order /orders/create', async (): Promise<void> => {
      const response: supertest.Response = await request.post(
        '/orders/create'
      );

      expect(response.status).toBe(401);
    });

    it('for get orders of user /orders/1', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/orders/1'
      );

      expect(response.status).toBe(401);
    });

    it('for get products of order  /orders/1/products', async (): Promise<void> => {
        const response: supertest.Response = await request.get(
          '/orders/1/products'
        );
  
        expect(response.status).toBe(401);
      });

    it('for delete /orders/1', async (): Promise<void> => {
        const response: supertest.Response = await request.del('/orders/1');
  
        expect(response.status).toBe(401);
      });
  });

  describe('endpoint: /order', (): void => {
    it('returns 404 for invalid endpoint', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/order');

      expect(response.status).toBe(404);
    });
  });
});
