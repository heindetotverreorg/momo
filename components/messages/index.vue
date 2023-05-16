<template>
  <div
    v-if="showMessage"
    class="spread message__bg"
  >
    <div
      class="center message__window"
    >
    {{ currentMessage }}
    </div>
  </div>
</template>
<script lang=ts setup>
import { useMessages } from '~~/composables/useMessages'

  const { currentMessage, showMessage } = useMessages()
</script>

<style lang=scss scoped>
.message {
  &__bg {
    background-color: transparent;
  }

  &__window {
    background-color: $orange-light;
    border-radius: $border-radius-m;
    bottom: 0;
    padding: $margin;
    position: absolute;
    z-index: 1;
  }
}
</style> 