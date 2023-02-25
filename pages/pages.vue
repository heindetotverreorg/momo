<template>
  <div>
    <button @click="createPageTesting('1')">Click me to create a first level page</button>
    <button @click="createPageTesting('2')">Click me to create a second level page</button>
    <button @click="createPageTesting('3')">Click me to create a third level page</button>
    <div v-if="pages.length">
      <button @click="deletePage(id)">
        Click me to to delete a page
    </button>
    <input type="text" placeholder="type id to delete" v-model="id" />
    </div>
    <p>{{ pages }}</p>
  </div>
</template>
<script lang="ts" setup>
  import { usePages } from '~~/composables/usePages'

  const normalPage = {
    name: 'name',
    slug: '1stlevel',
    isInMenu: false,
    parent: [],
    menuOrder: 0,
    title: 'title',
    description: 'description',
    keywords: 'keywords',
    contentComponents: [],
    id: 'id1',
    author: 'author'
  }

  const pageOneLevenDeep = {
    name: 'name',
    slug: '2ndlevel',
    isInMenu: false,
    parent: ['1stlevel'],
    menuOrder: 0,
    title: 'title',
    description: 'description',
    keywords: 'keywords',
    contentComponents: [],
    id: 'id2',
    author: 'author'
  }

  const pageTwoLevenDeep = {
    name: 'name',
    slug: '3rdlevel',
    isInMenu: false,
    parent: ['1stlevel', '2ndlevel'],
    menuOrder: 0,
    title: 'title',
    description: 'description',
    keywords: 'keywords',
    contentComponents: [],
    id: 'id2',
    author: 'author'
  }

  const { createPage, deletePage, fetchPages, pages } = usePages()
  await fetchPages()

  const id = ref('')

  const createPageTesting = (level : String) => {
    if (level === '1') {
      createPage(normalPage)
    }

    if (level === '2') {
      createPage(pageOneLevenDeep)
    }

    if (level === '3') {
      createPage(pageTwoLevenDeep)
    }
  }
</script>
