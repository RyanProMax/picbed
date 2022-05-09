<script setup lang="ts">
import { watch } from 'vue';
import Input from '~/components/Input.vue';
import { getUserConfig } from '~/utils';

const { ACCOUNT, REPO, PATH, TOKEN } = getUserConfig();

watch(PATH, (value) => {
  if (!value)
    PATH.value = '/';
});

</script>

<template>
  <p w:m="t-25px" w:text="xl">
    ⚙ Github 图床配置
  </p>
  <p w:m="t-10px" w:text="sm gray-400 center" w:font="italic">
    ✔ 数据存储于本地localStorage，无后台
  </p>

  <Input v-model="ACCOUNT" label="account" w:m="t-50px" placeholder="Input your github account" />
  <Input v-model="REPO" label="github repo" w:m="t-20px" placeholder="Input your github repo" />
  <Input v-model="PATH" label="repo path" w:m="t-20px" placeholder="Input your repo path" />
  <Input v-model="TOKEN" label="personal access token" w:m="t-20px" placeholder="Input your personal access token" type="password" />

  <!-- <button w:m="t-20px" class="btn btn-red" @click="handleSave()">
    Save
  </button> -->
</template>
