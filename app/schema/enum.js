import { gql } from 'apollo-server-express';

export default gql`
  enum UserStatus {
    active
    banned
    unconfirmed
  }

  enum UserRole {
    user
    admin
  }
`;
