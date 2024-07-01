import { gql } from "@apollo/client";


export const SIGNUP = gql`
  mutation Signup($userData: UserSignup!) {
    signup(userData: $userData)
  }
`;

export const LOGIN = gql`
  mutation Login($userData: UserLogin!) {
    login(userData: $userData)
  }
`;