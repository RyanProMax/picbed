<script setup lang="ts">
import { useRouter } from 'vue-router';
import { checkUserConfig, getUserConfig } from '~/utils';
const router = useRouter();

const userConfig = getUserConfig();
if (!checkUserConfig(userConfig))
  router.replace('/config');
</script>

<template>
  首页
</template>
