/* eslint-disable camelcase */
import express, { Request, Response } from 'express';
import { Order, OrderProduct, OrderStore } from '../models/order';
import { verifyAuthToken } from './user';

const order = new OrderStore();

const index = async (req: Request, res: Response) => {
  try {
    const orders: Order[] = await order.index();
    res.json(orders);
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const products = req.body.products as unknown as OrderProduct[];
    const status = req.body.status as unknown as string;
    const user_id = req.body.user_id as unknown as number;

    if (
      products === undefined ||
      status === undefined ||
      user_id === undefined
    ) {
      res.status(400);
      res.send('this fields is required products, status, user_id');
      return;
    } else if (status !== 'active' && status !== 'completed') {
      res.status(400);
      res.send('status must be active or completed');
      return;
    } else if (products.length === 0) {
      res.status(400);
      res.send('products must not be empty');
      return;
    }
    for (const OrderProduct of products) {
      if (
        OrderProduct.quantity === undefined ||
        OrderProduct.product_id === undefined
      ) {
        res.status(400);
        res.send('product_id and quantity are required');
        return;
      }
    }

    const newOrder: Order = await order.create({ products, status, user_id });

    res.json(newOrder);
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};

/* show orders for user id */
const showOrders = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    if (id === undefined) {
      res.status(400);
      res.send("can't find id in url");
      return;
    }
    const getOrders: Order[] = await order.showOrder(id);
    res.json(getOrders);
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};

/* show products for specific order id */
const showProductOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    if (id === undefined) {
      res.status(400);
      res.send("can't find id in url");
      return;
    }
    const getOrders: Order = await order.showOrderProducts(id);
    res.json(getOrders);
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    if (id === undefined) {
      res.status(400);
      res.send("can't find id in url.");
      return;
    }
    await order.deleteOrder(id);

    res.send(`Order with id ${id} successfully deleted.`);
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};

export default function orderRoutes(app: express.Application) {
  app.get('/orders', verifyAuthToken, index);
  app.post('/orders/create', verifyAuthToken, create);
  app.get('/orders/:id', verifyAuthToken, showOrders);
  app.get('/orders/:id/products', verifyAuthToken, showProductOrder);
  app.delete('/orders/:id', verifyAuthToken, deleteOrder);
}
