<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import HeadBar from '@/components/HeadBar.vue';
import Main from '@/components/Main.vue';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CheckCircle2 } from 'lucide-vue-next';

const licenseNumber = ref('');
const isLicenseVerified = ref(false);
const representativeName = ref('');
const hospitalPhone = ref('');
const router = useRouter();

const verifyLicense = () => {
  if (licenseNumber.value.trim() !== '') {
    isLicenseVerified.value = true;
  }
};

const isFormValid = computed(() => {
  return (
    isLicenseVerified.value &&
    representativeName.value.trim() !== '' &&
    hospitalPhone.value.trim() !== ''
  );
});

const handleNextButtonClick = () => {
  if (isFormValid.value) {
    router.push('/success');
  }
};
</script>

<template>
  <HeadBar :back-button="true">회원가입</HeadBar>
  <Main :headbar="true" :navbar="false" :padded="true" :bg-gray="false">
    <div class="login-doctor">의사 정보를 <br />입력해주세요</div>

    <div class="doctor-container">
      <div class="input-group">
        <Label for="doctor-license">면허 번호</Label>
        <div class="license-container">
          <Input
            type="text"
            inputmode="numeric"
            id="doctor-license"
            v-model="licenseNumber"
            placeholder="면허 번호 입력하세요"
            maxlength="6"
          ></Input>
          <Button @click="verifyLicense" :disabled="isLicenseVerified">등록하기</Button>
          <CheckCircle2 v-if="isLicenseVerified" class="text-yellow-500" />
        </div>
      </div>

      <div class="input-group">
        <Label for="doctor-representative">대표 원장 성명</Label>
        <Input
          type="text"
          id="doctor-representative"
          v-model="representativeName"
          placeholder="대표 원장 성명 입력"
        ></Input>
      </div>

      <div class="input-group">
        <Label for="hospital-tel">병원 연락처</Label>
        <Input
          type="text"
          inputmode="numeric"
          id="hospital-tel"
          v-model="hospitalPhone"
          placeholder="ex) 021234567"
          maxlength="11"
        ></Input>
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
.login-doctor {
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 24px;
  font-weight: 600;
  margin-top: 40px;
  margin-bottom: 60px;
  margin-left: 20px;
}

.doctor-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  margin-left: 20px;
  margin-right: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 60px;
}

.input-group label {
  margin-bottom: 8px;
}

.license-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.next-button {
  left: 5.13%;
  right: 5.13%;
  bottom: 80px;
  position: absolute;
}
</style>
