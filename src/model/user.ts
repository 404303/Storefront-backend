import { pool } from '../server';
import { getUser, User } from '../interface/user';
import { token } from '../jwt/jwt';
import bcrypt from 'bcrypt';
import { JWTPayload } from '../interface/jwtpayload';

export const createUser = async (user: User): Promise<JWTPayload> => {
  // validate the user
  if (!user.firstName || !user.lastName || !user.password) {
    throw new Error('please provide all the information');
  }
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(user.password, salt);
  try {
    const sql = `INSERT INTO "users"(firstname,lastname,password,salt) VALUES($1,$2,$3,$4) RETURNING *`;
    const result = await pool.query(sql, [
      user.firstName,
      user.lastName,
      hashedPassword,
      salt,
    ]);
    const createdUser = result.rows[0];
    delete createdUser.password;
    delete createdUser.salt;
    const userToken = await token(result.rows[0]);

    const jwtpayload: JWTPayload = {
      id: createdUser.id,
      firstName: createdUser.firstname,
      lastName: createdUser.lastname,
      token: userToken,
    };
    return jwtpayload;
  } catch (err) {
    console.log(err);
    throw new Error(`the user can't be created`);
  }
};

export const getUsers = async (): Promise<getUser[]> => {
  try {
    const result = await pool.query('SELECT * FROM users');
    const users: getUser[] = result.rows;
    for (const user of users) {
      delete user.password;
      delete user.salt;
    }
    return users;
  } catch (err) {
    console.log(err);
    throw new Error("can't pull all users");
  }
};

export const getUserByIndex = async (id: number): Promise<getUser> => {
  try {
    const result = await pool.query(`SELECT * FROM users WHERE id = ${id}`);
    const user: getUser = result.rows[0];
    delete user.password;
    delete user.salt;

    return user;
  } catch (err) {
    throw new Error(`can't find the user id: ${id}`);
  }
};
