<template>
  <div class="shadow-box transition-transform duration-200" :style="boxStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  height: {
    type: Number,
    required: false
  },
  paddingX: {
    type: Number,
    default: 0
  },
  paddingY: {
    type: Number,
    default: 0
  },
  marginBottom: {
    type: Number,
    default: 16
  },
  radius: {
    type: Boolean,
    default: true
  }
});

const boxStyle = computed(() => ({
  height: props.height ? `${props.height}px` : 'auto',
  padding: `${props.paddingY}px ${props.paddingX}px`,
  marginBottom: `${props.marginBottom}px`,
  borderRadius: props.radius ? '10px' : '0px'
}));
</script>

<style scoped>
.shadow-box {
  position: relative;
  background-color: var(--white);
  width: 100%;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.04);
  border-radius: 10px;
  padding: 0;
}
</style>
