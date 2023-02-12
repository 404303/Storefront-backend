import { Product } from '../interface/product';
import { pool } from '../server';

export const createProduct = async (product: Product): Promise<string> => {
  //  validate the product
  if (!product.name || !product.price) {
    throw new Error('please provide all the information');
  }
  try {
    const sql = `INSERT INTO product(name,price) VALUES($1,$2)`;
    const result = await pool.query(sql, [product.name, product.price]);
    return 'product has been created';
  } catch (err) {
    console.log(err);
    throw new Error(`the Product can't be created`);
  }
};

export const getProduct = async (): Promise<Product[]> => {
  try {
    const result = await pool.query('SELECT * FROM product');
    return result.rows;
  } catch (err) {
    throw new Error("can't pull all products");
  }
};

export const getProductById = async (id: number): Promise<Product> => {
  try {
    const result = await pool.query(`SELECT * FROM product WHERE id = ${id}`);
    return result.rows[0];
  } catch (err) {
    throw new Error(`can't find the product id: ${id}`);
  }
};
