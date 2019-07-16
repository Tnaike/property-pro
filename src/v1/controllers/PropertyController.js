/* eslint-disable camelcase */
import { users } from './AuthController';

const properties = [];

class PropertyController {
  static create(req, res) {
    const {
      title, price, state, city, address, type, image_url, description, bathroom, bedroom
    } = req.body;

    const accessToken = req.headers['x-access-token'];
    const existingUser = users.find(user => user.token === parseFloat(accessToken));

    if (!existingUser) {
      return res.status(404).json({
        status: 'error',
        message: 'Owner does not exist'
      });
    }
    const id = properties.length + 1;
    const AVAILABLE = 1;
    const property = {
      id,
      owner: existingUser.id,
      status: AVAILABLE,
      title,
      price,
      state,
      city,
      address,
      type,
      image_url,
      description,
      bathroom,
      bedroom,
      created_on: new Date()
    };
    properties.push(property);
    return res.status(201).json({ status: 'success', data: property });
  }

}

export default PropertyController;
