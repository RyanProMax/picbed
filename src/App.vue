<script setup lang="ts">
import Header from '~/components/Header.vue';
</script>

<template>
  <main w:p="x-20px y-30px" w:flex="~ col" w:align="items-center" w:font="sans thin" w:text="dark:gray-300">
    <Header />
    <router-view />
  </main>
</template>
