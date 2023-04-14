<template>
  pageComponentSelect
  <MeshSelect
    :autocomplete="autocomplete"
    :disabled="disabled"
    :element-name="elementName"
    :force-validation="forceValidation"
    :id="id"
    :label="label"
    :name="name"
    :options="options"
    :required="required"
    :type="type"
    :validators="validators"
    v-model="currentValue"
    @deleteComponent="emit('deleteComponent')"
    @editContent="emit('editContent')"
  />
  <ul v-if="pageComponents.length">
    <li
      v-for="component of pageComponents"
    >
      <div>
        <p>{{ component.id }}</p>
        <button @click.prevent="setEditContentId(component.id)">edit content</button>
        <button @click.prevent="deleteComponentFromPage(component.id)">delete component</button>
      </div>
      <div v-if="editContentId === component.id">
        <MeshFormWrapper
          v-if="selectedForm"
          :content="formLabels"
          :form="selectedForm"
          :emit-input="true"
          :formValues="formValues"
          @input="onInput"
        />
      </div>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { usePageComponents } from '~~/composables/usePageComponents'
import { shareableProps } from 'mesh-ui-components'

  const props = defineProps({
    ...shareableProps,
    secondValidationValue: {
      type: String,
      default: ''
    }
  })

  const emit = defineEmits([
    'deleteComponent',
    'editContent',
    'validate',
    'update:modelValue'
  ])

  const {
    editContentId,
    fields,
    pageComponents,
    addComponentToPage,
    addContentToComponent,
    deleteComponentFromPage,
    setEditContentId,
  } = usePageComponents()

  const currentValue = ref<string>('')
  const formLabels = ref()
  const formValues = ref()
  const selectedForm = ref()

  watch(currentValue, () => {
    if (currentValue.value) {
      addComponentToPage(currentValue.value)
      emit('update:modelValue', pageComponents)
      currentValue.value = ''
    }
  })

  watch(editContentId, () => {
    formLabels.value = (scope : string, key : string) => {
      const contentKeys = fields.value[editContentId.value].reduce((acc, curr) => {
        if (scope === 'labels' && curr) {
          return { [curr.key]: `Enter your ${curr.key}`, ...acc }
        }
        return { ...acc }
      }, {}) as Record<string, any>
      return contentKeys[key]
    }
    selectedForm.value = {
      meta: { name: `form_${editContentId.value}` },
      fields: fields.value[editContentId.value]
    }
    const contentFromState = pageComponents.value.find(component => component.id === editContentId.value)?.meta?.content
    if (contentFromState) {
      formValues.value = contentFromState
    }
  })

  const onInput = (formValues : Record<string, any>) => {
    addContentToComponent(editContentId.value, formValues)
    emit('update:modelValue', pageComponents)
  }
</script>