import express from 'express';
import cors from 'cors'; // connects middleware. Allows API of diff port number to communicate
import bodyParser from 'body-parser'; // converts body to json file
import apiVersionOneRoute from './v1/routes';
import apiVersionTwoRoute from './v2/routes';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', apiVersionOneRoute);
app.use('/api/v2', apiVersionTwoRoute);
app.use('/', (req, res) => res.status(200).json({ status: 'success', message: 'PropertyPro property management.' }));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Application Started on port ${port}...`));

export default app;
