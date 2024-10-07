<template>
  <div class="main-frame" :style="mainStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { useThemeStore } from '@/stores/theme'

const props = defineProps({
  headbar: {
    type: Boolean,
    default: false
  },
  navbar: {
    type: Boolean,
    default: false
  },
  padded: {
    type: Boolean,
    default: false
  },
  bgGray: {
    type: Boolean,
    default: false
  }
})

const themeStore = useThemeStore()
themeStore.setThemeColor(`${props.bgGray ? '#F6F7F6' : '#FDFDFD'}`)

const mainStyle = computed(() => {
  let height = '100%'
  let margin = '0px'
  if (props.headbar && props.navbar) {
    height = 'calc(100% - 76px - 52px)'
    margin = '52px'
  } else if (!props.headbar && props.navbar) {
    height = 'calc(100% - 76px)'
  } else if (props.headbar && !props.navbar) {
    height = 'calc(100% - 52px)';
    margin = '52px'
  }

  return {
    marginTop: margin,
    backgroundColor: props.bgGray ? '#F6F7F6' : '#FDFDFD',
    padding: props.padded ? '0 5.13%' : '0',
    height: height
  }
})
</script>

<style scoped>
.main-frame {
  background-color: var(--background);
  position: absolute;
  width: 100%;
  height: calc(100% - 76px - 52px);
  margin-top: 52px;
  overflow-x: hidden;
  overflow-y: scroll;
}

.padded {
  padding: 0px 5.13%;
}
</style>
