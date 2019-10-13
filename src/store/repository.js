import gql from 'graphql-tag'
import _ from 'lodash'

// ------------------------------
export const state = () => ({
  user: null,
  edges: null,
  pageInfo: null,
  repositoryCount: 0,
  query: 'react',
  limit: 10,
  loading: false,
})

// ------------------------------
export const getters = {
  resultTitle: state => {
    let unit = state.repositoryCount === 1 ? 'Repository' : 'Repositories'
    return `Github Repositories Search Results - ${state.repositoryCount} ${unit}`
  }
}

// ------------------------------
export const mutations = {
  setQuery(state, q) {
    state.query = q
  },

  setLoading(state, res) {
    state.loading = res
  },

  setRepositories(state, res) {
    state.edges = res.search.edges
    _.map(state.edges, i => {
      i.id = i.node.id
    })
    state.pageInfo = res.search.pageInfo
    state.repositoryCount = res.search.repositoryCount
  },

  addStar(state, res) {
    _.map(state.edges, i => {
      if ( i.id == res.addStar.starrable.id ) {
        i.node.viewerHasStarred = true
      }
    })
  },

  removeStar(state, res) {
    _.map(state.edges, i => {
      if ( i.id == res.removeStar.starrable.id ) {
        i.node.viewerHasStarred = false
      }
    })
  }
}

// ------------------------------
export const actions = {
  async getUser({commit}) {
    const {data} = await this.app.apolloProvider.defaultClient.query({
      query: gql`
        {
          user(login: "masato-ohira") {
            login,
            avatarUrl
          }
        }
      `,
    })
    commit('setUser', data.user)
  },

  async getRepositories({commit, state}, options) {
    commit('setLoading', true)
    let variables = {
      query: state.query,
      first: state.limit,
      last: null,
      after: null,
      before: null,
    }
    if ( options ) {
      variables = {
        ...variables,
        ...options,
      }
    }

    try {
      const {data} = await this.app.apolloProvider.defaultClient.query({
        variables,
        // graphQLのqueryを記載
        query: gql`
          query searchRepositories(
            $after: String $before: String $first: Int $last: Int $query: String!
          ) {
            search(
              after: $after before: $before first: $first last: $last query: $query type: REPOSITORY
            ) {
              pageInfo {
                startCursor
                endCursor
                hasNextPage
                hasPreviousPage
              }
              edges {
                cursor
                node {
                  ... on Repository {
                    id
                    name
                    owner { login }
                    url
                    description
                    stargazers { totalCount }
                    viewerHasStarred
                  }
                }
              }
              repositoryCount
            }
          }
        `,
      })
      commit('setLoading', false)
      commit('setRepositories', data)
    } catch (error) {
      return null
    }
  },

  async addStar({commit}, starrableId) {
    let variables = {
      starrableId
    }
    const { data } = await this.app.apolloProvider.defaultClient.mutate({
      variables,
      mutation: gql`
        mutation addStar($starrableId: ID!) {
          addStar(input: {
            starrableId: $starrableId
          }) {
            starrable {
              id
              viewerHasStarred
            }
          }
        }
      `,
    })
    commit('addStar', data)
  },

  async removeStar({commit}, starrableId) {
    let variables = {
      starrableId
    }
    const { data } = await this.app.apolloProvider.defaultClient.mutate({
      variables,
      mutation: gql`
        mutation removeStar($starrableId: ID!) {
          removeStar(input: {
            starrableId: $starrableId
          }) {
            starrable {
              id
              viewerHasStarred
            }
          }
        }
      `,
    })
    commit('removeStar', data)
  },
}
