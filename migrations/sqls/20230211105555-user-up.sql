/* Replace with your SQL commands */
CREATE TABLE users(
   	id SERIAL PRIMARY KEY,
   	password varchar(250) NOT NULL,
    firstname varchar(250) NOT NULL,
    lastname varchar(250) NOT NULL,
    salt varchar(125)
);