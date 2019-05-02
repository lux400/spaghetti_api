import { gql } from 'apollo-server-express';

export default gql`
  type User {
    id: ID!
    email: String!
    firstName: String
    lastName: String
    passwordHash: String!
    statusKey: UserStatus!
    roleKey: UserRole!
    confirmationCode: String
    token: String
    refreshToken: String
  }

  type Query {
    users(authToken: String): [User]!
    user(id: Int!): User @auth
    me(authToken: String): User @auth
  }

  type Mutation {
    updateUser(
      id: ID
      email: String
      firstName: String
      lastName: String
      statusKey: String
    ): User @auth
  }
`;
