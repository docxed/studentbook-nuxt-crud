import gql from "graphql-tag"

export const USERS_QUERY = gql`
  query {
    users {
      _id
    }
  }
`

export const USER_QUERY = gql`
  query ($userId: MongoID!) {
    users(_id: $userId) {
      _id
      email
      fullname
    }
  }
`

export const ME_QUERY = gql`
  query {
    me {
      _id
      email
      fullname
    }
  }
`
