<template>
  <FactoriesPage
    :page="page"
  />
  <NuxtLink to="/admin/dashboard">go to dashboard via nuxtlink</NuxtLink>
  <a href="/admin/dashboard">go to dashboard via href</a>
  <NuxtLink to="/auth">go to auth via nuxtlink</NuxtLink>
  <a href="/auth">Go to auth via href</a>
  <Header />
</template>
<script setup lang="ts">
import { usePages } from '~~/composables/usePages'
import { usePath } from '~~/composables/usePath';

  const { fetchSinglePage } = usePages()
  const { fullPath } = usePath()

  const page = ref()

  page.value = await fetchSinglePage(fullPath)
</script>