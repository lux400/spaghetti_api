import { gql } from 'apollo-server-express';

export default gql`
  directive @auth(role: UserRole = user) on FIELD_DEFINITION
`;
