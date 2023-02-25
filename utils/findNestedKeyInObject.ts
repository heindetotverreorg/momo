export const findNestedKeyInObject = (keyArray : string[], searchObject : Record<string, unknown>) => {
  let foundKey : string = ''
  const searchPerKey = (keyArray : string[], searchObject : Record<string, any>) => {
    keyArray.forEach((key) => {
      if (searchObject[key]) {
        if (typeof searchObject[key] === 'string') {
          foundKey = searchObject[key]
        }
        searchPerKey(keyArray, searchObject[key])
      }
    })
  }
  searchPerKey(keyArray, searchObject)
  return foundKey
}