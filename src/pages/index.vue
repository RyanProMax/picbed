<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { checkUserConfig, fetchRepoFiles, getUserConfig } from '~/utils';

const router = useRouter();

const loading = ref<boolean>(false);
const list = ref<any>([]);

onMounted(async() => {
  const userConfig = getUserConfig();

  if (!checkUserConfig(userConfig)) {
    router.replace('/config');
    return;
  }

  try {
    loading.value = true;
    list.value = await fetchRepoFiles(userConfig);
    loading.value = false;
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
    v-loading="loading"
    w:w="full" w:max-w="900px" w:min-h="480px" w:m="t-30px" w:grid="~ cols-4 <md:cols-2 <lg:cols-3 gap-4 auto-rows-auto"
    w:overflow="hidden"
  >
    <img v-for="item in list" :key="item.name" :src="item.download_url" w:cursor="pointer">
  </div>
</template>
