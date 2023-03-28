<template>
  <div>
    ThemeComponentSelect
    <div
      v-for="themeComponent of componentArray"
      :key="themeComponent.id"
    >
      <component :is="themeComponent.name"/>
      <button @click="deleteComponent(themeComponent.id)">delete Component</button>
    </div>
  </div>
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
import { useTheme } from '~~/composables/useTheme'
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

  const { themeComponents } = useTheme()

  const currentValue = ref<string>('')
  const componentArray = ref<{ name : string, id : string, meta : any }[]>([])

  watch(currentValue, () => {
    if (currentValue.value) {
      const selectedComponent = themeComponents.find(component => component.name === currentValue.value)
      if (selectedComponent) {
        const newId = `${selectedComponent.name}_${createSafeId()}`
        componentArray.value.push({...selectedComponent, id: newId})
      }
    }
    currentValue.value = ''
  })

  const deleteComponent = (componentId : string) => {
    componentArray.value = componentArray.value?.filter(c => c.id !== componentId)
    emit('update:modelValue', componentArray)
  }
</script>