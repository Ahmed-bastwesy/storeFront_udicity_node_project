import express, { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { User, UserShow, UserStore } from '../models/user';
const SECRET = process.env.TOKEN_SECRET as Secret;
const user = new UserStore();
const index = async (req: Request, res: Response) => {
  try {
    const users: UserShow[] = await user.index();
    res.json(users);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const addUser: User = {
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      username: req.body.userName,
      password: req.body.password
    };
    if (
      addUser.firstname === undefined ||
      addUser.lastname === undefined ||
      addUser.username === undefined ||
      addUser.password === undefined
    ) {
      res.status(400);
      res.send(
        'this field is required firstName, lastName , userName , password '
      );
      return;
    }
    if (req.body.superUser === undefined) {
      addUser.superuser = 'user';
    } else if (
      req.body.superUser !== 'admin' &&
      req.body.superUser !== 'user'
    ) {
      res.status(400);
      res.send('superUser must be admin or user  ');
      return;
    } else {
      addUser.superuser = req.body.superUser;
    }

    const newUser = await user.create(addUser);
    const token = jwt.sign({ user: newUser }, SECRET);
    res.json({ token: token, user: newUser });
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as unknown as number;
    if (id === undefined) {
      res.status(400);
      res.send("can't find id in url.");
      return;
    }
    const getUser: UserShow = await user.show(id);
    res.json(getUser);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as unknown as number;
    const editUser: UserShow = {
      firstname: req.body.firstName as unknown as string,
      lastname: req.body.lastName as unknown as string,
      username: req.body.userName as unknown as string
    };
    if (id === undefined) {
      res.status(400);
      res.send("can't find id in url.");
      return;
    }
    if (
      editUser.firstname === undefined ||
      editUser.lastname === undefined ||
      editUser.username === undefined
    ) {
      res.status(400);
      res.send('this field is required firstName, lastName , userName ');
      return;
    }
    const updateUser = await user.update(id, editUser);

    res.json(updateUser);
  } catch (error) {
    res.status(400);
    res.json('error habbedms');
  }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as unknown as number;

    if (id === undefined) {
      res.status(400);
      res.send("can't find id in url.");
      return;
    }
    await user.deleteUser(id);
    res.send(`User with id ${id} successfully deleted.`);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const userName = req.body.userName;
    const password = req.body.password;

    if (userName === undefined || password === undefined) {
      res.status(400);
      res.send('check that you enter username, password correct');
      return;
    }
    const auth: User | null = await user.login(userName, password);
    if (auth === null) {
      res.status(401);
      res.send(`Wrong password for user ${userName}.`);
      return;
    }
    const token = jwt.sign({ user: auth }, SECRET);
    res.json(token);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

export const verifyAuthToken = async (
  req: Request,
  res: Response,
  next: any
): Promise<void> => {
  try {
    const authorizationHeader: string | any = req.headers.authorization;
    const token = authorizationHeader.split(' ')[1];
    const decoded = jwt.verify(token, SECRET);
    next();
  } catch (error) {
    res.status(401);
    res.json('invalid token');
  }
};

export default function userRoutes(app: express.Application) {
  app.get('/users', verifyAuthToken, index);
  app.post('/users/create', create);
  app.get('/users/:id', verifyAuthToken, show);
  app.put('/users/:id', verifyAuthToken, update);
  app.delete('/users/:id', verifyAuthToken, deleteUser);
  app.post('/users/auth', authenticate);
}
