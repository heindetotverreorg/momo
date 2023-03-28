import { resolve } from 'path'

const getFolderPath = (folder : string) => {
  const rootDir = resolve('');
  return `${rootDir}${folder}`
}

export default getFolderPath