<template>
  <h2>
    {{ error.statusCode }}
  </h2>
  <p>{{ error.message }}</p>
</template>
<script lang="ts" setup>

  const props = defineProps({
    error: {
      type: Object,
      required: true
    }
  })
</script>