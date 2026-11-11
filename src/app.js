import express from 'express';
import cors from 'cors';

import router from './routes/index.js';
import {
  validationErrorHandler,
  sequelizeErrorHandler,
  errorHandler,
} from './middleware/index.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);
app.use(validationErrorHandler, sequelizeErrorHandler, errorHandler);

export default app;
