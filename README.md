# Storefront Backend Project

This project is a backend storefront for website that can make user register and create orders with a specifics products, the project was made as requirement project for udacity

## Getting Started

This repo contains storefront backend application 

##  Technologies Stack
The Following technologies stack was used in this project:
- PostgresSQL
- dotenv
- Node/Express
- db-migrate
- Json Web Token (JWT)
- Bcrypt
- jasmine from npm for testing

## Setup the Database
Create the database for both dev and test to start the application
-  Connect to the base route in postgres ```psql -U postgres```
-  Create a user if with the credential ```CREATE USER postgres WITH PASSWORD postgres;```
-  Create Databases for dev ```CREATE DATABASE "Storefront-database";```
- Create Database for test   ```CREATE DATABASE "Storefront-database_test";```

## Environment Variables
    ```
    NODE_ENV=dev
    PORT=3000
    POSTGRES_HOST=localhost
    POSTGRES_PORT=5432
    POSTGRES_DATABASE=Storefront-database
    POSTGRES_DATABASE_test=Storefront-database_test
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=postgres
    TOKEN_SECRET=a74085e0f502135b6d1fb90d0ac6c52da219ea6f84f3f1e7b8bd36131e7d31d540aaff49e2c7418555fbff8301990000281cbabf4771a3cee769963a0801f9e1
    ```

## Steps to start the application
- Install the required packages ```yarn```
- Run the script to run all migrations: ```yarn table:run```
- To start the application: ```yarn start```
- For testing it will build and migrate and start jasmine by this script: ```yarn test```

## Scripts
- Install dependencies: ```yarn``` 
- To start the server: ```yarn start``` 
- To start the server with nodemon: ```yarn dev```
- To start the test with jasmine: ```yarn test``` it will run build before start and migrate test db
- To run all migration files: ```yarn table:run```
- To revert the migration: ```yarn table:down```

## API Requirement
Check the REQUIREMENT.md for the data shape and the endpoint as required
