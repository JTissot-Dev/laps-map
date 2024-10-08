import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

export type CanvasInput = {
  northEst: Scalars['String']['input'];
  northWest: Scalars['String']['input'];
  southEst: Scalars['String']['input'];
  southWest: Scalars['String']['input'];
};

export type Difficulty = {
  __typename?: 'Difficulty';
  id: Scalars['ID']['output'];
  laps: Array<Lap>;
  level: Scalars['String']['output'];
};

export type Image = {
  __typename?: 'Image';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  imgUrl?: Maybe<Scalars['String']['output']>;
  lap: Lap;
};

export type Lap = {
  __typename?: 'Lap';
  createdAt: Scalars['DateTimeISO']['output'];
  difficulty: Difficulty;
  duration?: Maybe<Scalars['String']['output']>;
  geometry: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  images?: Maybe<Array<Image>>;
  name: Scalars['String']['output'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  login: Scalars['String']['output'];
  signup: Scalars['String']['output'];
};


export type MutationLoginArgs = {
  userData: UserLogin;
};


export type MutationSignupArgs = {
  userData: UserSignup;
};

export type Query = {
  __typename?: 'Query';
  lapById: Lap;
  lapsByCanvas: Array<Lap>;
  lapsByCity: Array<Lap>;
};


export type QueryLapByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryLapsByCanvasArgs = {
  canvas: CanvasInput;
};


export type QueryLapsByCityArgs = {
  city: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  birthDay: Scalars['DateTimeISO']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  laps: Array<Lap>;
  lastName: Scalars['String']['output'];
  password: Scalars['String']['output'];
};

export type UserLogin = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UserSignup = {
  birthDay: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignupMutationVariables = Exact<{
  userData: UserSignup;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: string };

export type LoginMutationVariables = Exact<{
  userData: UserLogin;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type GetLapsCanvasQueryVariables = Exact<{
  canvas: CanvasInput;
}>;


export type GetLapsCanvasQuery = { __typename?: 'Query', lapsByCanvas: Array<{ __typename?: 'Lap', id: string, name: string, duration?: string | null, geometry: string, createdAt: any, difficulty: { __typename?: 'Difficulty', level: string }, images?: Array<{ __typename?: 'Image', imgUrl?: string | null }> | null }> };

export type GetLapsCityQueryVariables = Exact<{
  city: Scalars['String']['input'];
}>;


export type GetLapsCityQuery = { __typename?: 'Query', lapsByCity: Array<{ __typename?: 'Lap', id: string, name: string, duration?: string | null, geometry: string, createdAt: any, difficulty: { __typename?: 'Difficulty', level: string }, images?: Array<{ __typename?: 'Image', imgUrl?: string | null }> | null }> };

export type LapByIdQueryVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type LapByIdQuery = { __typename?: 'Query', lapById: { __typename?: 'Lap', id: string, geometry: string, name: string, createdAt: any, difficulty: { __typename?: 'Difficulty', level: string }, images?: Array<{ __typename?: 'Image', imgUrl?: string | null, createdAt: any }> | null, user: { __typename?: 'User', email: string } } };


export const SignupDocument = gql`
    mutation Signup($userData: UserSignup!) {
  signup(userData: $userData)
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      userData: // value for 'userData'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const LoginDocument = gql`
    mutation Login($userData: UserLogin!) {
  login(userData: $userData)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      userData: // value for 'userData'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const GetLapsCanvasDocument = gql`
    query GetLapsCanvas($canvas: CanvasInput!) {
  lapsByCanvas(canvas: $canvas) {
    id
    name
    duration
    geometry
    difficulty {
      level
    }
    images {
      imgUrl
    }
    createdAt
  }
}
    `;

/**
 * __useGetLapsCanvasQuery__
 *
 * To run a query within a React component, call `useGetLapsCanvasQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLapsCanvasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLapsCanvasQuery({
 *   variables: {
 *      canvas: // value for 'canvas'
 *   },
 * });
 */
export function useGetLapsCanvasQuery(baseOptions: Apollo.QueryHookOptions<GetLapsCanvasQuery, GetLapsCanvasQueryVariables> & ({ variables: GetLapsCanvasQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLapsCanvasQuery, GetLapsCanvasQueryVariables>(GetLapsCanvasDocument, options);
      }
export function useGetLapsCanvasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLapsCanvasQuery, GetLapsCanvasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLapsCanvasQuery, GetLapsCanvasQueryVariables>(GetLapsCanvasDocument, options);
        }
export function useGetLapsCanvasSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetLapsCanvasQuery, GetLapsCanvasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetLapsCanvasQuery, GetLapsCanvasQueryVariables>(GetLapsCanvasDocument, options);
        }
export type GetLapsCanvasQueryHookResult = ReturnType<typeof useGetLapsCanvasQuery>;
export type GetLapsCanvasLazyQueryHookResult = ReturnType<typeof useGetLapsCanvasLazyQuery>;
export type GetLapsCanvasSuspenseQueryHookResult = ReturnType<typeof useGetLapsCanvasSuspenseQuery>;
export type GetLapsCanvasQueryResult = Apollo.QueryResult<GetLapsCanvasQuery, GetLapsCanvasQueryVariables>;
export const GetLapsCityDocument = gql`
    query GetLapsCity($city: String!) {
  lapsByCity(city: $city) {
    id
    name
    duration
    geometry
    difficulty {
      level
    }
    images {
      imgUrl
    }
    createdAt
  }
}
    `;

/**
 * __useGetLapsCityQuery__
 *
 * To run a query within a React component, call `useGetLapsCityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLapsCityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLapsCityQuery({
 *   variables: {
 *      city: // value for 'city'
 *   },
 * });
 */
export function useGetLapsCityQuery(baseOptions: Apollo.QueryHookOptions<GetLapsCityQuery, GetLapsCityQueryVariables> & ({ variables: GetLapsCityQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLapsCityQuery, GetLapsCityQueryVariables>(GetLapsCityDocument, options);
      }
export function useGetLapsCityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLapsCityQuery, GetLapsCityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLapsCityQuery, GetLapsCityQueryVariables>(GetLapsCityDocument, options);
        }
export function useGetLapsCitySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetLapsCityQuery, GetLapsCityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetLapsCityQuery, GetLapsCityQueryVariables>(GetLapsCityDocument, options);
        }
export type GetLapsCityQueryHookResult = ReturnType<typeof useGetLapsCityQuery>;
export type GetLapsCityLazyQueryHookResult = ReturnType<typeof useGetLapsCityLazyQuery>;
export type GetLapsCitySuspenseQueryHookResult = ReturnType<typeof useGetLapsCitySuspenseQuery>;
export type GetLapsCityQueryResult = Apollo.QueryResult<GetLapsCityQuery, GetLapsCityQueryVariables>;
export const LapByIdDocument = gql`
    query LapById($id: Float!) {
  lapById(id: $id) {
    id
    geometry
    difficulty {
      level
    }
    images {
      imgUrl
      createdAt
    }
    name
    user {
      email
    }
    createdAt
  }
}
    `;

/**
 * __useLapByIdQuery__
 *
 * To run a query within a React component, call `useLapByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useLapByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLapByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLapByIdQuery(baseOptions: Apollo.QueryHookOptions<LapByIdQuery, LapByIdQueryVariables> & ({ variables: LapByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LapByIdQuery, LapByIdQueryVariables>(LapByIdDocument, options);
      }
export function useLapByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LapByIdQuery, LapByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LapByIdQuery, LapByIdQueryVariables>(LapByIdDocument, options);
        }
export function useLapByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LapByIdQuery, LapByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LapByIdQuery, LapByIdQueryVariables>(LapByIdDocument, options);
        }
export type LapByIdQueryHookResult = ReturnType<typeof useLapByIdQuery>;
export type LapByIdLazyQueryHookResult = ReturnType<typeof useLapByIdLazyQuery>;
export type LapByIdSuspenseQueryHookResult = ReturnType<typeof useLapByIdSuspenseQuery>;
export type LapByIdQueryResult = Apollo.QueryResult<LapByIdQuery, LapByIdQueryVariables>;