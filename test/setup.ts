import { beforeAll, vi } from 'vitest'
import { ref } from 'vue'
import { setActivePinia, createPinia } from 'pinia'

beforeAll(() => {
  setActivePinia(createPinia())
  vi.stubGlobal('ref', ref)
})