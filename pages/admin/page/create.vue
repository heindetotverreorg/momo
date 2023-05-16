<template>
  <div class="box--horizontal">
    <AdminCreatePage />
    <AdminContentPreview />
  </div>
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