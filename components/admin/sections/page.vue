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
      <button @click="goToCreatePage()">
        Click me to to create a new page
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { usePages } from '~~/composables/usePages'

  const { deletePage, pages } = usePages()

  const goToCreatePage = (id : string | void) => {
    const { push } = useRouter()
    push({
      path: '/admin/page/create',
      params: {
        id: id ? id : ''
      }
    })
  }

  const id = ref('')
</script>