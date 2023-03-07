<template>
  <div>
    <p>{{ pages }}</p>
    <div v-if="pages.length">
      <button @click="deletePage(id)">
        Click me to to delete a page
      </button>
      <button @click="goToCreatePage(id)">
        Click me to to edit a page
      </button>
      <input type="text" placeholder="type id to interact with" v-model="id" />
    </div>
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