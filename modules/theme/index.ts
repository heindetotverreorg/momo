import { PATHS } from '../../constants/paths'
import getFolderPath from '../../server/utils/getFolderPath'
import { getFilesFromFolder } from '../../server/utils/getFilesFromFolder'
import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'theme',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  async setup(_, nuxt) {
    const componentPath = getFolderPath(PATHS.THEME_COMPONENT_FOLDER_PATH)
    const { filesFromFolder } = getFilesFromFolder(componentPath, { onlyFileNames: false })
    nuxt.options.runtimeConfig.public.availablePageComponents = filesFromFolder
  }
})