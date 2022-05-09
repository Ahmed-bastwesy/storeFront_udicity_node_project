# storeFront_udicity_node_project
### Server
The server will listen on port 4000:

### Scripts
- Install:            ```npm install```
- watch:              ```npm run watch'```,
- test :              ```npm run test```,
- db-migrate up:      ```npm run db-up```,
- db-migrate down:    ```npm run db-down```,
- Prettify:           ```npm run prettify```,
- Start server:       ```npm run server```

### steps to run project successful
* config .env and put data about database and all missing data like this :
    
    POSTGRES_HOST=127.0.0.1
    POSTGRES_DB=storeFront
    POSTGRES_TEST_DB=storeFront_test
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=###
    ENv=dev
    BCRYPT_PASSWORD=###
    SALT_ROUNDS=10
    TOKEN_SECRET=###

* run  npm install to install node_modules

* run npm run server to start the server and enjoy