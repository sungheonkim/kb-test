<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import moment from 'moment';
import { Toaster } from '@steveyuowo/vue-hot-toast';
import '@/assets/toast.css';
import 'moment/locale/ko';
import { useThemeStore } from '@/stores/theme';
import { useMedicationStore } from '@/stores/medication';
import { useMealTimeStore } from '@/stores/mealtime';
import HeadBar from '@/components/HeadBar.vue';
import NavBar from '@/components/NavBar.vue';
import Main from '@/components/Main.vue';
import ShadowBox from '@/components/ShadowBox.vue';
import Badge from '@/components/Badge.vue';
import { Button } from '@/components/ui/button';

const medicationStore = useMedicationStore();
const mealTimeStore = useMealTimeStore();

const themeStore = useThemeStore();
setTimeout(() => {
  themeStore.setThemeColor('#FDFDFD');
}, 10);

moment.locale('ko');
const today = moment();
const selectedDate = ref(today);
const calendarContainer = ref<HTMLElement | null>(null);

const dateRange = computed(() => {
  const dates = [];
  for (let i = -14; i < 21; i++) {
    dates.push(moment(today).add(i, 'days'));
  }
  return dates;
});

const selectDate = (date: moment.Moment) => {
  selectedDate.value = date;
};

const isSelected = (date: moment.Moment) => {
  return date.isSame(selectedDate.value, 'day');
};

const isSaturday = (date: moment.Moment) => {
  return date.day() === 6;
};

const isSunday = (date: moment.Moment) => {
  return date.day() === 0;
};

const getKoreanWeekday = (date: moment.Moment): string => {
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  return weekdays[date.day()];
};

onMounted(() => {
  if (calendarContainer.value) {
    const tomorrowElement = calendarContainer.value.querySelector('.day-frame:nth-child(15)');
    if (tomorrowElement) {
      const containerRect = calendarContainer.value.getBoundingClientRect();
      const tomorrowRect = tomorrowElement.getBoundingClientRect();
      const scrollPosition = tomorrowRect.left - containerRect.left - 24;
      calendarContainer.value.scrollLeft = scrollPosition;
    }
  }
});
</script>

<template>
  <Toaster />
  <HeadBar>복용약</HeadBar>
  <NavBar />
  <Main :headbar="true" :navbar="true" :bg-gray="true">
    <div class="calendar-container" ref="calendarContainer">
      <div
        v-for="date in dateRange"
        class="day-frame"
        @click="selectDate(date)"
        :key="date.format('YYYY-MM-DD')"
      >
        <span class="weekday" :class="{ isSaturday: isSaturday(date), isSunday: isSunday(date) }">{{
          getKoreanWeekday(date)
        }}</span>
        <span class="day" :class="{ isSelected: isSelected(date) }">{{ date.format('D') }}</span>
      </div>
    </div>
    <ShadowBox :padding-x="20" :padding-y="20" :margin-bottom="12" :radius="false">
      <div class="day-alert-top">
        <div class="meal-and-time">
          <span class="meal">아침</span>
          <span class="meal-time">{{ mealTimeStore.breakfast }}</span>
        </div>
        <Button
          :variant="medicationStore.morning ? 'destructive' : 'default'"
          @click="medicationStore.toggleMedication('morning')"
          >{{ medicationStore.morning ? '취소' : '확인' }}</Button
        >
      </div>
      <div class="medicine-list">
        <div class="medicine-info-frame" @click="$router.push('/medicine/1')">
          <div class="medicine-info-left">
            <div class="medicine-icon-name">
              <div class="medicine-icon">
                <!-- 아이콘 들어갈 자리 -->
              </div>
              <span class="medicine-name">코푸정</span>
            </div>
            <div class="medicine-badge-frame">
              <Badge>졸음</Badge>
              <Badge>어지러움</Badge>
            </div>
          </div>
          <span class="medicine-intake">1정</span>
        </div>
      </div>
    </ShadowBox>
    <ShadowBox :padding-x="20" :padding-y="20" :margin-bottom="12" :radius="false">
      <div class="day-alert-top">
        <div class="meal-and-time">
          <span class="meal">점심</span>
          <span class="meal-time">{{ mealTimeStore.lunch }}</span>
        </div>
        <Button
          :variant="medicationStore.afternoon ? 'destructive' : 'default'"
          @click="medicationStore.toggleMedication('afternoon')"
          >{{ medicationStore.afternoon ? '취소' : '확인' }}</Button
        >
      </div>
      <div class="medicine-list">
        <div class="medicine-info-frame" @click="$router.push('/medicine/1')">
          <div class="medicine-info-left">
            <div class="medicine-icon-name">
              <div class="medicine-icon">
                <!-- 아이콘 들어갈 자리 -->
              </div>
              <span class="medicine-name">코푸정</span>
            </div>
            <div class="medicine-badge-frame">
              <Badge>졸음</Badge>
              <Badge>어지러움</Badge>
            </div>
          </div>
          <span class="medicine-intake">1정</span>
        </div>
      </div>
    </ShadowBox>
    <ShadowBox :padding-x="20" :padding-y="20" :margin-bottom="12" :radius="false">
      <div class="day-alert-top">
        <div class="meal-and-time">
          <span class="meal">저녁</span>
          <span class="meal-time">{{ mealTimeStore.dinner }}</span>
        </div>
        <Button
          :variant="medicationStore.evening ? 'destructive' : 'default'"
          @click="medicationStore.toggleMedication('evening')"
          >{{ medicationStore.evening ? '취소' : '확인' }}</Button
        >
      </div>
      <div class="medicine-list">
        <div class="medicine-info-frame" @click="$router.push('/medicine/1')">
          <div class="medicine-info-left">
            <div class="medicine-icon-name">
              <div class="medicine-icon">
                <!-- 아이콘 들어갈 자리 -->
              </div>
              <span class="medicine-name">코푸정</span>
            </div>
            <div class="medicine-badge-frame">
              <Badge>졸음</Badge>
              <Badge>어지러움</Badge>
            </div>
          </div>
          <span class="medicine-intake">1정</span>
        </div>
      </div>
    </ShadowBox>
  </Main>
</template>

<style scoped>
.calendar-container {
  width: 100%;
  background-color: var(--white);
  padding: 16px 0 16px 24px;
  display: flex;
  gap: 36px;
  overflow-x: scroll;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.04);
  margin-bottom: 12px;
}

.day-frame {
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  color: var(--dark-gray);
}

.day-frame:last-child {
  margin-right: 48px;
}

.weekday {
  font-size: 16px;
}

.weekday.isSaturday {
  color: var(--blue);
}

.weekday.isSunday {
  color: var(--red);
}

.day {
  font-size: 16px;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.day.isSelected {
  color: var(--black);
  background-color: var(--css-primary);
}

.day-alert-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.meal-and-time {
  display: flex;
  align-items: center;
  gap: 8px;
}

.meal {
  font-size: 22px;
  font-weight: 600;
}

.meal-time {
  font-size: 12px;
}

.medicine-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.medicine-info-frame {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.medicine-info-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.medicine-icon-name {
  display: flex;
  align-items: center;
  gap: 8px;
}

.medicine-icon {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  background-color: var(--gray);
  display: flex;
  justify-content: center;
  align-items: center;
}

.medicine-name {
  font-size: 18px;
  font-weight: 500;
}

.medicine-badge-frame {
  display: flex;
  gap: 8px;
}

.medicine-intake {
  font-size: 18px;
  font-weight: 500;
}
</style>
