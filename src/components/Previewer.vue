<script setup lang="ts">
import { ElImageViewer } from 'element-plus';
const { urlList, onClose } = defineProps<{
  urlList: string[]
  onClose: () => void
}>();
</script>

<template>
  <ElImageViewer v-if="Boolean(urlList.length)" :url-list="urlList" @close="onClose()" />
</template>
