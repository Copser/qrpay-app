import ApolloClient from 'apollo-client'
import { Updates } from 'expo'

import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { RetryLink } from 'apollo-link-retry'

import Store from './modules/store'

const httpLink = new HttpLink({
  uri: 'https://qrpay.herokuapp.com/api',
})

const authLink = setContext((_, { headers }) => {
	const token = Store.get('token')

	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		}
	}
})

const errorLink = onError(({ networkError }) => {
	if (!networkError) return

	if (networkError.response && networkError.response.status === 403) {
		Store.set('token', null)
		setTimeout(() => Updates.reloadFromCache(), 500)
	}
})

const retryLink = new RetryLink({
	attempts: {
		max: 5,
		retryIf: (error) => (error.statusCode !== 500 && error.statusCode !== 404),
	},
})

const defaultOptions = {
	watchQuery: {
		fetchPolicy: 'cache-and-network',
		errorPolicy: 'ignore',
	},
	query: {
		fetchPolicy: 'cache-and-network',
		errorPolicy: 'all',
	}
}

export default new ApolloClient({
	link: authLink.concat(errorLink).concat(retryLink).concat(httpLink),
	cache: new InMemoryCache(),
	defaultOptions,
})
