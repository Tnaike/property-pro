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

  static async edit(req, res) {
    const { id } = req.params;
    const editableFields = [
      'title',
      'price',
      'state',
      'city',
      'address',
      'type',
      'image_url',
      'description',
      'bathroom',
      'bedroom'
    ];

    const propertyUpdate = {};
    editableFields.forEach((field) => {
      if (req.body[field]) {
        propertyUpdate[field] = req.body[field];
      }
    });
    let property = await PropertyModel.findProperty(id);

    if (!property) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Property not found' });
    }
    property = { ...property, ...propertyUpdate };
    property = await PropertyModel.update(property);
    return res
      .status(200)
      .json({ status: 'success', data: { property } });
  }

  static async sold(req, res) {
    const { id } = req.params;

    const accessToken = req.headers['x-access-token'];
    const { id: ownerId } = jwt.decode(accessToken);
    let property = await PropertyModel.findOwnerProperty(id, ownerId);

    if (!property) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Property not found' });
    }
    property = await PropertyModel.sale(id);
    return res
      .status(200)
      .json({ status: 'success', data: { property } });
  }

  static async delete(req, res) {
    const { id } = req.params;
    const accessToken = req.headers['x-access-token'];
    const { id: ownerId } = jwt.decode(accessToken);
    let property = await PropertyModel.findOwnerProperty(id, ownerId);

    if (!property) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Property not found' });
    }
    property = await PropertyModel.delete(id);
    return res
      .status(200)
      .json({ status: 'success', data: { message: 'Property deleted.' } });
  }
}

export default PropertyController;
