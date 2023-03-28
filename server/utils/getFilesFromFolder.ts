import * as fs from 'fs'

export const getFilesFromFolder = (
  path : string, { onlyFileNames } : 
  { onlyFileNames : boolean } =
  { onlyFileNames: true }
  ) => {

  const filesFromFolder = fs.readdirSync(path, { withFileTypes: true })
  filesFromFolder.filter(item => !item.isDirectory()).map(item => onlyFileNames ? item.name : item)

  return {
    filesFromFolder
  }
}