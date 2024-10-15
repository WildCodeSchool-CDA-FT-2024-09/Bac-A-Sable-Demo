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
};

export type Lang = {
  __typename?: 'Lang';
  id: Scalars['Float']['output'];
  label: Scalars['String']['output'];
};

export type LightRepo = {
  __typename?: 'LightRepo';
  id: Scalars['ID']['output'];
  isFavorite: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createNewRepo: Repo;
};


export type MutationCreateNewRepoArgs = {
  toto: RepoInput;
};

export type Query = {
  __typename?: 'Query';
  fullrepos: Array<Repo>;
  lightrepos: Array<LightRepo>;
};

export type Repo = {
  __typename?: 'Repo';
  id: Scalars['ID']['output'];
  isFavorite: Scalars['Boolean']['output'];
  langs: Array<Lang>;
  name: Scalars['String']['output'];
  status: Status;
  url: Scalars['String']['output'];
};

export type RepoInput = {
  id: Scalars['String']['input'];
  isPrivate: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type Status = {
  __typename?: 'Status';
  id: Scalars['Float']['output'];
  label: Scalars['String']['output'];
};

export type FullreposQueryVariables = Exact<{ [key: string]: never; }>;


export type FullreposQuery = { __typename?: 'Query', fullrepos: Array<{ __typename?: 'Repo', id: string, name: string, url: string, isFavorite: boolean }> };


export const FullreposDocument = gql`
    query Fullrepos {
  fullrepos {
    id
    name
    url
    isFavorite
  }
}
    `;

/**
 * __useFullreposQuery__
 *
 * To run a query within a React component, call `useFullreposQuery` and pass it any options that fit your needs.
 * When your component renders, `useFullreposQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFullreposQuery({
 *   variables: {
 *   },
 * });
 */
export function useFullreposQuery(baseOptions?: Apollo.QueryHookOptions<FullreposQuery, FullreposQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FullreposQuery, FullreposQueryVariables>(FullreposDocument, options);
      }
export function useFullreposLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FullreposQuery, FullreposQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FullreposQuery, FullreposQueryVariables>(FullreposDocument, options);
        }
export function useFullreposSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FullreposQuery, FullreposQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FullreposQuery, FullreposQueryVariables>(FullreposDocument, options);
        }
export type FullreposQueryHookResult = ReturnType<typeof useFullreposQuery>;
export type FullreposLazyQueryHookResult = ReturnType<typeof useFullreposLazyQuery>;
export type FullreposSuspenseQueryHookResult = ReturnType<typeof useFullreposSuspenseQuery>;
export type FullreposQueryResult = Apollo.QueryResult<FullreposQuery, FullreposQueryVariables>;