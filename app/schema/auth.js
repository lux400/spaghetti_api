import { gql } from 'apollo-server-express';

export default gql`
  type Tokens {
    token: String!
    refreshToken: String!
  }

  extend type Mutation {
    register(email: String!, password: String!, firstName: String, lastName: String): User!
    login(email: String!, password: String!): User!
    token(refreshToken: String!): Tokens
  }
`;
