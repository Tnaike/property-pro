import jwt from 'jsonwebtoken';
import PropertyModel from '../models/Property';

class PropertyController {
  static async create(req, res) {
    const {
      title, price, state, city, address, type, image_url, description, bathroom, bedroom
    } = req.body;
    const accessToken = req.headers['x-access-token'];
    const { id } = jwt.decode(accessToken);

    const AVAILABLE = 1;
    let property = {
      owner_id: id,
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
      views: 0
    };
    property = await PropertyModel.add(property);
    return res.status(201).json({ status: 'success', data: property });
  }
}

export default PropertyController;
