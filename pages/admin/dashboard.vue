<template>
  <AdminSectionsPage />
  <AdminSectionsUser />
  <AdminSectionsContent />
  <AdminSectionsTheme />
  <NuxtLink :to="`${back || '/'}`">go to page via nuxtlink</NuxtLink>
  <a :href="`${back || '/'}`">go to page via href</a>
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
  const router = useRouter()

  const back = router.options.history.state.back

  await Promise.all([fetchSingleUser(), fetchPages()])
</script>