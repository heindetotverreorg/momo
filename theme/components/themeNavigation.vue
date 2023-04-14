<template>
  Some Component COMPONENT ETC
  <section>
    <!-- <p>{{ content.text }}</p>
    <p>{{ content.decription }}</p> -->
  </section>
</template>
<script lang="ts" setup>
import { usePageComponents } from '~~/composables/usePageComponents';

  const props = defineProps({
    content: {
      type: Object,
      default: () => {}
    },
    creationMode: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      required: true
    }
  })

  const { createPageComponentFields } = usePageComponents()

  const fieldModel = {
    description: {
      type: 'text',
      default: 'this is a description'
    },
    text: {
      type: 'text',
      default: 'this is a short text'
    }
  }

  if (props.creationMode) {
    createPageComponentFields(fieldModel, props.id)
  }
</script>