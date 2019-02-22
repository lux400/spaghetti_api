import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import session from 'express-session';
import knexConnect from 'connect-session-knex';
import { ApolloServer } from 'apollo-server-express';

import config from './config';
import router from './routes';
import { knex } from './models';
import errorHandler from './utils/errorHandler';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

const KnexSessionStore = knexConnect(session);

const { host, port } = config;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

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

server.applyMiddleware({ app });

app.listen(port, host, () => {
  console.log(`listening on http://${host}:${port}`);
});
