require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const router = require('./routes');

const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const { DEV_DB_HOST } = require('./utils/config');

const { PORT = 3000, DB_URL, NODE_ENV } = process.env;
const app = express();

mongoose.connect(
  NODE_ENV === 'production' && DB_URL
    ? DB_URL : DEV_DB_HOST,
)
  .then(() => console.log('Подключено к MongoDB'))
  .catch((err) => {
    console.error('Ошибка подключения к MongoDB:', err);
  });

app.use(express.json());
app.use(helmet());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(cookieParser());
app.use(cors);
app.use(requestLogger);
app.use(limiter);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(error);

app.listen(PORT, () => {
  console.log('Слушаю порт 3000');
});
