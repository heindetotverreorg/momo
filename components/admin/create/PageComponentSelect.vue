<template>
  pageComponentSelect
  <ul v-if="pageComponents.length">
    <li
      v-for="component of pageComponents"
    >
      {{ component.name }}
    </li>
  </ul>
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
    @update:modelValue="emit('update:modelValue', componentArray)"
  />
</template>
<script setup lang="ts">
import { usePageComponents } from '~~/composables/usePageComponents'
import { shareableProps } from 'mesh-ui-components'
import { createSafeId } from "~~/utils/createSafeId"

  const props = defineProps({
    ...shareableProps,
    secondValidationValue: {
      type: String,
      default: ''
    }
  })

  const emit = defineEmits([
    'validate',
    'update:modelValue'
  ])

  const { availablePageComponents, setPageComponents, pageComponents } = usePageComponents()

  const currentValue = ref<string>('')
  const componentArray = ref<{ name : string, id : string, meta : any }[]>([])

  watch(currentValue, () => {
    if (currentValue.value) {
      const selectedComponent = availablePageComponents.find(component => component.name === currentValue.value)
      if (selectedComponent) {
        const newId = `${selectedComponent.name}_${createSafeId()}`
        const componentArray = pageComponents
        componentArray.value.push({...selectedComponent, id: newId})
        setPageComponents(componentArray)
      }
    }
    currentValue.value = ''
  })

  const deleteComponent = (componentId : string) => {
    componentArray.value = componentArray.value?.filter(c => c.id !== componentId)
    emit('update:modelValue', componentArray)
  }
</script>