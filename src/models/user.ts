import bcrypt from 'bcrypt';
import Client from '../database';

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export type User = {
  id?: number ;
  firstname?: string;
  lastname?: string;
  username?: string;
  password: string;
  superuser?: string;
};

export type UserShow = {
  id?: number;
  firstname?: string;
  lastname?: string;
  username?: string;
  superuser?: string;
};

export class UserStore {
  async index(): Promise<UserShow[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT id ,firstName,lastName,userName,superUser FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. ${err}`);
    }
  }

  async show(id: number): Promise<UserShow> {
    try {
      const sql =
        'SELECT id,firstName,lastName,userName,superUser FROM users WHERE id=($1)';
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const sql =
        'INSERT INTO users (firstName, lastName, userName, password, superUser )VALUES($1, $2, $3, $4 , $5) RETURNING *';
      const hash = bcrypt.hashSync(
        user.password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as string)
      );
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        user.firstname,
        user.lastname,
        user.username,
        hash,
        user.superuser
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add new user ${user.username}. ${err}`);
    }
  }

  async update(id: number, newUserData: UserShow): Promise<UserShow> {
    try {
      const sql =
        'UPDATE users SET firstName = $1, lastName = $2 , userName = $3 WHERE id = $4 RETURNING *';
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        newUserData.firstname,
        newUserData.lastname,
        newUserData.username,
        id
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update user ${newUserData.username} . ${err}`);
    }
  }

  async deleteUser(id: number): Promise<boolean> {
    try {
      const sql = 'DELETE FROM users WHERE id=($1)';
      const conn = await Client.connect();
      await conn.query(sql, [id]);
      conn.release();
      return true;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. ${err}`);
    }
  }

  async login(username: string, password: string): Promise<User | null> {
    try {
      const sql = 'SELECT * FROM users WHERE userName=($1)';
      const conn = await Client.connect();
      const result = await conn.query(sql, [username]);
      if (result.rows.length > 0) {
        const user: User = result.rows[0];
        if (bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password)) {
          return user;
        }
      }
      conn.release();
      return null;
    } catch (err) {
      throw new Error(`Could not find user ${username}. ${err}`);
    }
  }
}
