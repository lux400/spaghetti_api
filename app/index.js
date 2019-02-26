import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
import passport from 'passport';
import passportJWT from 'passport-jwt';
import jwt from 'jsonwebtoken';
import config from './config';
import * as models from './models';
import schema from './schema';
import resolvers from './resolvers';

const { host, port } = config;

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: ({ req }) => ({
    req,
    models,
  }),
});

const { Strategy, ExtractJwt } = passportJWT;

const params = {
  secretOrKey: config.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const strategy = new Strategy(params, (payload, done) => {
  console.log(payload);

  return done(null, payload);
});

passport.use(strategy);

const app = express();

app.use(passport.initialize());

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/uploads', express.static('uploads'));

app.use('/graphql', (req, res, next) => {
  console.log(next);
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    console.log(user);
    if (user) {
      req.user = user;
    }

    next();
  })(req, res, next);
});

server.applyMiddleware({ app });

app.listen(port, host, () => {
  console.log(`listening on http://${host}:${port}`);
});
