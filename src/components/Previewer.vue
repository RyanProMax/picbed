<script setup lang="ts">
import { computed, ref } from 'vue';
import { copyString } from '~/utils';

const { urlList, onClose } = defineProps<{
  urlList: any[]
  onClose: () => void
}>();

const currIndex = ref(0);
const currImage = computed(() => urlList[currIndex.value]);
</script>

<template>
  <div v-if="Boolean(urlList.length)" class="picbed-previewer" @click="onClose()">
    <div class="picbed-previewer__main" w:p="48px <md:24px" w:m="<md:100px 50px" @click.stop="">
      <img :src="urlList[currIndex].cdn_url" class="picbed-previewer__image">
      <div w:m="t-48px <md:t-24px" w:w="full">
        <el-input v-model="currImage.download_url" disabled w:w="full">
          <template #append>
            <el-button @click="copyString(currImage.download_url)">
              copy url
            </el-button>
          </template>
        </el-input>
        <el-input v-model="currImage.cdn_url" disabled class="picbed-previewer__url">
          <template #append>
            <el-button @click="copyString(currImage.cdn_url)">
              copy CDN url
            </el-button>
          </template>
        </el-input>
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

  &__url {
    margin-top: 24px;
  }
}
</style>
