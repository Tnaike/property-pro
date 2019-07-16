import Router from 'express';
import AuthRouter from './authRouter';
import PropertyRouter from './propertyRouter';

const app = Router();
app.use('/auth', AuthRouter);
app.use('/property', PropertyRouter);

export default app;
