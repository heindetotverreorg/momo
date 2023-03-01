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
        httpEndpoint: "http://localhost:3000/gql",
        tokenStorage: "localStorage"
      }
    },
  },
})