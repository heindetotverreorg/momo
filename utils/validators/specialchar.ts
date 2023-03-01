export const specialchar = (input: string) => {
  const regex = /[!@#$%^&*(),.?":{}|<>]/g;
  return regex.test(input);
}