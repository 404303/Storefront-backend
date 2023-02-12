import { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { User } from '../interface/user';
import { ensureToken } from '../jwt/jwt';
import { createUser, getUserByIndex, getUsers } from '../model/user';

const userRouter = Router();

userRouter.post(
  '/user/create',
  bodyParser.json(),
  async (req: Request, res: Response) => {
    try {
      const user: User = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
      };
      const jwtpayload = await createUser(user);
      res.status(200).json(jwtpayload);
    } catch (err) {
      res.status(400).json(err.message);
    }
  },
);

userRouter.get('/user', async (req: Request, res: Response) => {
  try {
    await ensureToken(req.headers.authorization);
    const users = await getUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

userRouter.get('/user/:id', async (req: Request, res: Response) => {
  try {
    await ensureToken(req.headers.authorization);
    const id = parseInt(req.params.id);
    const userById = await getUserByIndex(id);
    res.status(200).json(userById);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

export default userRouter;
