<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElButton, ElMessage, ElMessageBox } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import { useFileSystemAccess } from '@vueuse/core';
import { checkUserConfig, fetchRepoFiles, fetchUploadFile, getUserConfig } from '~/utils';

const router = useRouter();
const userConfig = getUserConfig();

const loading = ref<boolean>(false);
const list = ref<any>([]);

const fetchList = async() => {
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
};

const { open, file } = useFileSystemAccess({
  dataType: 'Blob',
  types: [{
    description: 'image',
    accept: {
      'image/*': ['.png', '.gif', '.jpeg', '.jpg']
    }
  }],
  excludeAcceptAllOption: true
});

const confirmUpload = async(file: File, sha?: string) => {
  await fetchUploadFile(file, userConfig, sha);
  await fetchList();
};

const handleUpload = async() => {
  loading.value = true;
  await open();
  const existFile = list.value.find((x: any) => x.name === file.value!.name);
  if (existFile) {
    ElMessageBox.confirm(
      '已有同名文件，是否覆盖？',
      '提示',
      {
        confirmButtonText: '确认覆盖',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
      .then(() => {
        confirmUpload(file.value!, existFile.sha);
      });
  }
  else {
    await confirmUpload(file.value!);
  }
};

onBeforeMount(() => {
  fetchList();
});
</script>

<template>
  <div v-loading="loading">
    <div
      w:w="full" w:max-w="900px" w:min-h="480px" w:m="t-30px"
      w:grid="~ cols-4 <md:cols-2 <lg:cols-3 gap-4 auto-rows-auto" w:overflow="hidden"
    >
      <img v-for="item in list" :key="item.name" :src="`${item.download_url}?t=${Date.now()}`" w:cursor="pointer">
    </div>
    <ElButton :icon="Plus" circle type="danger" w:pos="fixed right-8 bottom-8" @click="handleUpload" />
  </div>
</template>
