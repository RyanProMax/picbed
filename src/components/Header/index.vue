<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
import SvgIcon from '../SvgIcon/index.vue';

const isDark = useDark();
const toggleDark = useToggle(isDark);

</script>

<template>
  <div class="inline-flex">
    <SvgIcon v-show="!isDark" name="sun" w:cursor="pointer" @click="toggleDark()" />
    <SvgIcon v-show="isDark" name="moon" w:cursor="pointer" @click="toggleDark()" />
    <a href="https://github.com/RyanProMax/vue-vite-starter" target="__blank">
      <SvgIcon name="github" w:cursor="pointer" w:m="l-4" />
    </a>
  </div>
</template>
