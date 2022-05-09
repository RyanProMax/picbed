<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElButton, ElMessage } from 'element-plus';
import { checkUserConfig, fetchRepoFiles, getUserConfig } from '~/utils';

const router = useRouter();

const list = ref<any>([]);

onMounted(async() => {
  const userConfig = getUserConfig();

  if (!checkUserConfig(userConfig)) {
    router.replace('/config');
    return;
  }

  try {
    list.value = await fetchRepoFiles(userConfig);
    ElMessage({
      message: '请求异常',
      type: 'warning'
    });
  }
  catch (e: any) {
    ElMessage({
      message: e.message || '请求异常',
      type: 'warning'
    });
  }
});
</script>

<template>
  <div
    w:w="full" w:max-w="900px" w:m="t-30px" w:grid="~ cols-4 <md:cols-2 <lg:cols-3 gap-4 auto-rows-auto"
    w:overflow="hidden"
  >
    <img v-for="item in list" :key="item.name" :src="item.download_url" w:cursor="pointer">
    <ElButton>123</ElButton>
  </div>
</template>
