interface Forms {
  login: Form,
  register: Form
}

interface Form {
  meta: {
    name: keyof Forms,
    multipart: boolean,
    parts?: string[]
  },
  fields: FormField[]
}

interface FormField {
  autocomplete?: string,
  component: string,
  disabled?: boolean,
  domclass?: string,
  id: string,
  key: string,
  label: string,
  options?: string[],
  type: string,
  required?: boolean,
  validation: Validator,
  visible?: boolean
}

interface Validator {
  (input: string): boolean
}

export {
  Forms,
  Form
}