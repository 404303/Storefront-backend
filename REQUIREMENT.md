# API Requirements


## Endpoints
- User
    - create (POST /user/create) body {firstName, lastName, password}
    - getUsers (GET /user) Require token
    - getUserByIndex (GET /user/:id) Require token

- Product 
    - createProduct (POST /product/create) body {name, price, category} (Require token)
    - getProducts (GET /product)
    - getProductByIndex (GET /product/:id) take product id as param

- Order
    - createOrder (POST /order/create) body required { quantity, productId } (Require token)
    - getUserOrder (GET /order) (Require token)


## Data shape
- users
    - id
    - firstName
    - lastName
    - password

- product
    - id
    - name
    - price

- orders
    - id
    - user_id references user table as foreign key
    - status 


- order_products
    - id
    - quantity
    - product_id references product table as foreign key
    - order_id references orders table as foreign key


## Database schema

- User:
```
    +----------------------------------+
	|  Column   |        type          | 
	|-----------+----------------------|
	| id        |BIGSERIAL PRIMARY KEY |
	| password  |VARCHAR(250)          |
	| firstname |VARCHAR(250)          |
	| lastname  |VARCHAR(250)          |
	| salt      |VARCHAR(125)          |
	+----------------------------------+
```
- Product: 
```
    +----------------------------------+
	|  Column   |        type          | 
	|-----------+----------------------|
	| id        |SERIAL PRIMARY KEY    |
	| name      |VARCHAR(255)          |
	| price     |DECIMAL(10,2) NOT NULL|
	+----------------------------------+
```

- Order: 
```
    +--------------------------------------------+
	|  Column   |        type          		     | 
	|-----------+--------------------------------|
	| id        |SERIAL PRIMARY KEY  	         |
	| user_id   |INTEGER   FOREIGN KEY 		     |
	| status    |varchar(250) NOT NULL           |
	+--------------------------------------------+
```

- OrderProduct:
```
    +-----------------------------------------+
	|  Column    |      type          	      | 
	|------------+----------------------------|
	| id         |SERIAL PRIMARY KEY          |
	| quantity   |INTEGER NOT NULL 	          |
	| product_id |INTEGER NOT NULL FOREIGN KEY|
	| order_id   |INTEGER NOT NULL FOREIGN KEY|
	+-----------------------------------------+
```