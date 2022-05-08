<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';

const { name } = defineProps<{
  name: string
}>();

const icon = computed(() => defineAsyncComponent(() => import(`../../assets/svg/${name}.svg`)));
</script>

<template>
  <component
    :is="icon"
    w:fill="gray-500 hover:red-500 dark:gray-300 dark:hover:red-500"
    w:w="6" w:h="6"
    class="transition duration-250"
  />
</template>
