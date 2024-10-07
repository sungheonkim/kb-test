<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { isSupported } from 'firebase/messaging';
import { app as firebaseApp, requestForToken, onMessageListener } from '../../firebase';
import HeadBar from '@/components/HeadBar.vue';
import NavBar from '@/components/NavBar.vue';
import Main from '@/components/Main.vue';
import ShadowBox from '@/components/ShadowBox.vue';
import { useMealTimeStore } from '@/stores/mealtime';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogClose,
  DialogTrigger
} from '@/components/ui/dialog';
import Button from '@/components/ui/button/Button.vue';
import TimeSelector from '@/components/TimeSelector.vue';
import axiosInstance from '@/api/instance'

const mealTimeStore = useMealTimeStore();

const breakfastTime = ref(mealTimeStore.breakfast);
const lunchTime = ref(mealTimeStore.lunch);
const dinnerTime = ref(mealTimeStore.dinner);

const fcmToken = ref<string | null>(null);

const updateMealTimes = () => {
  mealTimeStore.updateAllMealTimes({
    breakfast: breakfastTime.value,
    lunch: lunchTime.value,
    dinner: dinnerTime.value
  });
};

const requestNotificationPermission = async () => {
  try {
    const isFirebaseMessagingSupported = await isSupported();
    if (!isFirebaseMessagingSupported) {
      console.log('이 브라우저는 Firebase 클라우드 메시징을 지원하지 않습니다.');
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await requestForToken();
      if (token) {
        fcmToken.value = token;
        // console.log('FCM 토큰:', token);
        //  // 서버로 토큰 전송
        //  await fetch('http://localhost:8080/api/fcm/save/token?userId=1', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     fcmNo: token,
        //   }),
        // });
        // console.log('토큰이 서버로 전송되었습니다.');
        const patchToken = {
          fcmNo : token
        }
        try {
          const response = await axiosInstance.patch('api/fcm/save/token?userId=1', patchToken)
          console.log(response)
        } catch (err) {
          console.log(err)
        }
      }
    } else if (permission === 'denied') {
      console.log('알림 권한이 거부되었습니다. 브라우저 설정에서 권한을 허용해주세요.');
      // 사용자에게 브라우저 설정에서 권한을 허용하도록 안내하는 메시지를 표시
    } else {
      console.log('알림 권한 요청에 대한 응답을 받지 못했습니다.');
    }
  } catch (error) {
    console.error('알림 권한을 얻는데 실패했습니다:', error);
  }
};

</script>

<template>
  <HeadBar :bg-gray="true">마이페이지</HeadBar>
  <NavBar />
  <Main :headbar="true" :navbar="true" :bg-gray="true">
    <ShadowBox :padding-x="24" :padding-y="20" :radius="false">
      <div class="settings-title">내 계좌 정보</div>
      <div class="settings-frame">
        <div class="settings-row">
          <div class="settings-key">은행명</div>
          <div class="settings-value">국민은행</div>
        </div>
        <div class="settings-row">
          <div class="settings-key">계좌번호</div>
          <div class="settings-value">123-456-7890</div>
        </div>
        <div class="settings-row">
          <div class="settings-key">계좌수정</div>
          <i class="fa-solid fa-chevron-right"></i>
        </div>
      </div>
    </ShadowBox>
    <ShadowBox :padding-x="24" :padding-y="20" :radius="false">
      <div class="settings-title">복약 알림 설정</div>
      <div class="settings-frame">
        <div class="settings-row">
          <div class="settings-key">아침</div>
          <div class="settings-value">{{ mealTimeStore.breakfast }}</div>
        </div>
        <div class="settings-row">
          <div class="settings-key">점심</div>
          <div class="settings-value">{{ mealTimeStore.lunch }}</div>
        </div>
        <div class="settings-row">
          <div class="settings-key">저녁</div>
          <div class="settings-value">{{ mealTimeStore.dinner }}</div>
        </div>
        <Dialog>
          <DialogTrigger>
            <div class="settings-row">
              <div class="settings-key">복약 시간 수정</div>
              <i class="fa-solid fa-chevron-right"></i>
            </div>
          </DialogTrigger>
          <DialogContent>
            <TimeSelector title="아침" v-model="breakfastTime" />
            <TimeSelector title="점심" v-model="lunchTime" />
            <TimeSelector title="저녁" v-model="dinnerTime" />
            <DialogFooter class="modal-footer">
              <DialogClose>
                <Button size="lg" @click="updateMealTimes">저장</Button>
              </DialogClose>
              <DialogClose>
                <Button variant="destructive" size="lg">닫기</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ShadowBox>
    <ShadowBox :padding-x="24" :padding-y="20" :radius="false">
      <div class="settings-frame">
        <div class="settings-row">
          <div class="settings-key">알림 권한 설정</div>
          <Button @click="requestNotificationPermission">알림 권한 요청</Button>
        </div>
        <div class="settings-row">
          <div class="settings-key logout">로그아웃</div>
        </div>
        <div class="settings-row">
          <div class="settings-key">회원탈퇴</div>
        </div>
      </div>
    </ShadowBox>
  </Main>
</template>

<style scoped>
.settings-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 32px;
}

.settings-frame {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.settings-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.settings-key {
  font-size: 18px;
  font-weight: 600;
}

.settings-value {
  font-size: 16px;
  color: var(--dark-gray);
}

.logout {
  color: var(--red);
}

.modal-footer {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.modal-header {
  margin-bottom: 12px;
}

.input-frame {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}
</style>
