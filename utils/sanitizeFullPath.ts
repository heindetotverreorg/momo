export const sanitizeFullPath = (fullPath : string) => {
  if (fullPath === '/') {
    return fullPath
  }
  return fullPath.endsWith('/')
  ? fullPath.slice(0, -1)
  : fullPath
}

