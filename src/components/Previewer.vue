<script setup lang="ts">
import { ref } from 'vue';
const { urlList, onClose } = defineProps<{
  urlList: string[]
  onClose: () => void
}>();

const currIndex = ref(0);
</script>

<template>
  <div v-if="Boolean(urlList.length)" class="picbed-previewer" @click="onClose()">
    <div class="picbed-previewer__main" w:p="48px <md:24px" w:m="<md:100px 50px" @click.stop="">
      <img :src="urlList[currIndex]" class="picbed-previewer__image">
      <div w:m="t-48px <md:t-24px" w:max-w="full">
        <p w:text="break-all gray-500">
          url: {{ urlList[currIndex] }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.picbed-previewer {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.75);

  &__main {
    width: 80vw;
    max-width: 520px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__image {
    width: 100%;
    max-height: 360px;
    object-fit: cover;
  }
}
</style>
