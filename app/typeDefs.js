import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  enum UserStatusEnum {
    active
    banned
    unconfirmed
  }

  type User {
    id: ID!
    email: String!
    password_hash: String!
    status_key: UserStatusEnum!
  }

  type Query {
    hello: String
    users: [User]!
  }

  type Mutation {
    register(email: String!, password: String!): User!
  }
`;
