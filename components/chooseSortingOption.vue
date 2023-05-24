<template>
    <div>
      {{ selectedItems }}
      <div>
        <h2>Czas</h2>
        <div v-for="(option, index) in timeOptions" :key="index">
          <input type="checkbox" :checked="option.selected" @change="selectOption(index, 'time')">
          <label>{{ option.name }}</label>
        </div>
      </div>
      <div>
        <h2>Trudność</h2>
        <div v-for="(option, index) in difficultyOptions" :key="index">
          <input type="checkbox" :checked="option.selected" @change="selectOption(index, 'difficulty')">
          <label>{{ option.name }}</label>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  
  const data = ref([
    { name: "Czas rosnąco", value: "medium", selected: false, api: "sort[0]=time,desc", category: "time" },
    { name: "Czas malejąco", value: "medium", selected: false, api: "sort[0]=time,asc", category: "time" },
    { name: "Trudność łatwe", value: "easy", selected: false, des: "( łatwe, trudne )", category: "difficulty" },
    { name: "Trudność trudne", value: "hard", selected: false, des: "( trudne, łatwe )", category: "difficulty" },
  ]);
  
  const timeOptions = computed(() => {
    return data.value.filter(option => option.category === 'time');
  });
  
  const difficultyOptions = computed(() => {
    return data.value.filter(option => option.category === 'difficulty');
  });
  
  onMounted(() => {
    const selectedOptions = JSON.parse(localStorage.getItem('selectedOptions'));
    if (selectedOptions) {
      data.value.forEach((option, index) => {
        option.selected = selectedOptions[index];
      });
    }
  });
  
  function selectOption(index, category) {
    const categoryOptions = category === 'time' ? timeOptions : difficultyOptions;
    const selectedOption = categoryOptions.value[index];
    selectedOption.selected = !selectedOption.selected;
    
    // unselect all other options in the same category
    categoryOptions.value.forEach((option, i) => {
      if (i !== index) {
        option.selected = false;
      }
    });
    
    const selectedOptions = data.value.map(option => option.selected);
    localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
  }
  const selectedItems = computed(() => {
    return data.value.filter(item => item.selected);
  });
  
  watch(selectedItems, (newValue, oldValue) => {
    console.log(newValue);
  });
  </script>