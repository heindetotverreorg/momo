import { Forms } from "~~/types/forms"

const FORM_NAMES = {
  LOGIN: 'login' as keyof Forms,
  REGISTER: 'register' as keyof Forms
}

Object.freeze(FORM_NAMES)

export {
  FORM_NAMES
}