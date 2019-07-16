import uuidV1 from 'uuid/v1';

/* eslint-disale camelcase */
import db from './index';

export default class User {
  static async registerUser(user) {
    const {
      first_name, last_name, email, password, address, phone_number
    } = user;
    const id = uuidV1();
    const createdAt = new Date();

    const query = 'INSERT INTO users(id, first_name, last_name, email, password, address, phone_number, created_date) VALUES($1, $2, $3, $4, $5, $6, $7, $8)';
    const values = [id, first_name, last_name, email, password, address, phone_number, createdAt];
    try {
      await db.query(query, values);
      const newUser = await User.findUser(email, password);
      return newUser;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async findUser(email, password) {
    const query = 'SELECT * FROM users WHERE email=$1 AND password=$2';
    const values = [email, password];
    const user = await db.query(query, values);
    return user;
  }
}
