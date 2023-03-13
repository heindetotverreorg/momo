import contentJson from "~~/content/forms.json"
import { findNestedKeyInObject } from "~~/utils/findNestedKeyInObject"

export const useContent = () => {
  const content = contentJson.momo.en

  const getContent = (contentPath : string) => {
    const splitPath = contentPath.split('.')
    return findNestedKeyInObject(splitPath, content)
  }

  const getScopedContent = (scope : string, contentKey : string) => {
    if (scope === 'validators') {
      console.log(scope, contentKey)
    }

    const fullContentPath = `${scope}.${contentKey}`
    const splitPath = fullContentPath.split('.')
    return findNestedKeyInObject(splitPath, content)
  }

  return {
    getContent,
    getScopedContent
  }
}