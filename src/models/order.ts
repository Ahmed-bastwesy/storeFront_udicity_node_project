/* eslint-disable camelcase */
import Client from '../database';

export type OrderProduct = {
  order_id?: number;
  product_id: number;
  quantity: number;
};

export type Order = {
  id?: number;
  products: OrderProduct[];
  user_id: number;
  status: string;
};

export class OrderStore {
  async index(): Promise<any> {
    try {
      const sql =
        'SELECT o.*, array_agg(row_to_json(op)) as products FROM orders o JOIN order_products op ON o.id = op.order_id GROUP BY o.id';
      const conn = await Client.connect();
      const { rows } = await conn.query(sql);
      return rows;
    } catch (e) {
      console.log('Error fetching all orders', e);
    }
  }

  async create(order: Order): Promise<Order> {
    const { products, status, user_id } = order;
    try {
      const sql =
        'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
      const connection = await Client.connect();
      const { rows } = await connection.query(sql, [user_id, status]);
      const order = rows[0];

      const orderProductsSql =
        'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING product_id, quantity';
      const orderProducts = [];

      for (const product of products) {
        const { product_id, quantity } = product;

        const { rows } = await connection.query(orderProductsSql, [
          order.id,
          product_id,
          quantity
        ]);

        orderProducts.push(rows[0]);
      }

      connection.release();

      return {
        ...order,
        products: orderProducts
      };
    } catch (err) {
      throw new Error(`Could not add new order for user ${user_id}. ${err}`);
    }
  }

  async showOrderProducts(id: number): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const connection = await Client.connect();
      const { rows } = await connection.query(sql, [id]);
      const order = rows[0];
      const orderProductsSql =
        'SELECT product_id, quantity FROM order_products WHERE order_id=($1)';
      const { rows: orderProductRows } = await connection.query(
        orderProductsSql,
        [id]
      );
      connection.release();
      return {
        ...order,
        products: orderProductRows
      };
    } catch (err) {
      throw new Error(`Could not find order ${id}. ${err}`);
    }
  }

  async showOrder(id: number): Promise<Order[]> {
    try {
      const sql = 'SELECT * FROM orders WHERE user_id=($1)';
      const connection = await Client.connect();
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not find orders of user ${id}. ${err}`);
    }
  }

  async deleteOrder(id: number): Promise<Order> {
    try {
      const connection = await Client.connect();
      const orderProductsSql = 'DELETE FROM order_products WHERE order_id=($1)';
      await connection.query(orderProductsSql, [id]);
      const sql = 'DELETE FROM orders WHERE id=($1)';
      const { rows } = await connection.query(sql, [id]);
      const order = rows[0];
      connection.release();
      return order;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. ${err}`);
    }
  }
}
