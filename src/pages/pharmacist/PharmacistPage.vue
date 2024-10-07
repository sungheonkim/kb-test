<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import HeadBar from '@/components/HeadBar.vue';
import Main from '@/components/Main.vue';
import ShadowBox from '@/components/ShadowBox.vue';
import Button from '@/components/ui/button/Button.vue';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { QrcodeStream } from 'vue-qrcode-reader';

const router = useRouter();
const isDialogOpen = ref(false);

function onDetect(detectedCodes: Array<{ rawValue: string }>) {
  const prescriptionId = detectedCodes[0]?.rawValue || 'default';
  isDialogOpen.value = false;
  router.push({
    name: '/pharmacistPayment',
    params: { id: prescriptionId }
  });
}

const error = ref('');

function onError(err: Error) {
  error.value = `오류: ${err.message}`;
}
</script>

<template>
  <HeadBar :back-button="false">약사 페이지</HeadBar>
  <Main :headbar="true" :navbar="false" :padded="true" :bg-gray="true">
    <div class="pharmacist-container">
      <Dialog v-model:open="isDialogOpen">
        <DialogTrigger asChild>
          <Button class="qr-camera">
            <div class="qr-icon-container">
              <i class="fa-solid fa-qrcode"></i>
            </div>
            <div class="qr-text">
              <span class="qr-title">처방전 불러오기</span>
              <span class="qr-subtitle">QR 코드를 스캔하세요</span>
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>QR 코드 스캔</DialogTitle>
            <DialogDescription>처방전 QR 코드를 스캔해주세요.</DialogDescription>
          </DialogHeader>
          <QrcodeStream @detect="onDetect" @error="onError" />
          <p v-if="error">{{ error }}</p>
        </DialogContent>
      </Dialog>

      <ShadowBox :padding-x="20" :padding-y="20" :margin-bottom="0">
        <div class="recent-list-title">
          <div>최근 처방전 내역</div>
        </div>

        <div class="divider"></div>

        <div class="recent-list">
          <div class="recent-item">
            <div class="recent-info">
              <div class="recent-group">
                <i class="fa-regular fa-file"></i>
                <div class="recent-name">한상민 환자님</div>
              </div>
              <div class="recent-date">24. 09. 10 | 오후 4:18</div>
            </div>
            <div class="recent-status">
              <i class="fa-solid fa-chevron-right"></i>
              <span class="status-text">결제 완료</span>
            </div>
          </div>

          <div class="recent-item">
            <div class="recent-info">
              <div class="recent-group">
                <i class="fa-regular fa-file"></i>
                <div class="recent-name">문환희 환자님</div>
              </div>
              <div class="recent-date">24. 09. 09 | 오전 11:30</div>
            </div>
            <div class="recent-status">
              <i class="fa-solid fa-chevron-right"></i>
              <span class="status-text">결제 완료</span>
            </div>
          </div>

          <div class="recent-item">
            <div class="recent-info">
              <div class="recent-group">
                <i class="fa-regular fa-file"></i>
                <div class="recent-name">김도은 환자님</div>
              </div>
              <div class="recent-date">24. 09. 09 | 오전 11:30</div>
            </div>
            <div class="recent-status">
              <i class="fa-solid fa-chevron-right"></i>
              <span class="status-text">결제 완료</span>
            </div>
          </div>
        </div>
      </ShadowBox>
    </div>
  </Main>
</template>

<style scoped>
.pharmacist-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
}

.qr-camera {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 160px;
  height: 140px;
  background: var(--css-primary);
  /* background: linear-gradient(135deg, var(--kb-yellow) 0%, var(--nav-gray)); */
  border-radius: 12px;
  margin-bottom: 20px;
}

.qr-icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: var(--css-secondary);
  border-radius: 50%;
  margin-bottom: 20px;
}

.qr-icon-container i {
  font-size: 24px;
  color: var(black);
}

.qr-text {
  display: flex;
  flex-direction: column;
  color: var(black);
}

.qr-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
}

.qr-subtitle {
  font-size: 14px;
  opacity: 0.8;
}

.recent-list-title {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 18px;
}

.divider {
  height: 1px;
  background-color: var(--dark-gray);
  margin-bottom: 16px;
}

.recent-list {
  display: flex;
  flex-direction: column;
}

.recent-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.recent-item:last-child {
  margin-bottom: 0;
}

.recent-info {
  display: flex;
  flex-direction: column;
}

.recent-group {
  display: flex;
  align-items: center;
  gap: 6px;
}

.recent-name {
  font-size: 16px;
}

.recent-date {
  font-size: 14px;
  color: var(--dark-gray);
  margin-top: 4px;
  margin-left: 12px;
}

.recent-status {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
}

.status-text {
  font-size: 14px;
  color: var(--kb-yellow);
}
</style>
