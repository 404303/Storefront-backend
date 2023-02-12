import dotenv from 'dotenv';
import { Pool } from 'pg';
dotenv.config();

const {
  NODE_ENV,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DATABASE,
  POSTGRES_DATABASE_test,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} = process.env;

export const pool = new Pool({
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: NODE_ENV == 'dev' ? POSTGRES_DATABASE : POSTGRES_DATABASE_test,
  port: parseInt(POSTGRES_PORT),
  host: POSTGRES_HOST,
});
