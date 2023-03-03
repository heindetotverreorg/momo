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
        httpLinkOptions: {
          credentials: 'same-origin'
        },
        authType: 'Bearer',
        authHeader: 'Authorization',
        httpEndpoint: "http://localhost:3000/gql",
        tokenName: 'momo:token',
        tokenStorage: "cookie"
      }
    },
  },
})