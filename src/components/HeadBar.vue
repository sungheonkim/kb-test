<template>
  <div class="headbar-frame" :style="headStyle">
    <div class="headbar-inner" @click="routeBack()">
      <i v-if="backButton" class="fa-solid fa-chevron-left"></i>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router'

const props = defineProps({
  backButton: {
    type: Boolean,
    default: false
  },
  moveTo: {
    type: String,
    default: '-1'
  },
  bgGray: {
    type: Boolean,
    default: false
  }
})

const router = useRouter();

const routeBack = () => {
  if (props.moveTo === '-1') {
    router.back();
  } else {
    router.push(props.moveTo);
  }
}

const headStyle = computed(() => ({
  backgroundColor: props.bgGray ? '#F6F7F6' : '#FDFDFD',
}));
</script>

<style scoped>
.headbar-frame {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--background);
  height: 52px;
  z-index: 3;
  display: flex;
  align-items: end;
  padding: 0 0 8px 24px;
}

.headbar-inner {
  font-size: 22px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
}

.fa-chevron-left {
  font-size: 18px;
}
</style>