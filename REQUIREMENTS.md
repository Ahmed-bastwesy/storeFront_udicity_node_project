# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index => http://localhost:4000/products    => get
- Show => http://localhost:4000/products/:id => get
- Create [token required] => http://localhost:4000/products/create => post
- update [token required] => http://localhost:4000/products/:id    => put
- delete [token required] => http://localhost:4000/products/:id    => delete
- [OPTIONAL] Products by category (args: product category) => http://localhost:4000/products/:catagory => get

#### Users
- Index [token required] => http://localhost:4000/users          => get
- Show [token required] => http://localhost:4000/users/:id       => get
- Create  => http://localhost:4000/users/create                  => post
- update [token required] => http://localhost:4000/users/:id     => put
- delete [token required] => http://localhost:4000/users/:id     => delete
- login => => http://localhost:4000/users/auth                   => post

#### Orders
- get all orders [token required] => http://localhost:4000/orders                                               => get
- create order [token required] => http://localhost:4000/orders/create                                          => post
- Current Order by user (args: user id)[token required] => http://localhost:4000/orders/:user id                => get
- get products by order (args: order id)[token required] => http://localhost:4000/orders/:orderid/products      => get
- delete order (args: order id)[token required] => http://localhost:4000/orders/:orderid                        => delete

## Data Shapes
#### Product
   Columns    |           Type
------------- | --------------------------
    id        |     integer
    name      |     character varying(200)
    price     |     iteger
    catagory  |     character varying(200)


#### User
 Columns      |            Type
------------- | --------------------------
  id          |     integer
  firstName   |     character varying(100)
  lastName    |     character varying(100)
  userName    |     character varying(100)
  password    |     character varying(100)
  superUser   |     catagory (type)


#### Orders
- id
- user_id
- status of order (active or complete)

#### Order_products
- order_id
- product_id
- quantity 

