export const nonumber = (input: string) => {
  return !!/[^0-9]/g.test(input)
}