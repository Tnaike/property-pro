/* eslint-disable camelcase */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserModel from '../models/User';

dotenv.config();

class AuthController {
  static async signin(req, res) {
    const { email, password } = req.body;
    const registeredUser = await UserModel.findUser(email, password);

    if (!registeredUser.rows.length) {
      return res.status(404).json({
        status: 'error',
        error: 'Invalid email address or password'
      });
    }
    const { id } = registeredUser.rows[0];
    const token = jwt.sign({ id }, process.env.TOKEN_SECRET);
    return res
      .status(200)
      .json({
        status: 'success',
        data: { token }
      });
  }

  static async signup(req, res) {
    const {
      email,
      first_name,
      last_name,
      password,
      phone_number,
      address,
      isAdmin
    } = req.body;
    try {
      const isExistingUser = await UserModel.findUser(email, password);

      if (isExistingUser.rows.length > 0) {
        return res.status(409).json({
          status: 'error',
          error: 'Email address has already been registered'
        });
      }

      const user = {
        first_name,
        last_name,
        email,
        password,
        phone_number,
        address,
        isAdmin
      };
      const newUser = await UserModel.registerUser(user);
      const { id } = newUser.rows[0];
      const token = jwt.sign({ id }, process.env.TOKEN_SECRET);

      return res.status(201).json({
        status: 'success',
        data: {
          token,
          id: newUser.id,
          first_name,
          last_name,
          email: user.email
        }
      });
    } catch (e) {
      return res.status(501).json({ status: 'error', error: 'Internal server error.' });
    }
  }
}

export default AuthController;
