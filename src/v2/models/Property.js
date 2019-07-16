/* eslint-disale camelcase */
import uuidV1 from 'uuid/v1';
import db from './index';

export default class PropertyModel {
  static async add(property) {
    const {
      owner_id, title, price, state, city, address, type, image_url, description, bathroom, bedroom, status, views
    } = property;
    const id = uuidV1();
    const createdAt = new Date();

    const query = 'INSERT INTO properties(id, owner_id, title, price, status, views, state, city, address, type, image_url, description, bathroom, bedroom, created_date) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)';

    const values = [id, owner_id, title, price, status, views, state, city, address, type, image_url, description, bathroom, bedroom, createdAt];

    try {
      await db.query(query, values);
      const propertyResult = await PropertyModel.findProperty(id);
      return propertyResult;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async update(property) {
    const {
      id, title, price, state, city, address, type, image_url, description, bathroom, bedroom
    } = property;

    const query = 'UPDATE properties SET title=$1, price=$2, state=$3, city=$4, address=$5, type=$6, image_url=$7, description=$8, bathroom=$9, bedroom=$10 WHERE id=$11 ';

    const values = [title, price, state, city, address, type, image_url, description, bathroom, bedroom, id];

    try {
      await db.query(query, values);
      const propertyResult = await PropertyModel.findProperty(id);
      return propertyResult;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async sale(id) {
    const query = 'UPDATE properties SET status=$1 WHERE id=$2';
    const values = [0, id];

    try {
      await db.query(query, values);
      const propertyResult = await PropertyModel.findProperty(id);
      return propertyResult;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async delete(id) {
    const query = 'DELETE FROM properties WHERE id=$1';
    const values = [id];

    try {
      await db.query(query, values);
      const propertyResult = await PropertyModel.findProperty(id);
      return propertyResult;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async findProperty(id) {
    const query = 'SELECT * FROM properties WHERE id=$1';
    const values = [id];
    const propertyResult = await db.query(query, values);
    return propertyResult.rows ? propertyResult.rows[0] : null;
  }

  static async findAll() {
    const query = 'SELECT * FROM properties';
    const propertyResult = await db.query(query, []);
    return propertyResult.rows ? propertyResult.rows : [];
  }

  static async findOwnerProperty(id, ownerId) {
    const query = 'SELECT * FROM properties WHERE id=$1 AND owner_id=$2';
    const values = [id, ownerId];
    const propertyResult = await db.query(query, values);
    return propertyResult.rows ? propertyResult.rows[0] : null;
  }

  static async findOwnerProperties(ownerId) {
    const query = 'SELECT * FROM properties WHERE owner_id=$1';
    const values = [ownerId];
    const propertyResult = await db.query(query, values);
    return propertyResult.rows ? propertyResult.rows : [];
  }
}
