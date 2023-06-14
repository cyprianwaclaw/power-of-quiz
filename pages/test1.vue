<template>
  <div>
    <select11 :array="options" :name="name" v-model="selectedOption" :defaultOption="defaultOption" @selectedOption="handleSelectedOption" header="chuj"></select11>
    <p>Zaznaczona opcja: {{ selectedOption }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const options = [
  { label: 'Opcja 1', value: 'option1' },
  { label: 'Opcja 2', value: 'option2' },
  { label: 'Opcja 3', value: 'option3' },
];
const name = 'Wybierz opcję';
const selectedOption = ref('');
const defaultOption = 'option2'; // Przykładowa wartość domyślnie zaznaczonej opcji

function handleSelectedOption(newValue:any) {
  selectedOption.value = newValue;
}
</script>

<style scoped lang="scss">
// Style definitions
</style>
