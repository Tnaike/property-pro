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

  static edit(req, res) {
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

    const accessToken = req.headers['x-access-token'];
    const existingUser = users.find(user => user.token === parseFloat(accessToken));

    if (!existingUser) {
      return res.status(404).json({
        status: 'error',
        message: 'Owner does not exist'
      });
    }

    const propertyUpdate = {};
    editableFields.forEach((field) => {
      if (req.body[field]) {
        propertyUpdate[field] = req.body[field];
      }
    });

    const existingPropertyIndex = properties.findIndex(
      property => property.id === parseInt(id, 10)
    );

    if (existingPropertyIndex < 0) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Property not found' });
    }
    properties[existingPropertyIndex] = {
      ...properties[existingPropertyIndex],
      ...propertyUpdate
    };
    return res
      .status(200)
      .json({ status: 'success', data: { property: properties[existingPropertyIndex] } });
  }

  static sold(req, res) {
    const { id } = req.params;
    const accessToken = req.headers['x-access-token'];
    const existingUser = users.find(user => user.token === parseFloat(accessToken));
    if (!existingUser) {
      return res.status(404).json({
        status: 'error',
        message: 'Owner does not exist'
      });
    }

    const existingPropertyIndex = properties.findIndex(
      property => property.id === parseInt(id, 10) && property.owner === existingUser.id
    );

    if (existingPropertyIndex < 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Property does not exist'
      });
    }
    const SOLD = 0;
    properties[existingPropertyIndex] = {
      ...properties[existingPropertyIndex],
      status: SOLD
    };
    return res
      .status(200)
      .json({ status: 'success', data: { property: properties[existingPropertyIndex] } });
  }

  static delete(req, res) {
    const { id } = req.params;
    const accessToken = req.headers['x-access-token'];
    const existingUser = users.find(user => user.token === parseFloat(accessToken));
    if (!existingUser) {
      return res.status(404).json({
        status: 'error',
        message: 'Owner does not exist'
      });
    }

    const existingPropertyIndex = properties.findIndex(
      property => property.id === id && property.owner === existingUser.id
    );

    if (existingPropertyIndex < 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Property does not exist'
      });
    }
    properties.splice(existingPropertyIndex, 1);
    return res
      .status(200)
      .json({ status: 'success', data: { message: 'Property deleted.' } });
  }

  static getAllProperties(req, res) {
    return res.status(200).json({ data: { properties } });
  }

  static getAllOwnerProperties(req, res) {
    const accessToken = req.headers['x-access-token'];
    const existingUser = users.find(user => user.token === parseFloat(accessToken));
    if (!existingUser) {
      return res.status(404).json({
        status: 'error',
        message: 'Owner does not exist'
      });
    }
    const existingProperties = properties.filter(
      property => property.owner === existingUser.id
    );

    return res
      .status(200)
      .json({ status: 'success', data: { properties: existingProperties } });
  }

  static getAllPropertiesType(req, res) {
    // Todo: implement later
    return res.status(200).json({ data: { properties } });
  }

  static getProperty(req, res) {
    const { id } = req.params;
    const property = properties.find(existProperty => existProperty.id === id);
    return res.status(200).json({ status: 'success', data: { property } });
  }
}

export default PropertyController;
