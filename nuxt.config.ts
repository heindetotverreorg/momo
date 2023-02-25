export default defineNuxtConfig({
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