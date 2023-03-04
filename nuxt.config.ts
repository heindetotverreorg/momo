export default defineNuxtConfig({
  runtimeConfig: {
    secret: process.env.TOKEN_SECRET,
    public: {
      secret: process.env.TOKEN_SECRET
    }
  },
  modules: [
    '@nuxtjs/apollo',
    './modules/mesh-ui-components'
  ],
  apollo: {
    clients: {
      default: {
        authType: 'Bearer',
        authHeader: 'Authorization',
        httpEndpoint: process.env.GQL_SERVER || 'http://localhost:3000/gql',
        tokenName: 'momo:token',
        tokenStorage: 'cookie'
      }
    },
  },
})