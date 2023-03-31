<template>
  Header HEADER ETC
  <header>
    <h1>{{ content.title }}</h1>
    <p>{{ content.text }}</p>
    <!-- <ul>
      <li
        v-for="item of content.list"
        :key="item"
      >
        {{ item }}
      </li>
    </ul>
    <a :href="content.link.link">{{ content.link.label }}</a> -->
  </header>
</template>
<script lang="ts" setup>
import { usePageComponents } from '~~/composables/usePageComponents';

  const props = defineProps({
    content: {
      type: Object,
      default: () => {}
    },
    creationMode: {
      type: Boolean,
      default: false
    }
  })

  const { createPageComponentContent } = usePageComponents()

  const fieldModel = {
    title: {
      type: 'text',
      default: 'this is a title'
    },
    text: {
      type: 'text',
      default: 'this is a text'
    },
    list: {
      type: 'list',
      default: []
    },
    link: {
      type: 'link',
      default: {
        label: 'this is a link label',
        link: '#'
      }
    },
    image: {
      type: 'image',
      default: 'image-src'
    }
  }

  if (props.creationMode) {
    createPageComponentContent(fieldModel)
  }
</script>