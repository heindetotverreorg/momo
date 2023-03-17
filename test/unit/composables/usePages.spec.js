import { describe, it, expect } from "vitest"
import { usePages } from '~~/composables/usePages'
import { usePagesStore } from '~~/store/pages'
import { home, firstPage, secondPage, thirdPage } from '~~/test/unit/mocks/pages/pages.json'

describe('createPageParentMeta: test/unit/composables/usePages.spec.js', () => {
  it('should return empty pathArray and single level path if no parent is passed to createPageParentMeta', () => {
    const { createPageParentMeta } = usePages()
    const parent = ''
    const slug = 'first'
    expect(createPageParentMeta(parent, slug)).toStrictEqual({
      pathArray: [],
      path: '/first'
    })
  })

  it('should return appropiately populated pathArray and two level path if a single parent is passed to createPageParentMeta', () => {
    const { createPageParentMeta, pages } = usePages()
    const { replacePages } = usePagesStore()
    const parent = 'first'
    const slug = 'second'
    replacePages([firstPage])
    expect(pages.value.length).toBe(1)
    expect(createPageParentMeta(parent, slug)).toStrictEqual({
      pathArray: ['first'],
      path: '/first/second'
    })
  })

  it('should return appropiately populated pathArray and three level path if a parent that has a parent is passed to createPageParentMeta', () => {
    const { createPageParentMeta, pages } = usePages()
    const { replacePages } = usePagesStore()
    const parent = 'second'
    const slug = 'third'
    replacePages([firstPage, secondPage])
    expect(pages.value.length).toBe(2)
    expect(createPageParentMeta(parent, slug)).toStrictEqual({
      pathArray: ['first', 'second'],
      path: '/first/second/third'
    })
  })

  it('should not be able to save page if slug already exists under parent', () => {
    const { isUniqueSlug, pages } = usePages()
    const { replacePages } = usePagesStore()
    const parent = 'second'
    const slug = 'third'
    replacePages([firstPage, secondPage, thirdPage])
    expect(pages.value.length).toBe(3)
    expect(isUniqueSlug(slug, parent)).toBe(false)
  })

  it('should not be able to save page as home page if home page already exists', () => {
    const { onlyOneHomePage, pages } = usePages()
    const { replacePages } = usePagesStore()
    const slug = 'home'
    replacePages([home])
    expect(pages.value.length).toBe(1)
    expect(onlyOneHomePage(slug)).toBe(false)
  })
})