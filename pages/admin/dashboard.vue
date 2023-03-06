<template>
  <AdminSectionsPage />
  <AdminSectionsUser />
  <NuxtLink to="/1stlevel">go to page via nuxtlink</NuxtLink>
  <a href="/1stlevel">go to page via href</a>
</template>
<script setup lang="ts">
import { usePages } from '~~/composables/usePages'
import { useUsers } from '~~/composables/useUsers'

  definePageMeta({
    layout: 'admin',
    middleware: ['auth']
  });

  const { fetchPages } = usePages()
  const { fetchSingleUser } = useUsers()

  await Promise.all([fetchSingleUser(), fetchPages()])
</script>