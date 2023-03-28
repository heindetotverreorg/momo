import path from 'path'
import { defineNuxtModule, addPlugin } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'mesh-ui-components',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  async setup(_, nuxt) {
    nuxt.options.css.push('mesh-ui-components/dist/main.css')
    addPlugin(path.resolve(__dirname, './registerMeshComponents.ts'))
  }
})