<template>
  ThemeComponentSelect
  <component :is="currentValue"/>
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
    :second-validation-value="secondValidationValue"
    :type="type"
    :validators="validators"
    v-model="currentValue"
    @input="onInput"
  />
</template>
<script setup lang="ts">
import { MeshSelect, shareableProps } from 'mesh-ui-components'

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

  const currentValue = ref()

  const onInput = () => {
    emit('update:modelValue', currentValue)
  }
</script>