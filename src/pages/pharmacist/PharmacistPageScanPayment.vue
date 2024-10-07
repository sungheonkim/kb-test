<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import HeadBar from '@/components/HeadBar.vue';
import Main from '@/components/Main.vue';
import ShadowBox from '@/components/ShadowBox.vue';
import { Button } from '@/components/ui/button';

const router = useRouter();
const route = useRoute();
const showPaymentDetail = ref(false);

const medicineList = ref([
  { name: '약품 A', price: 12000 },
  { name: '약품 B', price: 15000 },
  { name: '약품 C', price: 8000 }
]);

const totalPrice = computed(() => {
  return medicineList.value.reduce((sum, item) => sum + item.price, 0);
});

const handlePaymentDetail = () => {
  showPaymentDetail.value = !showPaymentDetail.value;
};

const handlePaymentRequest = () => {
  // 결제 처리 로직을 여기에 추가

  router.push({ name: '/pharmacist' });
};
</script>

<template>
  <HeadBar :back-button="true">처방전 상세</HeadBar>
  <Main :headbar="true" :navbar="false" :padded="true" :bg-gray="true">
    <div class="notice">
      <i class="fa-regular fa-circle-check"></i>
      <div>결제 완료된 처방전이에요</div>
    </div>

    <ShadowBox :padding-x="20" :padding-y="20" class="prescription-container">
      <div class="prescription-title">처방전</div>
      <div class="prescription-info">
        처방전 ID: {{ route.params.id }}
        <!-- 여기에 추가적인 처방전 정보를 표시할 수 있습니다 -->
      </div>
    </ShadowBox>

    <ShadowBox :padding-x="20" :padding-y="20">
      <div class="pill-arrow" @click="handlePaymentDetail">
        <div class="title-text">약품 내역</div>
        <i class="fa-solid fa-chevron-down" :class="{ rotate: showPaymentDetail }"></i>
      </div>

      <div class="divider"></div>

      <div v-if="showPaymentDetail">
        <div class="pill-list" v-for="(medicine, index) in medicineList" :key="index">
          <div class="pill-cost">
            <div>{{ medicine.name }}</div>
            <div>{{ medicine.price.toLocaleString() }}원</div>
          </div>
        </div>
      </div>

      <div class="pill-arrow" style="margin-bottom: 0">
        <div class="title-text">총 가격</div>
        <div class="title-number">{{ totalPrice.toLocaleString() }}원</div>
      </div>
    </ShadowBox>

    <Button size="lg" @click="handlePaymentRequest">결제 요청</Button>
  </Main>
</template>

<style scoped>
.notice {
  margin-top: 12px;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: var(--kb-yellow);
  gap: 8px;
}

.prescription-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12px;
}

.prescription-title {
  font-size: 24px;
  font-weight: 600;
}

.prescription-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}

.pill-arrow {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.fa-chevron-down.rotate {
  transform: rotate(180deg);
}

.divider {
  height: 1px;
  background-color: var(--dark-gray);
  margin-bottom: 16px;
}

.title-text {
  font-weight: 600;
  font-size: 18px;
}

.title-number {
  font-weight: 600;
  font-size: 20px;
  color: var(--kb-yellow);
}

.pill-list {
  display: flex;
  flex-direction: column;
  font-weight: 400;
  font-size: 16px;
  color: var(--dark-gray);
  margin-bottom: 16px;
}

.pill-cost {
  display: flex;
  justify-content: space-between;
}
</style>
