<script setup lang="ts">
import { Button } from '@/components/ui/button';
import Main from '@/components/Main.vue';
</script>

<template>
  <Main :headbar="false" :navbar="false" :padded="false" :bg-gray="false">
    <div class="success-container">
      <div class="success-icon"></div>
      <div class="success-info">회원 가입이<br />완료되었어요</div>
    </div>
    <Button class="success-button">확인</Button>
  </Main>
</template>

<style scoped>
.success-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80%;
}

.success-icon {
  /* width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: var(--css-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px; */
  margin-bottom: 40px;
  width: 72px;
  opacity: 0;
  height: 72px;
  border-radius: 999px;
  background: var(--css-primary);
  position: relative;
  transform: rotate(45deg);
  animation: checkmarkCircleAnimation 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  animation-delay: 100ms;
}

.success-icon:after {
  content: '';
  box-sizing: border-box;
  animation: checkmarkAnimation 0.2s ease-out forwards;
  opacity: 0;
  animation-delay: 200ms;
  position: absolute;
  border-right: 3px solid;
  border-bottom: 3px solid;
  border-color: var(--black);
  bottom: 29px;
  left: 29px;
  height: 20px;
  width: 12px;
}

@keyframes checkmarkCircleAnimation {
  from {
    transform: scale(0) rotate(45deg);
    opacity: 0;
  }
  to {
    transform: scale(1) rotate(45deg);
    opacity: 1;
  }
}

@keyframes checkmarkCircleAnimation {
  from {
    transform: scale(0) rotate(45deg);
    opacity: 0;
  }
  to {
    transform: scale(1) rotate(45deg);
    opacity: 1;
  }
}
@keyframes checkmarkAnimation {
  0% {
    height: 0;
    width: 0;
    opacity: 0;
  }
  40% {
    height: 0;
    width: 12px;
    opacity: 1;
  }
  100% {
    opacity: 1;
    height: 20px;
  }
}

.success-info {
  display: flex;
  flex-direction: center;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
}

.success-button {
  left: 5.13%;
  right: 5.13%;
  bottom: 80px;
  position: absolute;
}
</style>
