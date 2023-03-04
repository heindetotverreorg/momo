export default defineNuxtConfig({
  modules: [
    '@nuxtjs/apollo',
    './modules/mesh-ui-components'
  ],
  apollo: {
    clients: {
      default: {
        authType: 'Bearer',
        authHeader: 'Authorization',
        httpEndpoint: process.env.GQL_SERVER as string,
        tokenName: 'momo:token',
        tokenStorage: 'cookie'
      }
    },
  },
})