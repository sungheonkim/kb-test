<script setup lang="ts">
import HeadBar from '@/components/HeadBar.vue';
import NavBar from '@/components/NavBar.vue';
import Main from '@/components/Main.vue';
import ShadowBox from '@/components/ShadowBox.vue';
import { ref } from 'vue';

const selectedLeft = ref(true);

</script>

<template>
  <HeadBar :back-button="true" :bg-gray="true">약 상세</HeadBar>
  <NavBar />
  <Main :headbar="true" :navbar="true" :bg-gray="true" >
    <div class="detail-frame">
      <ShadowBox :padding-y="48" :padding-x="48" :margin-bottom="0" class="detail-container">
        <div class="pill-frame">
          <!-- 약 사진 들어갈 곳 -->
        </div>
        <div class="pill-info">
          <div class="pill-company">동화약품(주)</div>
          <div class="pill-name">{{ $route.params.id }}번 약</div>
        </div>
        <div class="effect-frame">
          <div class="effect-badge">식욕감퇴</div>
          <div class="effect-badge">위부팽만감</div>
          <div class="effect-badge">소화불량</div>
          <div class="effect-badge">과식</div>
          <div class="effect-badge">체함</div>
          <div class="effect-badge">구역</div>
          <div class="effect-badge">구토</div>
        </div>
      </ShadowBox>
    </div>
    <ShadowBox :radius="false">
      <div class="tab-frame">
        <div class="tab" :class="selectedLeft ? 'selected' : ''" @click="selectedLeft = true">복용방법</div>
        <div class="tab" :class="selectedLeft ? '' : 'selected'" @click="selectedLeft = false">주의사항</div>
      </div>
      <div v-if="selectedLeft" class="info">
        만 15세 이상 및 성인은 1회 1병(75 mL), 만 11세이상~만 15세미만은 1회 2/3병(50 mL), 만 8세 이상~만 11세 미만은 1회 1/2병(37.5 mL), 만 5세 이상~만 8세 미만은 1회 1/3병(25 mL), 만 3세 이상~만 5세 미만은 1회 1/4병(18.75 mL), 만 1세 이상~만 3세 미만은 1회 1/5병(15 mL), 1일 3회 식후에 복용합니다. 복용간격은 4시간 이상으로 합니다.
      </div>
      <div v-else class="info">
        주의사항 주의사항주의사항 주의사항주의사항 주의사항주의사항 주의사항주의사항 주의사항주의사항 주의사항주의사항 주의사항주의사항 주의사항주의사항 주의사항주의사항 주의사항주의사항 주의사항주의사항 주의사항주의사항 주의사항주의사항 주의사항주의사항 주의사항주의사항 주의사항주의사항 주의사항주의사항 주의사항주의사항 주의사항
      </div>
    </ShadowBox>
  </Main>
</template>


<style scoped>
.detail-frame {
  margin-top: 8px;
  width: 100%;
  padding: 0 5.13%;
  margin-bottom: 24px;
}

.detail-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 24px;
}

.pill-frame {
  width: 128px;
  height: 128px;
  background-color: var(--gray);
  border-radius: 12px;
}

.pill-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
}

.pill-company {
  font-size: 16px;
  color: var(--dark-gray);
}

.pill-name {
  font-size: 26px;
  font-weight: 600;
}

.effect-frame {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  row-gap: 8px;
  column-gap: 10px;
}

.effect-badge {
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 40px;
  background-color: var(--gray);
}

.tab-frame {
  display: flex;
  height: 48px;
  padding-top: 2px;
}

.tab {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 2px solid var(--white);
  color: var(--dark-gray)
}

.tab.selected {
  color: var(--black);
  border-bottom: 2px solid var(--css-primary);
}

.info {
  padding: 16px 24px;
  font-size: 14px;
}
</style>