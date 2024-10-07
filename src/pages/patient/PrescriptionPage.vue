<script setup lang="ts">
import HeadBar from '@/components/HeadBar.vue';
import NavBar from '@/components/NavBar.vue';
import Main from '@/components/Main.vue';
import ShadowBox from '@/components/ShadowBox.vue';
</script>

<template>
  <HeadBar :bg-gray="true">처방전</HeadBar>
  <NavBar />
  <Main :headbar="true" :navbar="true" :padded="true" :bg-gray="true">
    <ShadowBox class="shadow-box" :padding-x="20" :padding-y="20" :height="156" @click="$router.push('/prescription/1')">
      <div class="presc-top">
        <div>
          <div class="name-hospital">김성헌 내과의원</div>
          <div class="name-pharm">어린이대공원약국</div>
        </div>
        <div class="name-hospital red">D-3</div>
      </div>
      <div class="presc-bottom">
        <div class="type-date">
          <div class="type">
            <i class="fa-solid fa-virus"></i>
            <span>감기</span>
          </div>
          <span>24. 09. 10 | 오후 4:18</span>
        </div>
        <div class="intake-day">
          <div class="per-day">1일 3회</div>
          <div class="duration">3일치</div>
        </div>
      </div>
    </ShadowBox>
    <ShadowBox class="shadow-box" :padding-x="20" :padding-y="20" :height="156" @click="$router.push('/prescription/2')">
      <div class="presc-top">
        <div>
          <div class="name-hospital">김성헌 내과의원</div>
          <div class="name-pharm">어린이대공원약국</div>
        </div>
        <div class="name-hospital">수령완료</div>
      </div>
      <div class="presc-bottom">
        <div class="type-date">
          <div class="type">
            <i class="fa-solid fa-virus"></i>
            <span>감기</span>
          </div>
          <span>24. 09. 10 | 오후 4:18</span>
        </div>
        <div class="intake-day">
          <div class="per-day">1일 3회</div>
          <div class="duration">3일치</div>
        </div>
      </div>
    </ShadowBox>
  </Main>
</template>

<style scoped>
.shadow-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.presc-top {
  display: flex;
  justify-content: space-between;
}

.name-hospital {
  font-size: 20px;
  font-weight: 600;
}

.name-pharm {
  font-size: 14px;
  color: var(--dark-gray);
  margin-top: -2px;
}

.red {
  color: var(--red);
}

.presc-bottom {
  display: flex;
  justify-content: space-between;
  align-items: end;
}

.type-date {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: var(--dark-gray);
}

.type {
  display: flex;
  gap: 4px;
  align-items: center;
}

.intake-day {
  text-align: end;
}

.per-day {
  font-size: 12px;
  color: var(--dark-gray);
}

.duration {
  font-size: 24px;
  font-weight: 600;
  margin-right: -1px;
  margin-top: -3px;
  margin-bottom: -4px;
}
</style>
