import { Form, FormField, validators } from "mesh-ui-components"

export const useForms = () => {
  const formAsObject = (form : Form) => {
    const newFields = form.fields.reduce((acc, curr) => {
      return { ...acc, [curr.key]: { ...curr } }
    }, {}) as Record<string, FormField>
    
    return {
      form: {
        meta: form.meta,
        fields: newFields
      }
    }
  }

  const multiPartForm = (form : Form) => {
    const multiForm = form.meta.sections.reduce((acc, curr) => {
      const fieldsBySection = form.fields.filter(field => field.section === curr)
      return { ...acc, [curr]: fieldsBySection }
    }, {}) as Record<string, FormField[]>

    return {
      form: {
        meta: form.meta,
        sections: multiForm,
        buttons: form.fields.filter(field => field.component === 'MeshButton')
      }
    }
  }

  return {
    formAsObject,
    multiPartForm
  }
}