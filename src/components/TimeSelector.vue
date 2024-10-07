<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { computed } from 'vue';

const props = defineProps<{
  title: string;
  modelValue: string;
}>();

const emit = defineEmits(['update:modelValue']);

const hours = Array.from({ length: 24 }, (_, i) => i);
const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

const selectedTime = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const selectedHour = computed({
  get: () => selectedTime.value.split(':')[0],
  set: (value) => {
    const [_, minute] = selectedTime.value.split(':');
    selectedTime.value = `${value}:${minute}`;
  }
});

const selectedMinute = computed({
  get: () => selectedTime.value.split(':')[1],
  set: (value) => {
    const [hour, _] = selectedTime.value.split(':');
    selectedTime.value = `${hour}:${value}`;
  }
});
</script>

<template>
  <div>
    <div class="time-title">{{ title }}</div>
    <div class="input-frame">
      <Select v-model="selectedHour">
        <SelectTrigger>
          <SelectValue :placeholder="selectedHour" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem v-for="hour in hours" :key="hour" :value="hour.toString().padStart(2, '0')">
            {{ hour.toString().padStart(2, '0') }}
          </SelectItem>
        </SelectContent>
      </Select>
      <Select v-model="selectedMinute">
        <SelectTrigger>
          <SelectValue :placeholder="selectedMinute" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem v-for="minute in minutes" :key="minute" :value="minute.toString().padStart(2, '0')">
            {{ minute.toString().padStart(2, '0') }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
</template>

<style scoped>
.input-frame {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.time-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 2px;
}
</style>