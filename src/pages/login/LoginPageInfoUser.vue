<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import HeadBar from '@/components/HeadBar.vue';
import Main from '@/components/Main.vue';
import { Button } from '@/components/ui/button';

const banks = [
  { name: '국민은행', img: '/images/banks/kb-bank.png' },
  { name: '신한은행', img: '/images/banks/shinhan-bank.png' },
  { name: '하나은행', img: '/images/banks/hana-bank.png' },
  { name: '농협은행', img: '/images/banks/nh-bank.png' },
  { name: '우리은행', img: '/images/banks/woori-bank.png' },
  { name: '기업은행', img: '/images/banks/ibk-bank.png' }
];

const selectedBank = ref<{ name: string; img: string } | null>(null);
const router = useRouter();

const selectBank = (bank: { name: string; img: string }) => {
  selectedBank.value = bank;
};

const handleNextButtonClick = () => {
  if (selectedBank.value) {
    router.push({
      path: '/login/bank_id',
      query: {
        bankName: selectedBank.value.name,
        bankImg: selectedBank.value.img
      }
    });
  }
};
</script>

<template>
  <HeadBar :back-button="true">회원가입</HeadBar>
  <Main :headbar="true" :navbar="false" :padded="true" :bg-gray="false">
    <div class="bank-info">계좌 등록을 위해 <br />은행을 선택해주세요</div>

    <div class="bank-container">
      <div
        v-for="bank in banks"
        :key="bank.name"
        class="bank-list"
        :class="{ selected: selectedBank?.name === bank.name }"
        @click="selectBank(bank)"
      >
        <img :src="bank.img" class="bank-icon" />
        {{ bank.name }}
      </div>
    </div>

    <div>
      <Button variant="destructive" size="lg" class="extra-button">기타</Button>
    </div>

    <Button
      class="next-button"
      variant="default"
      :disabled="!selectedBank"
      @click="handleNextButtonClick"
    >
      다음
    </Button>
  </Main>
</template>

<style scoped>
.bank-info {
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 24px;
  font-weight: 600;
  margin-top: 40px;
  margin-bottom: 60px;
  margin-left: 20px;
}

.bank-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
  gap: 8px;
  flex-wrap: wrap;
}

.bank-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8%;
  border: 1px solid var(--gray);
  width: 30%;
  height: 100px;
  gap: 8px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

.bank-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 52px;
  height: 52px;
}

.extra-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}

.bank-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8%;
  border: 1px solid var(--gray);
  width: 30%;
  height: 100px;
  gap: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.bank-list.selected {
  background-color: hsl(var(--primary));
  border-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

.next-button {
  left: 5.13%;
  right: 5.13%;
  bottom: 80px;
  position: absolute;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

.next-button:not(:disabled):hover {
  opacity: 0.9;
}
</style>
