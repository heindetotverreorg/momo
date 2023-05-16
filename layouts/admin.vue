<template>
  <div class="admin">
    <div class="admin__bar">
      <NuxtLink to="/admin/dashboard">Dashboard</NuxtLink>
    </div>
    <Messages />
    <slot />
  </div>
</template>
<script setup lang="ts">

</script>
<style lang="scss">
</style>