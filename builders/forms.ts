import { Form } from "mesh-ui-components"
import { FORM_NAMES } from "~~/constants/forms"
import { createSafeId } from "~~/utils/createSafeId"
import {
  nonumber,
  email,
  notempty,
  specialchar,
  minlength,
  issamevalue
} from '~~/utils/validators'

const elements = {
  text: {
    component: 'MeshInput',
    type: 'text',
    id: createSafeId(),
    validators: [() => true],
    highlightValidation: true
  },
  button: {
    component: 'MeshButton',
    type: 'button',
    id: createSafeId(),
    validators: [() => true],
    variant: 'primary'
  }
}

const formData = {
  [FORM_NAMES.LOGIN]: {
    meta: {
      name: FORM_NAMES.LOGIN,
      multipart: false
    },
    fields: [
      {
        ...elements.text,
        key: 'email',
        type: 'email',
        validators: [email],
        highlightValidation: false
      },
      {
        ...elements.text,
        key: 'password',
        type: 'password',
        validators: [notempty],
        highlightValidation: false
      },
      {
        ...elements.button,
        key: 'loginButton'
      }
    ]
  } as Form,
  [FORM_NAMES.REGISTER]: {
    meta: {
      name: FORM_NAMES.REGISTER,
      multipart: false
    },
    fields: [
      {
        ...elements.text,
        key: 'firstName',
        validators: [notempty, nonumber]
      },
      {
        ...elements.text,
        key: 'lastName',
        validators: [notempty, nonumber]
      },
      {
        ...elements.text,
        key: 'email',
        type: 'email',
        validators: [notempty, email]
      },
      {
        ...elements.text,
        key: 'password',
        type: 'password',
        validators: [notempty, specialchar, minlength]
      },
      {
        ...elements.text,
        key: 'passwordCheck',
        secondValidationValue: 'password',
        type: 'password',
        validators: [issamevalue]
      },
      {
        ...elements.button,
        key: 'registerButton'
      }
    ]
  } as Form
}

export {
  formData
}