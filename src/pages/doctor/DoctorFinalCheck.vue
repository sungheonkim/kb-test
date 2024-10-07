<script setup lang="ts">
import HeadBar from '@/components/HeadBar.vue';
import Main from '@/components/Main.vue';
import ShadowBox from '@/components/ShadowBox.vue';
import { Button } from '@/components/ui/button';
</script>

<template>
  <HeadBar :back-button="true">처방전 보내기</HeadBar>
  <Main :headbar="true" :navbar="false" :padded="true" :bg-gray="true">
    <ShadowBox :padding-x="20" :padding-y="20" class="prescription-container">
      <div class="prescription-title">처방전</div>
      <div>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus molestiae cum fugiat
        consectetur sit provident corrupti saepe harum itaque, officiis illum odio asperiores soluta
        nesciunt debitis consequatur exercitationem eos nobis.
      </div>
    </ShadowBox>

    <Button size="lg">처방전 보내기</Button>
  </Main>
</template>

<style scoped>
.prescription-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  gap: 12px;
}

.prescription-title {
  font-size: 24px;
  font-weight: 600;
}
</style>
