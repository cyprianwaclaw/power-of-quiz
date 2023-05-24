<template>
    <div>
      <div>
        <h2>Group 1</h2>
        <label v-for="(input, index) in inputs1" :key="'group1-' + index">
          <input type="checkbox" :id="'input1-' + index" v-model="input.value" @change="handleInputChange(index, 1)">
          <label :for="'input1-' + index">{{ input.label }}</label>
        </label>
      </div>
      <div>
        <h2>Group 2</h2>
        <label v-for="(input, index) in inputs2" :key="'group2-' + index">
          <input type="checkbox" :id="'input2-' + index" v-model="input.value" @change="handleInputChange(index, 2)">
          <label :for="'input2-' + index">{{ input.label }}</label>
        </label>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  interface Input {
    label: string;
    value: boolean;
  }
  
  const inputs = ref<Input[]>([
    { label: 'Input 1', value: false },
    { label: 'Input 2', value: false },
    { label: 'Input 3', value: false },
    { label: 'Input 4', value: false },
    { label: 'Input 5', value: false },
    { label: 'Input 6', value: false },
    { label: 'Input 7', value: false },
    { label: 'Input 8', value: false },
  ]);
  
  const inputs1 = ref<Input[]>(inputs.value.slice(0, 4));
  const inputs2 = ref<Input[]>(inputs.value.slice(4));
  
  function handleInputChange(changedIndex: number, group: number) {
    // Reset values of all checkboxes in the same group, except for the one that was changed
    const inputsToCheck = group === 1 ? inputs1.value : inputs2.value;
    inputsToCheck.forEach((input, index) => {
      if (index !== changedIndex) {
        input.value = false;
      }
    });
  }
  </script>
  