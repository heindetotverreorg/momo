export const notempty = (input: string) => {
  if (Array.isArray(input)) {
    return !!input.length
  }
  return !!input
}