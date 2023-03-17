<template>
  <h2>User</h2>
  <div>
    {{ user }}
  </div>
</template>
<script setup lang="ts">
import { useUsers } from '~~/composables/useUsers'

  const { user } = useUsers()
</script>
