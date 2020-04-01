import qql from 'graphql-tag'

export const USER_QUERY = gql`
  query UserQuery{
    me{
      color
      gender
      email
      name
    }
  }
`

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!){
    login(email: $email, password: $password) {
      ok,
      token
    }
  }
`

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($user: ProfileInput){
    updateProfile(user: $user) { id, name, email }
}
`

export const REGISTER_QUERY = gql`
  mutation Register($email: String!, $name:String!, $password:String!){
    registerUser(email: $email, name:$name, password:$password) { email }
}`

export const RESET_PASSWORD_REQUEST = gql`
  mutation ResetPasswordRequest($email: String!){
    resetPasswordRequest(email: $email)
}
`

export const RESET_PASSWORD = gql`
  mutation ResetPassword($code:String!, $email: String!, $password:String!){
    resetPassword(code:$code, email: $email, password:$password)
}
`