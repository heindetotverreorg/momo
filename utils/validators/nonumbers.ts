export const nonumber = (input: string) => {
  if (input === '') return true
  return !!/[^0-9]/g.test(input)
}