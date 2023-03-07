<template>
  <div>
    <p
      v-for="page of pages"
      :key="page.id"
    >
      {{ page }}
      <button @click="deletePage(page.id)">
        Click me to to delete a page
      </button>
      <button @click="goToCreatePage(page.id)">
        Click me to to edit a page
      </button>
    </p>
    <button @click="goToCreatePage()">
      Click me to to create a page
    </button>
  </div>
</template>
<script setup lang="ts">
import { usePages } from '~~/composables/usePages'

  const { deletePage, pages } = usePages()

  const id = ref('')

  const goToCreatePage = (id : string | void) => {
    const { push } = useRouter()
    const query = id ? { id: id } : undefined
    push({
      path: '/admin/page/create',
      query: query
    })
  }
</script>