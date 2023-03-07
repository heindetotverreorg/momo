import { Forms } from "~~/types/forms"

const FORM_NAMES = { 
  LOGIN: 'login' as keyof Forms,
  REGISTER: 'register' as keyof Forms,
  CREATE_PAGE: 'create-page' as keyof Forms
}

Object.freeze(FORM_NAMES)

export {
  FORM_NAMES
}