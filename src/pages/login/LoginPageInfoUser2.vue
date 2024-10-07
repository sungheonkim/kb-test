<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import HeadBar from '@/components/HeadBar.vue';
import Main from '@/components/Main.vue';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

const router = useRouter();
const route = useRoute();

const bankName = ref('');
const bankImg = ref('');

onMounted(() => {
  bankName.value = (route.query.bankName as string) || '';
  bankImg.value = (route.query.bankImg as string) || '';
});

const accountNumber = ref('');
const accountPassword = ref('');
const allTermsChecked = ref(false);
const serviceTerms = ref(false);
const privacyTerms = ref(false);
const marketingTerms = ref(false);

const isFormValid = computed(
  () =>
    accountNumber.value !== '' &&
    accountPassword.value.length === 4 &&
    serviceTerms.value &&
    privacyTerms.value
);

const handleAllTermsChange = (checked: boolean) => {
  allTermsChecked.value = checked;
  serviceTerms.value = checked;
  privacyTerms.value = checked;
  marketingTerms.value = checked;
};

const handleIndividualTermChange = () => {
  allTermsChecked.value = serviceTerms.value && privacyTerms.value && marketingTerms.value;
};

const handlePasswordInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  input.value = input.value.replace(/\D/g, '').slice(0, 4);
  accountPassword.value = input.value;
};

const handleNextClick = () => {
  if (isFormValid.value) {
    router.push('/success');
  }
};
</script>

<template>
  <HeadBar :back-button="true">회원가입</HeadBar>
  <Main :headbar="true" :navbar="false" :padded="true" :bg-gray="false">
    <div class="bank-name">
      <img :src="bankImg" class="bank-icon" />
      <div>{{ bankName }}</div>
    </div>

    <div class="bank-container">
      <div class="bank-info-container">
        <Label for="bank-id-input">계좌 번호</Label>
        <Input
          type="text"
          inputmode="numeric"
          id="bank-id-input"
          v-model="accountNumber"
          placeholder="계좌번호를 입력해주세요."
        />
      </div>

      <div class="bank-info-container">
        <Label for="bank-password-input">계좌 비밀번호</Label>
        <Input
          type="password"
          inputmode="numeric"
          id="bank-password-input"
          v-model="accountPassword"
          @input="handlePasswordInput"
          placeholder="(4자리)"
          maxlength="4"
        />
      </div>

      <div class="terms-container">
        <div class="flex items-center space-x-2">
          <Checkbox
            id="all-terms"
            v-model:checked="allTermsChecked"
            @update:checked="handleAllTermsChange"
          />
          <label
            for="all-terms"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            <div class="term-info">전체 이용 약관 동의</div>
          </label>
        </div>
        <div class="divider"></div>

        <div class="flex items-center space-x-2">
          <Checkbox
            id="service-terms"
            v-model:checked="serviceTerms"
            @update:checked="handleIndividualTermChange"
          />
          <label
            for="service-terms"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            <div class="term-info">[필수] 서비스 이용 약관</div>
          </label>
        </div>

        <div class="flex items-center space-x-2">
          <Checkbox
            id="privacy-terms"
            v-model:checked="privacyTerms"
            @update:checked="handleIndividualTermChange"
          />
          <label
            for="privacy-terms"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            <div class="term-info">[필수] 개인정보 수집 및 이용약관</div>
          </label>
        </div>

        <div class="flex items-center space-x-2">
          <Checkbox
            id="marketing-terms"
            v-model:checked="marketingTerms"
            @update:checked="handleIndividualTermChange"
          />
          <label
            for="marketing-terms"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            <div class="term-info">[선택] E-mail 및 SMS 광고성 정보 수신 동의</div>
          </label>
        </div>
      </div>
    </div>

    <Button class="next-button" variant="default" :disabled="!isFormValid" @click="handleNextClick">
      다음
    </Button>
  </Main>
</template>

<style scoped>
.bank-name {
  display: flex;
  justify-content: left;
  align-items: end;
  font-size: 28px;
  font-weight: 600;
  margin-top: 60px;
  margin-bottom: 40px;
  margin-left: 20px;
  gap: 16px;
}

.bank-icon {
  width: 92px;
  height: 92px;
  border-radius: 50%;
  border: 1px solid var(--gray);
}

.bank-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  margin-left: 20px;
  margin-right: 20px;
}

.bank-info-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 60px;
}

.terms-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.term-info {
  font-weight: 600;
  font-size: 14px;
}

.divider {
  height: 1px;
  background-color: #e5e7eb;
  margin: 8px 0;
}

.next-button {
  left: 5.13%;
  right: 5.13%;
  bottom: 80px;
  position: absolute;
}
</style>
