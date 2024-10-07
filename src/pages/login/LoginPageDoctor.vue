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

const hospitalName = ref('');
const city = ref('');
const district = ref('');
const neighborhood = ref('');
const detailAddress = ref('');
const hospitalType = ref('');
const router = useRouter();

const isFormValid = computed(() => {
  return (
    hospitalName.value.trim() !== '' &&
    city.value !== '' &&
    district.value !== '' &&
    neighborhood.value !== '' &&
    detailAddress.value.trim() !== '' &&
    hospitalType.value.trim() !== ''
  );
});

const handleNextButtonClick = () => {
  if (isFormValid.value) {
    router.push('/login/doctor/license');
  }
};
</script>

<template>
  <HeadBar :back-button="true">회원가입</HeadBar>
  <Main :headbar="true" :navbar="false" :padded="true" :bg-gray="false">
    <div class="login-doctor">의사 정보를 <br />입력해주세요</div>

    <div class="doctor-container">
      <div class="input-group">
        <Label for="hospital-name">병원명</Label>
        <Input
          type="text"
          id="hospital-name"
          v-model="hospitalName"
          placeholder="병원명 입력"
        ></Input>
      </div>

      <div class="input-group">
        <Label>병원 주소</Label>
        <div class="hospital-container">
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
          id="hospital-address"
          v-model="detailAddress"
          placeholder="(상세주소)"
        ></Input>
      </div>

      <div class="input-group">
        <Label for="hospital-type">병원 분류</Label>
        <Input
          type="text"
          id="hospital-type"
          v-model="hospitalType"
          placeholder="병원 분류 입력"
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

.hospital-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.next-button {
  left: 5.13%;
  right: 5.13%;
  bottom: 80px;
  position: absolute;
}
</style>
