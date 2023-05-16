<template>
  <div>
    Page Preview
    <div
      v-for="pageComponent of pageComponents"
      :key="pageComponent.id"
    >
      <component :is="pageComponent.componentKey" :content="content(pageComponent.id)" :creation-mode="true" :id="pageComponent.id" />
      <button @click="deleteComponentFromPage(pageComponent.id)">delete component</button>
      <button @click="setEditContentId(pageComponent.id)">edit content</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { usePageComponents } from '~~/composables/usePageComponents'

  const { content, pageComponents, deleteComponentFromPage, setEditContentId } = usePageComponents()
</script>