<template>
  {{ page }}
</template>
<script lang="ts" setup>
  import { Page } from '~~/types/pages'

  const props = defineProps({
    page: {
      type: Object  as PropType<Page>,
      default: () => {}
    }
  })
</script>