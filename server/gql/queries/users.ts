export const createUserMutation = gql`
  mutation createUser ($user: UserInput!) {
    createUser (user: $user) {
      email
    }
  }
`

export const deleteUserMutation = gql`
  mutation deleteUser ($id: String!) {
    deleteUser (id: $id) {
      id
    }
  }
`

export const fetchSingleUserQuery = gql`
  query fetchSingleUser {
    singleUser {
      id
      firstName
      lastName
      email
      group
      role
    }
  }
`