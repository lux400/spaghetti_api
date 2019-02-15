import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import session from 'express-session';
import knexConnect from 'connect-session-knex';

import config from './config';
import router from './routes';
import { knex } from './models';
import errorHandler from './utils/errorHandler';

const app = express();

const KnexSessionStore = knexConnect(session);

const { host, port } = config;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 2147483647,
    },
    store: new KnexSessionStore({ knex }),
  }),
);
app.use('/uploads', express.static('uploads'));
app.use('/api', router);
app.use(errorHandler);

app.listen(port, host, () => {
  console.log(`listening on http://${host}:${port}`);
});
