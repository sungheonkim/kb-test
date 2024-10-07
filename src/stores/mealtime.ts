import { defineStore } from 'pinia';

export const useMealTimeStore = defineStore('mealTime', {
  state: () => ({
    breakfast: '09:00',
    lunch: '12:00',
    dinner: '18:00'
  }),
  actions: {
    updateMealTime(meal: 'breakfast' | 'lunch' | 'dinner', time: string) {
      this[meal] = time;
    },
    updateAllMealTimes(times: { breakfast: string; lunch: string; dinner: string }) {
      this.breakfast = times.breakfast;
      this.lunch = times.lunch;
      this.dinner = times.dinner;
    }
  },
  persist: true // 페이지 새로고침 후에도 상태 유지
});
