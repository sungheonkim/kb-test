<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import HeadBar from '@/components/HeadBar.vue';
import Main from '@/components/Main.vue';
import ShadowBox from '@/components/ShadowBox.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput
} from '@/components/ui/number-field';

interface Medicine {
  name: string;
  morning: number;
  afternoon: number;
  evening: number;
  days: number;
  memo: string;
}

const name = ref('');
const residentNumFront = ref('');
const residentNumBack = ref('');
const diseaseCode = ref('');
const medicines = ref<Medicine[]>([]);

const showMedicineModal = ref(false);
const newMedicine = ref<Medicine>({
  name: '',
  morning: 0,
  afternoon: 0,
  evening: 0,
  days: 0,
  memo: ''
});

const router = useRouter();

const addMedicine = () => {
  medicines.value.push({ ...newMedicine.value });
  newMedicine.value = { name: '', morning: 0, afternoon: 0, evening: 0, days: 0, memo: '' };
  showMedicineModal.value = false;
};

const removeMedicine = (index: number) => {
  medicines.value.splice(index, 1);
};

const isFormValid = computed(
  () =>
    name.value.trim() !== '' &&
    residentNumFront.value.length === 6 &&
    residentNumBack.value.length === 1 &&
    diseaseCode.value.trim() !== '' &&
    medicines.value.length > 0
);

const handleResidentNumBackInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  input.value = input.value.replace(/\D/g, '').slice(0, 1);
  residentNumBack.value = input.value;
};

const handleNextButtonClick = () => {
  if (isFormValid.value) {
    router.push('/doctor/check');
  }
};
</script>

<template>
  <div>
    <HeadBar :back-button="false">처방전</HeadBar>
    <Main :headbar="true" :navbar="false" :padded="true" :bg-gray="true">
      <div class="prescription-container">
        <ShadowBox :padding-x="20" :padding-y="20">
          <div class="prescription-title">처방전</div>

          <div class="prescription-info">
            <Label for="name">이름</Label>
            <Input type="text" id="name" v-model="name" placeholder="이름을 입력하세요" />
          </div>

          <div class="prescription-info">
            <Label for="resident-num-front">주민등록번호</Label>
            <div class="resident-num">
              <Input
                type="text"
                id="resident-num-front"
                v-model="residentNumFront"
                placeholder="ex) 990909"
                inputmode="numeric"
                maxlength="6"
              />
              <div>-</div>
              <div class="resident-num-back">
                <Input
                  type="text"
                  id="resident-num-back"
                  v-model="residentNumBack"
                  @input="handleResidentNumBackInput"
                  inputmode="numeric"
                  maxlength="1"
                  class="w-10"
                />
                <div>* * * * * *</div>
              </div>
            </div>
          </div>

          <div class="prescription-info">
            <Label for="disease-code">질병 코드 등록</Label>
            <Input
              type="text"
              id="disease-code"
              v-model="diseaseCode"
              placeholder="질병 코드를 입력하세요"
            />
          </div>

          <div class="prescription-info">
            <div class="pill-container">
              <Label>약 등록</Label>
              <Dialog v-model:open="showMedicineModal">
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <i class="fa-solid fa-plus"></i>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>약 등록</DialogTitle>
                    <DialogDescription>새로운 약을 등록하세요.</DialogDescription>
                  </DialogHeader>

                  <div class="divider"></div>

                  <div class="medicine-form">
                    <Label for="medicine-name">약 이름</Label>
                    <Input
                      id="medicine-name"
                      v-model="newMedicine.name"
                      placeholder="약 이름을 입력하세요"
                    />
                  </div>
                  <div class="medicine-form">
                    <div class="dosage-inputs">
                      <div
                        v-for="time in ['morning', 'afternoon', 'evening'] as const"
                        :key="time"
                        class="dosage-day"
                      >
                        <NumberField :id="`dosage-${time}`" :min="0" v-model="newMedicine[time]">
                          <Label :for="`medicine-${time}`">{{
                            { morning: '아침', afternoon: '점심', evening: '저녁' }[time]
                          }}</Label>
                          <NumberFieldContent>
                            <NumberFieldDecrement />
                            <NumberFieldInput />
                            <NumberFieldIncrement />
                          </NumberFieldContent>
                        </NumberField>
                      </div>
                    </div>
                  </div>
                  <div class="medicine-form">
                    <NumberField id="dosage-days" :min="0" v-model="newMedicine.days">
                      <Label for="medicine-days">복용 일수</Label>
                      <NumberFieldContent>
                        <NumberFieldDecrement />
                        <NumberFieldInput />
                        <NumberFieldIncrement />
                      </NumberFieldContent>
                    </NumberField>
                  </div>
                  <div class="medicine-form">
                    <Label for="medicine-memo">복용 방법</Label>
                    <Textarea
                      id="medicine-memo"
                      v-model="newMedicine.memo"
                      placeholder="약 복용 방법을 입력하세요."
                    />
                  </div>
                  <div class="dialog-footer">
                    <Button @click="addMedicine" size="lg">등록</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div class="divider"></div>

            <div v-if="medicines.length > 0" class="medicine-list">
              <div v-for="(medicine, index) in medicines" :key="index" class="medicine-item">
                <div class="medicine-info">
                  <div class="medicine-name">{{ medicine.name }}</div>
                  <div class="medicine-dosage">
                    아침: {{ medicine.morning }} 정 / 점심: {{ medicine.afternoon }} 정 / 저녁:
                    {{ medicine.evening }} 정
                  </div>
                  <div>{{ medicine.days }} 일</div>
                  <div v-if="medicine.memo" class="medicine-memo">{{ medicine.memo }}</div>
                </div>
                <Button variant="ghost" size="icon" @click="removeMedicine(index)">
                  <i class="fa-solid fa-trash"></i>
                </Button>
              </div>
            </div>
          </div>
        </ShadowBox>
      </div>

      <div class="fixed-button">
        <Button size="lg" :disabled="!isFormValid" @click="handleNextButtonClick"
          >처방전 등록</Button
        >
      </div>
    </Main>
  </div>
</template>

<style scoped>
.prescription-container {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 80px;
}

.prescription-title {
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
  font-size: 24px;
  font-weight: 600;
}

.prescription-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 28px;
}

.prescription-info:last-child {
  margin-bottom: 0;
}

.resident-num {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.resident-num-back {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 8px;
}

.pill-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.medicine-form {
  display: flex;
  flex-direction: column;
  /* margin-top: 16px; */
}

.divider {
  height: 1px;
  background-color: var(--dark-gray);
  margin-bottom: 8px;
}

.dosage-inputs {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.dosage-day {
  display: flex;
  flex-direction: column;
}

.dosage-inputs > div {
  flex: 1;
}

.medicine-list {
  max-height: auto;
  overflow-y: auto;
}

.medicine-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
  border: 1px solid var(--nav-gray);
  border-radius: 8px;
  margin-bottom: 8px;
}

.medicine-item:last-child {
  margin-bottom: 0;
}

.medicine-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.medicine-name {
  font-weight: 600;
}

.medicine-dosage {
  font-size: 14px;
  color: var(--dark-gray);
}

.medicine-memo {
  font-size: 14px;
  color: var(--dark-gray);
  margin-top: 4px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.fixed-button {
  position: fixed;
  bottom: 20px;
  left: 20px;
  right: 20px;
  z-index: 10;
}
</style>
