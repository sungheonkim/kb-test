<script setup lang="ts">
import { ref } from 'vue';
import { useFaceIdStore } from '@/stores/faceId';
import HeadBar from '@/components/HeadBar.vue';
import NavBar from '@/components/NavBar.vue';
import Main from '@/components/Main.vue';
import html2canvas from 'html2canvas';
import { Toaster, toast } from '@steveyuowo/vue-hot-toast';
import '@/assets/toast.css';
import {
  Dialog,
  // DialogHeader,
  // DialogDescription,
  // DialogTitle,
  DialogContent,
  DialogFooter,
  DialogClose,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

const faceIdStore = useFaceIdStore();
const userName = ref('임시');

faceIdStore.isAuthenticated = false;
const handleFaceIdAuth = () => {
  faceIdStore.authenticate(userName.value);
};

const prescDetail = [
  {
    key: '병원명',
    value: '김성현내과의원'
  },
  {
    key: '의사명',
    value: '김성현'
  },
  {
    key: '약국명',
    value: '무슨무슨약국'
  },
  {
    key: '약사명',
    value: '임준수'
  },
  {
    key: '작성일',
    value: '2024. 09. 13'
  },
  {
    key: '처방약',
    value: '3개'
  }
];

const claimRequested = ref(false);
const medicineReceived = ref(false);

const handleClaim = () => {
  if (claimRequested.value) return;
  toast.success('청구 신청이 완료되었습니다');
  claimRequested.value = true;
};

const handleReceived = () => {
  if (medicineReceived.value) return;
  toast.success('약을 수령했습니다');
  medicineReceived.value = true;
};

const saveAsImage = async (item: string) => {
  const carouselItem = document.querySelector(`.${item}`) as HTMLElement;
  if (carouselItem) {
    try {
      // Capture the original content
      const originalCanvas = await html2canvas(carouselItem, { scale: 5 });
      // Create a new canvas with extra space for margins
      const margin = 80; // 50px margin on each side
      const newWidth = originalCanvas.width + margin * 2;
      const newHeight = originalCanvas.height + margin * 2;
      const newCanvas = document.createElement('canvas');
      const fileName = item == 'presc-frame' ? 'prescription' : 'receipt';
      newCanvas.width = newWidth;
      newCanvas.height = newHeight;
      // Get the context of the new canvas
      const ctx = newCanvas.getContext('2d');
      if (ctx) {
        // Fill the entire canvas with a white background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, newWidth, newHeight);
        // Draw the original canvas onto the new canvas with margins
        ctx.drawImage(originalCanvas, margin, margin);
        // Convert the new canvas to an image and trigger download
        const image = newCanvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = `${fileName}.png`;
        link.click();
      }
    } catch (error) {
      console.error('이미지 저장 중 오류 발생:', error);
    }
  }
};
</script>

<template>
  <HeadBar :back-button="true">상세보기</HeadBar>
  <NavBar />
  <Toaster />
  <Main :headbar="true" :navbar="true" :padded="true">
    <div class="misc-func-frame">
      <div class="misc-func-container">
        <div class="misc-func-left">
          <div class="icon-frame">
            <!-- 아이콘 -->
          </div>
          <div class="misc-info-text">
            <span class="misc-info-title">보험금 간편 청구</span>
            <span class="misc-info-desc">{서비스명}이 복잡한 과정을 대신 해드려요</span>
          </div>
        </div>
        <Button @click="handleClaim()" :variant="claimRequested ? 'destructive' : 'default'">{{
          claimRequested ? '완료' : '신청'
        }}</Button>
      </div>
      <div class="misc-func-container">
        <div class="misc-func-left">
          <div class="icon-frame">
            <!-- 아이콘 -->
          </div>
          <div class="misc-info-text">
            <span class="misc-info-title">약 수령 확인</span>
            <span class="misc-info-desc">{서비스명}을 사용하지 않았어도 바꿀 수 있어요</span>
          </div>
        </div>
        <Button @click="handleReceived()" :variant="medicineReceived ? 'destructive' : 'default'">{{
          medicineReceived ? '완료' : '신청'
        }}</Button>
      </div>
    </div>
    <div class="presc-title">처방전 상세</div>
    <div class="detail-frame">
      <div class="detail-container" v-for="info in prescDetail" :key="info.key">
        <span>{{ info.key }}</span>
        <div v-if="info.key != '처방약'">
          {{ info.value }}
        </div>
        <Popover v-else>
          <PopoverTrigger>
            <Button variant="outline">3개</Button>
          </PopoverTrigger>
          <PopoverContent class="me-4 flex flex-col gap-2 text-sm text-cssblack">
            <div>약이름 1</div>
            <div>약이름 2</div>
            <div>약이름 3</div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
    <div class="seperator"></div>
    <Dialog>
      <DialogTrigger class="docu-button" @click="handleFaceIdAuth">
        <span>처방전 보기</span>
        <i class="fa-solid fa-chevron-right"></i>
      </DialogTrigger>
      <DialogContent>
        <div v-if="faceIdStore.isAuthenticated" class="presc-frame">
          <div class="text-right px-1 mt-1">(환자보관용)</div>
          <div class="presc-header">처&nbsp;&nbsp;&nbsp; 방&nbsp;&nbsp;&nbsp; 전</div>
          <div class="flex justify-between px-1 mb-1">
            <div>보험유형 : 건강보험</div>
            <div>요양기관번호 : 1238861</div>
          </div>
          <table>
            <thead>
              <tr>
                <th colspan="2" rowspan="2">교부번호</th>
                <th colspan="2" rowspan="2">2024년 09월 24일<br />제 00001 호</th>
                <th rowspan="4">의료기관</th>
                <th>명칭</th>
                <th>김성헌내과의원</th>
              </tr>
              <tr>
                <th>전화번호</th>
                <th>02-1234-5678</th>
              </tr>
              <tr>
                <th rowspan="2">환자</th>
                <th>성명</th>
                <th colspan="2">임준수</th>
                <th>팩스번호</th>
                <th>02-1234-5679</th>
              </tr>
              <tr>
                <th>주민등록번호</th>
                <th colspan="2">960816-1******</th>
                <th>e-mail주소</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowspan="2">질병<br />분류<br />기호</td>
                <td rowspan="2">A049</td>
                <td rowspan="2">처방<br />의료인의<br />성명</td>
                <td rowspan="2">김성헌</td>
                <td colspan="2">면허종별</td>
                <td>의사</td>
              </tr>
              <tr>
                <td colspan="2">면허번호</td>
                <td>제 12345 호</td>
              </tr>
              <tr>
                <td colspan="7" class="left">
                  * 환자의 요구가 있는 때에는 질병분류기호를 기재하지 아니합니다.
                </td>
              </tr>
            </tbody>
          </table>

          <table class="presc-pill-list">
            <thead class="bg-blue-100">
              <tr>
                <th colspan="2">처 방 의 약 품 의 명 칭</th>
                <th>1회<br />투여량</th>
                <th>1회<br />투여횟수</th>
                <th>투약<br />일수</th>
                <th colspan="2">용 법</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="2" class="left">프레드포로트점안액(외용)</td>
                <td>1</td>
                <td>6</td>
                <td>1</td>
                <td colspan="2" class="left">2시간마다</td>
              </tr>
              <tr>
                <td colspan="2" class="left">파오시드정 20mb(내복)</td>
                <td>1</td>
                <td>3</td>
                <td>2</td>
                <td colspan="2" class="left">식후30분</td>
              </tr>
              <tr>
                <td colspan="2" class="left">슬로젠정(내복)</td>
                <td>2</td>
                <td>3</td>
                <td>2</td>
                <td colspan="2" class="left">식후30분</td>
              </tr>
              <tr>
                <td colspan="2"></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colspan="2"></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colspan="2"></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colspan="2"></td>
                <td></td>
                <td></td>
                <td></td>
                <td colspan="2">조 제 시 참 고 사 항</td>
              </tr>
              <tr>
                <td colspan="5">주사제 처방내역 (원내조제 , 원외처방)</td>
                <td colspan="2"></td>
              </tr>
              <tr>
                <td colspan="2"></td>
                <td></td>
                <td></td>
                <td></td>
                <td colspan="2"></td>
              </tr>
              <tr>
                <td colspan="2"></td>
                <td></td>
                <td></td>
                <td></td>
                <td colspan="2"></td>
              </tr>
            </tbody>
          </table>
          <table class="no-border-top">
            <thead>
              <tr>
                <td>사용기간</td>
                <td colspan="5">교부일로부터 ( &nbsp;&nbsp;3&nbsp;&nbsp; )일간</td>
                <td colspan="5">*사용기간내에 약국에 제출하여야 합니다.</td>
              </tr>
            </thead>
          </table>

          <table style="border-bottom: none">
            <thead class="bg-blue-100">
              <tr>
                <th colspan="12">의 약 품&nbsp;&nbsp;조 제 내 역</th>
              </tr>
            </thead>
            <tbody class="presc-medicine-table">
              <tr>
                <td rowspan="4" class="no-border-bottom">조<br />제<br />내<br />역</td>
                <td colspan="2">조제기관의명칭</td>
                <td colspan="5"></td>
                <td colspan="4" rowspan="2">처방전의 변경, 수정, 확인<br />대체 시 그 내용 등</td>
              </tr>
              <tr>
                <td colspan="2">조제약사</td>
                <td>성명</td>
                <td colspan="4" style="border-right: 0.8px solid var(--blue)">
                  &nbsp;임준수 &nbsp;&nbsp;&nbsp;(서명 또는 날인)
                </td>
              </tr>
              <tr>
                <td colspan="2">조제량</td>
                <td colspan="5"></td>
                <td colspan="4" rowspan="2" class="no-border-bottom"></td>
              </tr>
              <tr>
                <td colspan="2" class="no-border-bottom">조제년월일</td>
                <td
                  colspan="5"
                  class="no-border-bottom"
                  style="border-right: 0.8px solid var(--blue)"
                ></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="text-center mt-4">본인인증을 완료해주세요</div>
        <DialogFooter class="modal-footer">
          <Button v-if="faceIdStore.isAuthenticated" size="lg" @click="saveAsImage('presc-frame')"
            >이미지로 저장</Button
          >
          <DialogClose>
            <Button variant="destructive" size="lg">닫기</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <Dialog>
      <DialogTrigger class="docu-button">
        <span>전자영수증 보기</span>
        <i class="fa-solid fa-chevron-right"></i>
      </DialogTrigger>
      <DialogContent>
        <Carousel>
          <CarouselContent class="carousel-frame">
            <CarouselItem class="carousel-item">
              <div class="receipt-frame">
                <div class="receipt-store">김성헌내과의원</div>
                <div>
                  <span class="receipt-price">10,000</span>
                  <span class="won">원</span>
                </div>
              </div>
              <div class="receipt-top">
                <div class="receipt-info-line">
                  <div class="receipt-info-left">승인일시</div>
                  <div>2024-09-23 11:19</div>
                </div>
                <div class="receipt-info-line">
                  <div class="receipt-info-left">거래유형</div>
                  <div>승인</div>
                </div>
                <div class="receipt-info-line">
                  <div class="receipt-info-left">할부</div>
                  <div>일시불</div>
                </div>
              </div>
              <div class="receipt-top dotted-top">
                <div class="receipt-info-line">
                  <div class="receipt-info-left">공급가액</div>
                  <div>9,091원</div>
                </div>
                <div class="receipt-info-line">
                  <div class="receipt-info-left">부가세</div>
                  <div>909원</div>
                </div>
              </div>
              <div class="receipt-top dotted-top" style="margin-bottom: 18px">
                <div class="receipt-info-line">
                  <div class="receipt-info-left">가맹점명</div>
                  <div>김성헌내과의원</div>
                </div>
                <div class="receipt-info-line">
                  <div class="receipt-info-left">사업자번호</div>
                  <div>123-456-7890</div>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div class="receipt-frame">
                <div class="receipt-store">김성헌약국</div>
                <div>
                  <span class="receipt-price">10,000</span>
                  <span class="won">원</span>
                </div>
              </div>
              <div class="receipt-top">
                <div class="receipt-info-line">
                  <div class="receipt-info-left">승인일시</div>
                  <div>2024-09-23 11:19</div>
                </div>
                <div class="receipt-info-line">
                  <div class="receipt-info-left">거래유형</div>
                  <div>승인</div>
                </div>
                <div class="receipt-info-line">
                  <div class="receipt-info-left">할부</div>
                  <div>일시불</div>
                </div>
              </div>
              <div class="receipt-top dotted-top">
                <div class="receipt-info-line">
                  <div class="receipt-info-left">공급가액</div>
                  <div>9,091원</div>
                </div>
                <div class="receipt-info-line">
                  <div class="receipt-info-left">부가세</div>
                  <div>909원</div>
                </div>
              </div>
              <div class="receipt-top dotted-top" style="margin-bottom: 18px">
                <div class="receipt-info-line">
                  <div class="receipt-info-left">가맹점명</div>
                  <div>김성헌약국</div>
                </div>
                <div class="receipt-info-line">
                  <div class="receipt-info-left">사업자번호</div>
                  <div>123-456-7890</div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <DialogFooter class="modal-footer">
          <Button size="lg" @click="saveAsImage('carousel-item')">이미지로 저장</Button>
          <DialogClose>
            <Button variant="destructive" size="lg">닫기</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <div class="h-6"></div>
  </Main>
</template>

<style scoped>
@font-face {
  font-family: 'YESMyoungjo-Regular';
  src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_13@1.0/YESMyoungjo-Regular.woff')
    format('woff');
  font-weight: normal;
  font-style: normal;
}
.misc-func-frame {
  margin-top: 24px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.misc-func-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.misc-func-left {
  display: flex;
  align-items: center;
  gap: 8px;
}
.icon-frame {
  width: 44px;
  height: 44px;
  border-radius: 6px;
  background-color: var(--gray);
  display: flex;
  justify-content: center;
  align-items: center;
}
.misc-info-text {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.misc-info-title {
  font-size: 16px;
  font-weight: 550;
}
.misc-info-desc {
  font-size: 12px;
  color: var(--dark-gray);
}
.presc-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
}
.detail-frame {
  display: flex;
  flex-direction: column;
  gap: 28px;
  margin-bottom: 32px;
}
.detail-container {
  display: flex;
  justify-content: space-between;
  div {
    font-size: 16px;
    color: var(--dark-gray);
    display: flex;
    align-items: center;
    gap: 6px;
  }
  span {
    font-size: 18px;
    font-weight: 550;
  }
}
.seperator {
  width: 100%;
  height: 1px;
  border-bottom: 1px solid var(--gray);
  margin-bottom: 16px;
}
.docu-button-frame {
  width: 100%;
}
.docu-button {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 20px;
    font-weight: 600;
  }
}
.modal-footer {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.carousel-frame {
  display: flex;
  justify-content: center;
  width: calc(100% - 80px);
}
.receipt-frame {
  width: calc(100% - 32px);
  position: relative;
  margin-bottom: 32px;
  margin-top: 12px;
}
.receipt-store {
  font-size: 15px;
  font-weight: 550;
  margin-bottom: -5px;
}
.receipt-price {
  font-size: 28px;
  font-weight: 600;
}
.won {
  font-size: 18px;
  font-weight: 600;
  margin-left: 1.5px;
}
.receipt-top {
  width: calc(100% - 32px);
  border-top: 2px solid var(--black);
  padding: 20px 4px 16px 4px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.receipt-info-line {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  font-size: 15px;
}
.receipt-info-left {
  font-weight: 400;
  font-size: 14px;
  color: var(--dark-gray);
}
.dotted-top {
  border-top: 2px dotted var(--dark-gray);
}
.presc-frame {
  margin-top: 16px;
  width: 100%;
  border: 2px solid var(--blue);
  * {
    font-family: 'YESMyoungjo-Regular';
    font-size: 8px;
    font-weight: 500;
  }
}
table {
  width: 100%;
  border-top: 1px solid var(--blue);
  border-bottom: 1px solid var(--blue);
  /* border: 1px solid var(--blue); */
}
th,
td {
  border-right: 0.8px solid var(--blue);
  border-bottom: 0.8px solid var(--blue);
}
th:last-child,
td:last-child {
  border-right: none;
}
tr:last-child td {
  border-bottom: none;
}
tr,
th,
td {
  text-align: center;
  white-space: nowrap;
}
th[rowspan] {
  z-index: 50;
  background-color: var(--white);
  position: relative;
}
td[rowspan] {
  z-index: 50;
  background-color: var(--white);
  position: relative;
}
.presc-header {
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  justify-content: center;
}
.left {
  text-align: left;
  padding-left: 6px;
}
.presc-pill-list {
  * {
    height: 16.5px;
  }
}
.no-border-top {
  border-top: none;
}
.no-border-bottom {
  border-bottom: none;
}
.no-border-right {
  border-right: none;
}

.medicine-detail {
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 8px;
  color: var(--dark-gray);
}
</style>
