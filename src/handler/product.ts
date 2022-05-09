import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import { verifyAuthToken } from './user';

const product = new ProductStore();
const index = async (req: Request, res: Response) => {
  try {
    const products: Product[] = await product.index();
    res.json(products);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const addProduct: Product = {
      name: req.body.name,
      price: req.body.price,
      catagory: req.body.catagory
    };
    if (
      addProduct.name === undefined ||
      addProduct.price === undefined ||
      addProduct.catagory === undefined
    ) {
      res.status(400);
      res.send('this field is required name, price , catagory ');
      return;
    }

    const newProduct = await product.create(addProduct);
    res.json(newProduct);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const catagory = req.params.catagory as unknown as string;
    if (catagory === undefined) {
      res.status(400);
      res.send("can't find catagory in url.");
      return;
    }
    const getProducts: Product[] = await product.show(catagory);
    res.json(getProducts);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as unknown as number;
    const editProduct: Product = {
      name: req.body.name as unknown as string,
      price: req.body.price as unknown as number,
      catagory: req.body.catagory as unknown as string
    };
    if (id === undefined) {
      res.status(400);
      res.send("can't find id in url.");
      return;
    }
    if (
      editProduct.name === undefined ||
      editProduct.price === undefined ||
      editProduct.catagory === undefined
    ) {
      res.status(400);
      res.send('this field is required name, price , catagory ');
      return;
    }
    const updateProduct = await product.update(id, editProduct);

    res.json(updateProduct);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as unknown as number;

    if (id === undefined) {
      res.status(400);
      res.send("can't find id in url.");
      return;
    }
    await product.delete(id);
    res.send(`product with id ${id} successfully deleted.`);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

export default function productRoutes(app: express.Application) {
  app.get('/products', index);
  app.post('/products/create', verifyAuthToken, create);
  app.get('/products/:catagory', show);
  app.put('/products/:id', verifyAuthToken, update);
  app.delete('/products/:id', verifyAuthToken, deleteProduct);
}
