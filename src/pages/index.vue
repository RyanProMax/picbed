<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
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
  }
  catch (e) {
    console.log(e.message);
  }
});
</script>

<template>
  <div w:w="full" w:max-w="900px" w:m="t-30px" w:grid="~ cols-4 <md:cols-2 <lg:cols-3 gap-4 auto-rows-auto" w:overflow="hidden">
    <img v-for="item in list" :key="item.name" :src="item.download_url" w:cursor="pointer">
  </div>
</template>
