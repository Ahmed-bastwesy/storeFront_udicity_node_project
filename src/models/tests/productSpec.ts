import { ProductStore } from '../product';

const product = new ProductStore();

describe('Product Model', () => {
  it('should have an index method', () => {
    expect(product.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(product.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(product.create).toBeDefined();
  });

  it('should have a update method', () => {
    expect(product.update).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(product.delete).toBeDefined();
  });

  it('create method should add a product', async () => {
    const result = await product.create({
      name: 'ps5',
      catagory: 'sport',
      price: 350
    });
    expect(result).toEqual({
      id: 1,
      name: 'ps5',
      catagory: 'sport',
      price: 350
    });
  });

  it('index method should return a list of products', async () => {
    const result = await product.index();
    expect(result).toEqual([
      {
        id: 1,
        name: 'ps5',
        catagory: 'sport',
        price: 350
      }
    ]);
  });

  it('show method should return the match catagory products', async () => {
    const result = await product.show('sport');
    expect(result).toEqual([
      {
        id: 1,
        name: 'ps5',
        catagory: 'sport',
        price: 350
      }
    ]);
  });

  it('delete method should remove the product', async () => {
    product.delete(1);
    const result = await product.index();
    expect(result).toEqual([]);
  });
});
