import { importSchema } from 'graphql-import';
import { gql } from 'apollo-server-express';

const typeDefs = importSchema('./app/schema/schema.graphql');
const resolvers = {}
// const schema = makeExecutableSchema({ typeDefs, resolvers })
console.log(typeDefs);

export default gql(typeDefs);
