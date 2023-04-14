<template>
  <div class="box--horizontal">
    <AdminCreatePage />
    <AdminContentPreview />
  </div>
</template>
<script setup lang="ts">

  definePageMeta({
    layout: 'admin',
    middleware: ['auth-check']
  });

</script>