<template>
  <AdminSectionsPages />
  <AdminSectionsUser />
  <AdminSectionsContent />
  <AdminSectionsTheme />
  <NuxtLink to="/">go to page via nuxtlink</NuxtLink>
  <a href="/">go to page via href</a>
</template>
<script setup lang="ts">
import { usePages } from '~~/composables/usePages'
import { useUsers } from '~~/composables/useUsers'

  definePageMeta({
    layout: 'admin',
    middleware: ['auth-check']
  });

  const { fetchPages } = usePages()
  const { fetchSingleUser } = useUsers()

  await Promise.all([fetchSingleUser(), fetchPages()])
</script>