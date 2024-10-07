<script setup lang="ts">
import { ref, computed } from 'vue';
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
import { CheckCircle2 } from 'lucide-vue-next';

const pharmacyName = ref('');
const city = ref('');
const district = ref('');
const neighborhood = ref('');
const detailAddress = ref('');
const licenseNumber = ref('');
const isLicenseVerified = ref(false);
const representativeName = ref('');
const pharmacyPhone = ref('');
const router = useRouter();

const verifyLicense = () => {
  if (licenseNumber.value.trim() !== '') {
    isLicenseVerified.value = true;
  }
};

const isFormValid = computed(() => {
  return (
    pharmacyName.value.trim() !== '' &&
    city.value != '' &&
    district.value != '' &&
    neighborhood.value != '' &&
    detailAddress.value.trim() != '' &&
    isLicenseVerified.value &&
    representativeName.value.trim() != '' &&
    pharmacyPhone.value.trim() != ''
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
    <div class="login-pharmacist">약사 정보를 <br />입력해주세요</div>

    <div class="pharmacist-container">
      <div class="input-group">
        <Label for="pharmacy-name">약국명</Label>
        <Input
          type="text"
          id="pharmacy-name"
          v-model="pharmacyName"
          placeholder="약국명을 입력해주세요"
        ></Input>
      </div>

      <div class="input-group">
        <Label>약국 주소</Label>
        <div class="pharmacy-container">
          <Select v-model="city">
            <SelectTrigger class="w-[120px]">
              <SelectValue placeholder="시" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="seoul"> 서울특별시 </SelectItem>
                <SelectItem value="guangju"> 광주광역시 </SelectItem>
                <SelectItem value="daegu"> 대구광역시 </SelectItem>
                <SelectItem value="busan"> 부산광역시 </SelectItem>
                <SelectItem value="ulsan"> 울산광역시 </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select v-model="district">
            <SelectTrigger class="w-[90px]">
              <SelectValue placeholder="구" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="gangnam"> 강남구 </SelectItem>
                <SelectItem value="guanjin"> 광진구 </SelectItem>
                <SelectItem value="yeongdeongpo"> 영등포구 </SelectItem>
                <SelectItem value="songpa"> 송파구 </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select v-model="neighborhood">
            <SelectTrigger class="w-[90px]">
              <SelectValue placeholder="동" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="seoul"> 무슨구 </SelectItem>
                <SelectItem value="guangju"> 무슨구 </SelectItem>
                <SelectItem value="daegu"> 무슨구 </SelectItem>
                <SelectItem value="busan"> 무슨구 </SelectItem>
                <SelectItem value="ulsan"> 무슨구 </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Input
          type="text"
          id="pharmacist-address"
          v-model="detailAddress"
          placeholder="(상세주소)"
        ></Input>
      </div>

      <div class="input-group">
        <Label for="pharmacist-license">면허 번호</Label>
        <div class="license-container">
          <Input
            type="text"
            id="pharmacist-license"
            v-model="licenseNumber"
            placeholder="면허 번호를 입력하세요"
            maxlength="6"
          ></Input>
          <Button @click="verifyLicense" :disabled="isLicenseVerified">등록하기</Button>
          <CheckCircle2 v-if="isLicenseVerified" class="text-yellow-500"></CheckCircle2>
        </div>
      </div>

      <div class="input-group">
        <Label for="pharmacist-representative">대표 약사 성명</Label>
        <Input
          type="text"
          id="pharmacist-representative"
          v-model="representativeName"
          placeholder="대표 약사 성명을 입력"
        ></Input>
      </div>

      <div class="input-group">
        <Label for="pharmacy-tel">약국 연락처</Label>
        <Input
          type="text"
          inputmode="numeric"
          id="pharmacy-tel"
          v-model="pharmacyPhone"
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
.login-pharmacist {
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 24px;
  font-weight: 600;
  margin-top: 40px;
  margin-bottom: 32px;
  margin-left: 20px;
}

.pharmacist-container {
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
  margin-bottom: 20px;
}

.input-group label {
  margin-bottom: 8px;
}

.pharmacy-container {
  display: flex;
  justify-content: space-between;
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
