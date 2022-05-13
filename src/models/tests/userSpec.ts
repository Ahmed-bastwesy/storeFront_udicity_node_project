import { User, UserShow, UserStore } from '../user';

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
    const result :User = await user.create({
      id:1,
      firstname: 'Ahmed',
      lastname: 'Bastwesy',
      username: ' Ahmed Reda',
      password: '123',
      superuser: 'admin'
    });
    if(result){
      expect(result.firstname).toEqual('Ahmed');
      expect(result.lastname).toEqual('Bastwesy');
      expect(result.username).toEqual(' Ahmed Reda');
      expect(result.superuser).toEqual('admin');
    }
  });

  it('index method should return a list of users', async () => {
    
    const result1 :UserShow[]= await user.index();
    expect(result1).toEqual([
      {
        id: 1,
        firstname: 'Ahmed',
        lastname: 'Bastwesy',
        username: ' Ahmed Reda',
        superuser: 'admin'
      },
    ]);
  });

  it('show method should return the correct user', async () => {
    const result1 :UserShow= await user.show(1);
    expect(result1).toEqual({
      id: 1,
      firstname: 'Ahmed',
      lastname: 'Bastwesy',
      username: ' Ahmed Reda',
      superuser: 'admin'
    });
  });

  it('delete method should remove the user', async () => {
    user.deleteUser(1);
    const result = await user.index();
    expect(result).toEqual([]);
  });
});
