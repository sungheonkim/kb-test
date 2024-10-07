<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import HeadBar from '@/components/HeadBar.vue';
import Main from '@/components/Main.vue';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const memberType = ref('');
const name = ref('');
const phoneNumber = ref('');
const phoneCarrier = ref('');
const residentNumberFront = ref('');
const residentNumberBack = ref('');
const residentNumberBackRef = ref<HTMLInputElement | null>(null);
const router = useRouter();

const isFormValid = computed(
  () =>
    memberType.value !== '' &&
    name.value !== '' &&
    phoneNumber.value !== '' &&
    phoneCarrier.value !== '' &&
    residentNumberFront.value.length === 6 &&
    residentNumberBack.value.length === 1
);

const selectMemberType = (type: string) => {
  memberType.value = type;
};

watch(residentNumberFront, (newValue) => {
  if (newValue.length > 6) {
    residentNumberFront.value = newValue.slice(0, 6);
  }
  if (newValue.length === 6 && residentNumberBackRef.value) {
    residentNumberBackRef.value.focus();
  }
});

watch(residentNumberBack, (newValue) => {
  if (newValue.length > 1) {
    residentNumberBack.value = newValue.slice(0, 1);
  }
});

const handleNextButtonClick = () => {
  if (isFormValid.value) {
    switch (memberType.value) {
      case '일반 회원':
        router.push('/login/bank_type');
        break;
      case '의사':
        router.push('/login/doctor');
        break;
      case '약사':
        router.push('/login/pharmacist');
        break;
      default:
        console.error('회원 가입 타입을 정해주세요');
    }
  }
};
</script>

<template>
  <HeadBar :back-button="true">회원가입</HeadBar>
  <Main :headbar="true" :navbar="false" :padded="true" :bg-gray="false">
    <div class="login-info">회원 정보를 <br />입력해주세요</div>

    <div class="login-container">
      <div class="member-select-container">
        <Button
          :variant="memberType === '일반 회원' ? 'default' : 'destructive'"
          class="one-third"
          @click="selectMemberType('일반 회원')"
        >
          일반 회원
        </Button>
        <Button
          :variant="memberType === '의사' ? 'default' : 'destructive'"
          class="one-third"
          @click="selectMemberType('의사')"
        >
          의사
        </Button>
        <Button
          :variant="memberType === '약사' ? 'default' : 'destructive'"
          class="one-third"
          @click="selectMemberType('약사')"
        >
          약사
        </Button>
      </div>

      <Label for="name-input">이름</Label>
      <Input type="text" id="name-input" v-model="name" placeholder="이름을 입력해주세요." />

      <Label for="phone-number-input">전화번호</Label>
      <div class="phone-num-tong">
        <Select v-model="phoneCarrier">
          <SelectTrigger class="carrier-select">
            <SelectValue placeholder="통신사" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="skt"> SKT </SelectItem>
              <SelectItem value="kt"> KT </SelectItem>
              <SelectItem value="lg"> LGU+ </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          type="text"
          inputmode="numeric"
          id="phone-number-input"
          v-model="phoneNumber"
          placeholder="전화번호를 입력해주세요."
          maxlength="11"
        />
      </div>

      <Label for="resident-number-input-front">주민등록번호</Label>
      <div class="resident-number-container">
        <Input
          type="text"
          inputmode="numeric"
          id="resident-number-input-front"
          v-model="residentNumberFront"
          placeholder="ex) 990909"
          maxlength="6"
        />
        <div>_</div>
        <div class="number-back">
          <Input
            type="text"
            inputmode="numeric"
            id="resident-number-input-back"
            v-model="residentNumberBack"
            maxlength="1"
            ref="residentNumberBackRef"
          />
          <span class="back-stars">* * * * * *</span>
        </div>
      </div>
    </div>

    <Button
      class="next-button"
      variant="default"
      :disabled="!isFormValid"
      @click="handleNextButtonClick"
    >
      다음
    </Button>
  </Main>
</template>

<style scoped>
.login-info {
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 24px;
  font-weight: 600;
  margin-top: 40px;
  margin-bottom: 60px;
  margin-left: 20px;
}

.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  margin-left: 20px;
  margin-right: 20px;
}

.member-select-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 20px;
}

.one-third {
  width: 100%;
}

.member-select-button {
  width: 100%;
}

.phone-num-tong {
  display: flex;
  gap: 12px;
}

.carrier-select {
  width: 80px;
  min-width: 80px;
}

.resident-number-container {
  display: flex;
  gap: 16px;
  justify-content: space-between;
}

.number-back {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
}

.back-stars {
  font-size: 18px;
  color: var(--dark-gray);
}

.next-button {
  left: 5.13%;
  right: 5.13%;
  bottom: 80px;
  position: absolute;
}

#resident-number-input-back {
  width: 40px;
  height: 40px;
}

label {
  margin-top: 36px;
}
</style>
