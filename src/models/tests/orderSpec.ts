import { OrderStore } from '../order';

const order = new OrderStore();

describe('Order Model', () => {
  it('should have an index method', () => {
    expect(order.index).toBeDefined();
  });

  it('should have a showOrders for user id method', () => {
    expect(order.showOrder).toBeDefined();
  });

  it('should have a create method', () => {
    expect(order.create).toBeDefined();
  });

  it('should have a showOrderProducts method', () => {
    expect(order.showOrderProducts).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(order.deleteOrder).toBeDefined();
  });
});
