import supertest from 'supertest';
import app from '../../../server';


const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Test responses from products endpoints', (): void => {
  describe('endpoint: /products', (): void => {
    it('get all products /products', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/products');
      expect(response.status).toBe(200);
    });
  });

  describe('endpoint: /products/create', (): void => {
    it('for create product /products/create', async (): Promise<void> => {
      const response: supertest.Response = await request.post(
        '/products/create'
      );

      expect(response.status).toBe(401);
    });

    it('for get product /products/1', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/products/1'
      );

      expect(response.status).toBe(200);
    });

    it('for update /products/1', async (): Promise<void> => {
      const response: supertest.Response = await request.put('/products/1');

      expect(response.status).toBe(401);
    });
    it('for delete /products/1', async (): Promise<void> => {
        const response: supertest.Response = await request.del('/products/1');
  
        expect(response.status).toBe(401);
      });
  });

  describe('endpoint: /product', (): void => {
    it('returns 404 for invalid endpoint', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/product');

      expect(response.status).toBe(404);
    });
  });
});
