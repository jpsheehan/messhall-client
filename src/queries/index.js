import {gql} from 'apollo-boost';

const getUsersQuery = gql`
  {
    users {
      id
      name
      email
      role
      history {
        date
        type
      }
    }
  }
`;

const getUserDetailsQuery = gql`
  query ($id: Int!) {
    user(id: $id) {
      id
      name
      firstName
      lastName
      email
      role
      points
      history {
        id
        date
        points
        type
        reward {
          id
          name
        }
      }
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

const createTokenMutation = gql`
  mutation ($email: String!, $password: String!) {

    createSuperToken(input: {email: $email, password: $password}) {

      user {
        id
        name
        role
      }

      authToken

      token {
        id
      }

    }

  }
`;

const deleteTokenMutation = gql`

  mutation ($id: Int!) {

    deleteToken(input: {id: $id}) {
      user {
        id
      }
    }

  }

`;

const createPasswordResetMutation = gql`

  mutation ($email: String!) {

    createPasswordReset(input: {email: $email}) {
      email
    }

  }

`;

// const getFacilityDetailsQuery = gql`

//   {

//   }

// `;

const deleteUserMutation = gql`

  mutation ($id: Int!) {

    deleteUser(input: {id: $id}) {
      user {
        id
      }
    }

  }
`;

const editUserMutation = gql`

  mutation ($id: Int!, $patch: CreateUser!) {

    updateUser(input: {id: $id, patch: $patch}) {
      user {
        id
        name
        firstName
        lastName
        email
        role
        points
        history {
          id
          date
          points
          type
          reward {
            id
            name
          }
        }
      }
    }

  }

`;

const userSearchQuery = gql`

  query($nameOrId: String) {
    userSearch(nameOrId: $nameOrId) {
      id
      name
      email
      role
      history {
        date
        type
      }
    }
  }

`;

export {
  getUsersQuery, createUserMutation, getUserDetailsQuery, userSearchQuery,
  createTokenMutation, deleteTokenMutation,
  createPasswordResetMutation,
  deleteUserMutation, editUserMutation,
  // getFacilityDetailsQuery,
};
