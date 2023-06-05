// Set environment variables
require('dotenv').config();
require('module-alias/register');

// Import third-party
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');

// Import local file
const { MAX } = require('~/constants/validation');
const getEnv = require('~/utils/getEnv');
const corsConfig = require('~/configs/cors');
const { BASE_URL } = require('~/constants/common');
const logger = require('~/configs/logger');
const { postgresConnect } = require('~/configs/database');
const { SUCCESS_CODE } = require('~/constants/status-code');

// Config port
const app = express();
const SERVER_PORT = Number(getEnv('PORT') || 3001);

// Import Router
const orderRouter = require("./src/controllers/order.controller");

// Setup logger
if (getEnv('NODE_ENV') === 'production') app.use(morgan('common'));
else app.use(morgan('dev'));

// Config express server
app.use(express.json({ limit: MAX.SIZE_JSON_REQUEST }));
app.use(express.urlencoded({ limit: MAX.SIZE_JSON_REQUEST, extended: true }));
app.use(cookieParser());
app.use(cors(corsConfig));

// APIs
app.get(`${BASE_URL}/check-health`, (_, res) => res.status(SUCCESS_CODE.OK).json({ msg: 'OK' }));

// Router
app.use('/api/order', orderRouter);

// Listening
postgresConnect()
  .then(() => {
    app.listen(SERVER_PORT, () => {
      logger.info(`🚀 ORDER SERVICE IS LISTENING ON PORT ${SERVER_PORT} !`);
    });
  })
  .catch((err) => {
    logger.error('Connect to postgresql failed ! ', err);
  });
