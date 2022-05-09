<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
import { useRoute, useRouter } from 'vue-router';
import SvgIcon from './SvgIcon.vue';

const isDark = useDark();
const toggleDark = useToggle(isDark);

const route = useRoute();
const router = useRouter();

const handleNavigate = (path: string) => route.path !== path && (router.push(path));
</script>

<template>
  <div class="inline-flex">
    <SvgIcon name="view" w:cursor="pointer" w:m="r-4" @click="handleNavigate('/')" />
    <SvgIcon name="config" w:cursor="pointer" w:m="r-4" @click="handleNavigate('/config')" />
    <SvgIcon v-show="!isDark" name="sun" w:cursor="pointer" @click="toggleDark()" />
    <SvgIcon v-show="isDark" name="moon" w:cursor="pointer" @click="toggleDark()" />
    <a href="https://github.com/RyanProMax/picbed" target="__blank">
      <SvgIcon name="github" w:cursor="pointer" w:m="l-4" />
    </a>
  </div>
</template>
