import express from 'express';
import logger from 'morgan';

import MapRouter from './Routes/Map.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/maps', MapRouter);

app.listen(port, () => {
  console.log(`Starting server on port ${port}`);
});
