export const slug = (input: string) => {
  if (input) {
    return !!(input.charAt(0) === '/')
  } else {
    return false
  }
}