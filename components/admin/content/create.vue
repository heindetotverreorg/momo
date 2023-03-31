<template>
  <div>
    AdminContentCreate
    <div
      v-for="pageComponent of pageComponents"
      :key="pageComponent.id"
    >
      <component :is="pageComponent.name" :content="content" :creation-mode="true" />
      <!-- <button @click="deleteComponent(themeComponent.id)">delete Component</button> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { usePageComponents } from '~~/composables/usePageComponents'

  const { content, pageComponents } = usePageComponents()
</script>