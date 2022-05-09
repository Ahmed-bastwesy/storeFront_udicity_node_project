import express from 'express';
import userRoutes from './handler/user';
import bodyParser from 'body-parser';
import productRoutes from './handler/product';
import orderRoutes from './handler/order';

const app = express();
const port = 4000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
userRoutes(app);
productRoutes(app);
orderRoutes(app);
app.listen(port, async (): Promise<void> => {
  console.log(`server listening to port : ${port}`);
});

export default app;
