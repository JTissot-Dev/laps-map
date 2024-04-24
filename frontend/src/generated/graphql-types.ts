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

export type Lap = {
  __typename?: 'Lap';
  createdAt: Scalars['DateTimeISO']['output'];
  difficulty?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['String']['output']>;
  geometry: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type Query = {
  __typename?: 'Query';
  laps: Array<Lap>;
};


export type QueryLapsArgs = {
  canvas: CanvasInput;
};

export type GetLapsQueryVariables = Exact<{
  canvas: CanvasInput;
}>;


export type GetLapsQuery = { __typename?: 'Query', laps: Array<{ __typename?: 'Lap', id: string, duration?: string | null, geometry: string, difficulty?: string | null, createdAt: any }> };


export const GetLapsDocument = gql`
    query GetLaps($canvas: CanvasInput!) {
  laps(canvas: $canvas) {
    id
    duration
    geometry
    difficulty
    createdAt
  }
}
    `;

/**
 * __useGetLapsQuery__
 *
 * To run a query within a React component, call `useGetLapsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLapsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLapsQuery({
 *   variables: {
 *      canvas: // value for 'canvas'
 *   },
 * });
 */
export function useGetLapsQuery(baseOptions: Apollo.QueryHookOptions<GetLapsQuery, GetLapsQueryVariables> & ({ variables: GetLapsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLapsQuery, GetLapsQueryVariables>(GetLapsDocument, options);
      }
export function useGetLapsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLapsQuery, GetLapsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLapsQuery, GetLapsQueryVariables>(GetLapsDocument, options);
        }
export function useGetLapsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetLapsQuery, GetLapsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetLapsQuery, GetLapsQueryVariables>(GetLapsDocument, options);
        }
export type GetLapsQueryHookResult = ReturnType<typeof useGetLapsQuery>;
export type GetLapsLazyQueryHookResult = ReturnType<typeof useGetLapsLazyQuery>;
export type GetLapsSuspenseQueryHookResult = ReturnType<typeof useGetLapsSuspenseQuery>;
export type GetLapsQueryResult = Apollo.QueryResult<GetLapsQuery, GetLapsQueryVariables>;