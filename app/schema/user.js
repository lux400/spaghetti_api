import { gql } from 'apollo-server-express';

export default gql`
  enum UserStatusEnum {
    active
    banned
    unconfirmed
  }

  enum UserRoleEnum {
    user
    admin
  }

  type User {
    id: ID!
    email: String!
    firstName: String
    lastName: String
    passwordHash: String!
    statusKey: UserStatusEnum!
    roleKey: UserRoleEnum!
    confirmationCode: String
  }

  type Query {
    users: [User]!
    me: User
  }

  type Mutation {
    updateUser(id: ID, email: String, firstName: String, lastName: String, statusKey: String): User
  }
`;