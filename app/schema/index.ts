import { importSchema } from 'graphql-import';
import { gql } from 'apollo-server-express';

const typeDefs = importSchema('./app/schema/schema.graphql');

export default gql(typeDefs);
