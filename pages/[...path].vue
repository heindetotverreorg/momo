<template>
  <FactoriesPage
    :page="page"
  />
  <NuxtLink to="/admin/dashboard">go to dashboard via nuxtlink</NuxtLink>
  <a href="/admin/dashboard">go to dashboard via href</a>
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
    pathArr, 
    fullPath
  )
</script>