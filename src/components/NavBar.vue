<template>
  <div class="navbar-frame">
    <div class="tab-frame" v-for="(tab, index) in navTabs" :key="index">
      <router-link :to="tab.path">
        <div :class="isActiveTab(tab.path) ? 'tab tab-active' : 'tab'">
          <i :class="tab.icon"></i>
          <span>{{ tab.name }}</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'

interface NavTab {
  path: string
  name: string
  icon: string
}

const route = useRoute()

const navTabs: Ref<NavTab[]> = ref([
  {
    path: '/',
    name: '홈',
    icon: 'fa-solid fa-house'
  },
  {
    path: '/medicine',
    name: '복용약',
    icon: 'fa-solid fa-capsules'
  },
  {
    path: '/prescription',
    name: '처방전',
    icon: 'fa-solid fa-file-lines'
  },
  {
    path: '/mypage',
    name: '계정',
    icon: 'fa-solid fa-user'
  }
])

const isActiveTab = (tabPath: string) => {
  if (tabPath === '/') {
    return route.path === '/'
  } else {
    return route.path.startsWith(tabPath) && 
          (route.path.length === tabPath.length || route.path[tabPath.length] === '/')
  }
}
</script>

<style scoped>
.navbar-frame {
  position: fixed;
  padding: 0 4%;
  bottom: 0;
  width: 100%;
  max-width: 600px;
  height: 76px;
  display: flex;
  border-top: 1px solid var(--gray);
  background-color: var(--white);
  z-index: 2;
}

.tab-frame {
  position: relative;
  width: calc(100% / 4);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tab {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--nav-gray);
}

.tab span {
  font-size: 12px;
  font-weight: 500;
  margin-top: 4px;
  margin-bottom: 12px;
}

.tab-active {
  color: var(--black);
}

a {
  text-decoration: none;
}
</style>
