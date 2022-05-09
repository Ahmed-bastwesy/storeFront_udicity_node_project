import Client from '../database';

export type Product = {
  id?: number;
  name: string;
  catagory: string;
  price: number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  /* get products by catagory */
  async show(catagory: string): Promise<Product[]> {
    try {
      const sql = 'SELECT * FROM products WHERE catagory=($1)';
      const conn = await Client.connect();
      const result = await conn.query(sql, [catagory]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not find products ${catagory}. Error: ${err}`);
    }
  }

  async create(b: Product): Promise<Product> {
    try {
      const sql =
        'INSERT INTO products (name, price, catagory) VALUES($1, $2, $3) RETURNING *';
      const conn = await Client.connect();

      const result = await conn.query(sql, [b.name, b.price, b.catagory]);
      const product = result.rows[0];
      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not add new product ${b.name}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const sql = 'DELETE FROM products WHERE id=($1)';
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }

  async update(id: number, newProductData: Product): Promise<Product> {
    try {
      const sql =
        'UPDATE products SET name = $1, price = $2 , catagory = $3 WHERE id = $4 RETURNING *';
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        newProductData.name,
        newProductData.price,
        newProductData.catagory,
        id
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update user ${newProductData.name} . ${err}`);
    }
  }
}
