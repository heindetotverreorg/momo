<template>
  Header HEADER ETC
  <header>
    <!-- <h1>{{ content.title }}</h1>
    <p>{{ content.text }}</p>
    <p>{{ content.description }}</p>
    <ul>
      <li
        v-for="item of content.list"
        :key="item"
      >
        {{ item.text }}
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
    },
    id: {
      type: String,
      required: true
    }
  })

  const { createPageComponentFields } = usePageComponents()

  const fieldModel = {
    title: {
      type: 'text',
      default: 'this is a title'
    },
    text: {
      type: 'text',
      default: 'this is a text'
    },
    description: {
      type: 'text',
      default: 'this is a description'
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
    createPageComponentFields(fieldModel, props.id)
  }
</script>