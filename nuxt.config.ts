console.log(process.env.GQL_SERVER)

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
        httpEndpoint: process.env.GQL_SERVER as string,
        tokenName: 'momo:token',
        tokenStorage: 'cookie'
      }
    },
  },
})