import { defineStore } from 'pinia';
import { toast } from '@steveyuowo/vue-hot-toast';

export const useMedicationStore = defineStore('medication', {
  state: () => ({
    morning: false,
    afternoon: false,
    evening: false
  }),
  actions: {
    toggleMedication(time: 'morning' | 'afternoon' | 'evening') {
      this[time] = !this[time];
      let timeKorean = '';
      if (time === 'morning') {
        timeKorean = '아침';
      } else if (time === 'afternoon') {
        timeKorean = '점심';
      } else {
        timeKorean = '저녁';
      }
      if (this[time]) {
        toast.success(`${timeKorean}약 복용 확인하였습니다`);
      } else {
        toast.error(`${timeKorean}약 복용 취소하였습니다`);
      }
    }
  },
  persist: true
});
