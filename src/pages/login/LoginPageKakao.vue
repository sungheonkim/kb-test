<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Button } from '@/components/ui/button';
import Main from '@/components/Main.vue';

const router = useRouter();

const navigateToNextPage = () => {
  router.push('/login/member');
};
</script>

<template>
  <Main :headbar="false" :navbar="false" :padded="false" :bg-gray="false">
    <div class="login-container">
      <div class="login-icon"></div>

      <div class="login-name">우리 1-3조 kbAnk</div>

      <Button size="lg" class="login-kakao" @click="navigateToNextPage">
        <i class="fa-solid fa-comment"></i>카카오 로그인
      </Button>
    </div>
  </Main>
</template>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80%;
}

.login-icon {
  width: 80px;
  height: 80px;
  border-radius: 8%;
  background-color: var(--gray);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
}

.login-name {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 80px;
}

.login-kakao {
  width: 80%;
  background-color: #fee500;
  gap: 12px;
}
</style>
