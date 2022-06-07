import gql from "graphql-tag"

export const STUDENTS_QUERY = gql`
  query {
    students {
      _id
      studentId
      firstname
      lastname
      address
      fullname
      user {
        _id
        email
        fullname
      }
    }
  }
`
