import React from 'react'

import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import client from './apollo'
import Router from './Router'


export default () => (
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <Router />
    </ApolloHooksProvider>
  </ApolloProvider>
)
