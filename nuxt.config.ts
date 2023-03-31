export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      availablePageComponents: []
    }
  },
  components: {
    dirs: [
      "./components",
      {
        "path": "./theme/components",
        "global": true
      }
    ]
  },
  modules: [
    '@nuxtjs/apollo',
    '@pinia/nuxt',
    './modules/mesh-ui-components',
    './modules/theme'
  ],
  apollo: {
    clients: {
      default: {
        authType: 'Bearer',
        authHeader: 'Authorization',
        httpEndpoint: process.env.GQL_SERVER as string,
        tokenName: 'momo:token',
        tokenStorage: 'cookie',
        inMemoryCacheOptions: {
          addTypename: false
        }
      }
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/theme/assets/style/theme.scss";`
        }
      }
    }
  },
  css: [
    '@/assets/style/main.scss'
  ]
})