import contentJson from "~~/content/forms.json"
import { findNestedKeyInObject } from "~~/utils/findNestedKeyInObject"

export const useContent = (scopedPath : string = '', customContent : Record<string, any> | void) => {
  const content = customContent || contentJson.momo.en

  const getContent = (contentPath : string) => {
    const splitPath = contentPath.split('.')
    return findNestedKeyInObject(splitPath, content)
  }

  const getScopedContent = (scope : string, contentKey : string) => {
    const fullContentPath = scopedPath.concat(`.${scope}.${contentKey}`)
    const splitPath = fullContentPath.split('.')
    return findNestedKeyInObject(splitPath, content)
  }

  return {
    getContent,
    getScopedContent
  }
}