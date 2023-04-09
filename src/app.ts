import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import { planetsRouter } from './routes/swapi';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';
import swaggerUi, { JsonObject } from 'swagger-ui-express';
import fs from 'fs';
import yaml from 'js-yaml';


const app = express();
const swaggerDocument = JSON.parse(fs.readFileSync('./openapi.json', 'utf8')) as JsonObject;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.set('trust proxy', true);
app.use(json());

app.use(planetsRouter)
app.all('*', async (req, res) => {
    throw new NotFoundError();
})
app.use(errorHandler);

export { app }