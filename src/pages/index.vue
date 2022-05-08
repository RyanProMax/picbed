<script setup lang="ts">
import { ref } from 'vue';
import Input from '~/components/Input.vue';

const name = ref('');

const handleSave = () => { };
</script>

<template>
  <p w:m="t-25px" w:text="xl">
    请先完成基本配置 ⚙
  </p>
  <p w:m="t-10px" w:text="sm gray-400 center" w:font="italic">
    ⚠ 配置存储于本地localStorage，无后台。
  </p>

  <Input v-model="name" placeholder="Input your github account" />
  <Input v-model="name" placeholder="Input your github repo" />
  <Input v-model="name" placeholder="Input your personal access token" />

  <button w:m="t-20px" class="btn btn-red" @click="handleSave()">
    Save
  </button>
</template>
