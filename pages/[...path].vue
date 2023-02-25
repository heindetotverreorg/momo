<template>
  <FactoriesPage
    :page="page"
  />
</template>
<script setup lang="ts">
import { usePages } from '~~/composables/usePages'
import { usePath } from '~~/composables/usePath';

  const { fetchSinglePage } = usePages()
  const { 
    slug,
    pathArr,
    fullPath
  } = usePath()

  const page = ref()

  page.value = await fetchSinglePage(
    slug,
    pathArr as string[], 
    fullPath
  )
</script>