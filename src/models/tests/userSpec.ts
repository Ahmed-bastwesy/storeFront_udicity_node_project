import { UserStore } from '../user';

const user = new UserStore();

describe('User Model', () => {
  it('should have an index method', () => {
    expect(user.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(user.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(user.create).toBeDefined();
  });

  it('should have a update method', () => {
    expect(user.update).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(user.deleteUser).toBeDefined();
  });

  it('create method should add a user', async () => {
    const result = await user.create({
      firstName: 'Ahmed',
      lastName: 'Bastwesy',
      userName: ' Ahmed Reda',
      password: '123',
      superUser: 'admin'
    });
    expect(result).toEqual({
      id: 1,
      firstName: 'Ahmed',
      lastName: 'Bastwesy',
      userName: ' Ahmed Reda',
      password: '$2b$10$AD4.Ayicqg/GuSO.Z1.AwunbPrYkp0AqjCKdzIZPyBjq/JuUaqXvm',
      superUser: 'admin'
    });
  });

  it('index method should return a list of users', async () => {
    const result = await user.index();
    expect(result).toEqual([
      {
        id: 1,
        firstName: 'Ahmed',
        lastName: 'Bastwesy',
        userName: ' Ahmed Reda',
        superUser: 'admin'
      }
    ]);
  });

  it('show method should return the correct user', async () => {
    const result = await user.show(1);
    expect(result).toEqual({
      id: 1,
      firstName: 'Ahmed',
      lastName: 'Bastwesy',
      userName: ' Ahmed Reda',
      superUser: 'admin'
    });
  });

  it('delete method should remove the user', async () => {
    user.deleteUser(1);
    const result = await user.index();
    expect(result).toEqual([]);
  });
});
