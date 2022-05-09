<script setup lang="ts">
const { modelValue, label, type = 'text', placeholder = 'Please input' } = defineProps<{
  label: string
  modelValue: string
  type?: string
  placeholder: string
}>();

const emits = defineEmits(['update:modelValue']);

const handleInput = (event: Event) => emits('update:modelValue', (event.target as HTMLInputElement).value);
</script>

<template>
  <div w:flex="~ col">
    <label>{{ label }}:</label>
    <input
      :value="modelValue" :placeholder="placeholder" w:w="300px" w:m="t-2" class="input" :type="type"
      @input="handleInput"
    >
  </div>
</template>
