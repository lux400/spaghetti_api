import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import config from './config';
import * as models from './models';
import schema from './schema';
import resolvers from './resolvers';
import { getUserByToken } from './services/Auth';
import { AuthDirective } from './directives';
const { host, port } = config;

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers as any,
  context: async ({ req }) => {
    const { token } = req.headers;
    const user = await getUserByToken(token);
    return { req, models, user };
  },
  schemaDirectives: {
    auth: AuthDirective,
  },
  debug: false,
});

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));

server.applyMiddleware({ app });

app.listen(port, host, () => {
  console.log(`listening on http://${host}:${port}`);
});
