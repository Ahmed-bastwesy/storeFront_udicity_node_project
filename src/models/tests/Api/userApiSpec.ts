import supertest from 'supertest';
import app from '../../../server';


const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Test responses from users endpoints', (): void => {
  describe('endpoint: /users', (): void => {
    it('get all users /users', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/users');
      expect(response.status).toBe(401);
    });
  });

  describe('endpoint: /users/create', (): void => {
    it('for create user /users/create', async (): Promise<void> => {
      const response: supertest.Response = await request.post(
        '/users/create'
      );

      expect(response.status).toBe(400);
    });

    it('for get user /users/1', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/users/1'
      );

      expect(response.status).toBe(401);
    });

    it('for update /users/1', async (): Promise<void> => {
      const response: supertest.Response = await request.put('/users/1');

      expect(response.status).toBe(401);
    });
    it('for delete /users/1', async (): Promise<void> => {
        const response: supertest.Response = await request.del('/users/1');
  
        expect(response.status).toBe(401);
      });
  });

  describe('endpoint: /user', (): void => {
    it('returns 404 for invalid endpoint', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/user');

      expect(response.status).toBe(404);
    });
  });
});
