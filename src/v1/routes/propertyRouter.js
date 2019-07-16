import Router from 'express';
import PropertyController from '../controllers/PropertyController';
import validatePropertyFields from '../middlewares/validatePropertyFields';

const route = Router();

route.post('/', validatePropertyFields, PropertyController.create);
route.patch('/:id', validatePropertyFields, PropertyController.edit);
route.patch('/:id/sold', PropertyController.sold);
route.delete('/:id', PropertyController.delete);
route.get('/', PropertyController.getAllProperties);
route.get('/:id', PropertyController.getProperty);

export default route;
