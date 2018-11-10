import {gql} from 'apollo-boost';

const getUsersQuery = gql`
  {
    users {
      id
      name
      email
      role
    }
  }
`;

const createUserMutation = gql`
  mutation($firstName: String!, $lastName: String!,
    $email: String!, $password: String!, $role: String!) {

    createUser(input: {firstName: $firstName, lastName: $lastName,
      email: $email, password: $password, role: $role}) {

      user {
        id
        name
      }

    }

  }
`;

export {
  getUsersQuery, createUserMutation,
};
