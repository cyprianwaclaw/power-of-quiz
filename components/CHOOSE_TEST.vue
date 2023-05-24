<template>
  <div>
    <div v-for="(option, index) in timeOptions" :key="index">
      <label class="flex w-full mt-2">
        <input
          class="w-5 flex mb-[4px]"
          type="checkbox"
          :checked="option.selected"
          @change="selectOption(index, 'time')"
        />
        <p class="ml-2">{{ option.name }}</p>
      </label>
    </div>
    <div v-for="(option, index) in difficultyOptions" :key="index">
      <label class="flex w-full mt-2">
        <input
          class="w-5 flex mb-[4px]"
          type="checkbox"
          :checked="option.selected"
          @change="selectOption(index, 'difficulty')"
        />
        <p class="ml-2">
          {{ option.name
          }}<span class="text-gray text-xs font-normal ml-[5px] mt-[5px]">{{
            option?.des
          }}</span>
        </p>
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
const data1 = ref(sortItems());

const timeOptions = computed(() => {
  return data1.value.filter((option) => option.category === "time");
});

const difficultyOptions = computed(() => {
  return data1.value.filter((option) => option.category === "difficulty");
});

onMounted(() => {
  const selectedOptions = JSON.parse(localStorage.getItem("selectedOptions"));
  if (selectedOptions) {
    data1.value.forEach((option, index) => {
      option.selected = selectedOptions[index];
    });
  }
});

function selectOption(index, category) {
  const categoryOptions = category === "time" ? timeOptions : difficultyOptions;
  const selectedOption = categoryOptions.value[index];
  selectedOption.selected = !selectedOption.selected;

  categoryOptions.value.forEach((option, i) => {
    if (i !== index) {
      option.selected = false;
    }
  });

  const selectedOptions = data1.value.map((option) => option.selected);
  localStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));
}

// selected items from all sorting, selected = true
const selectedItems = computed(() => {
  return data1.value.filter((item) => item.selected);
});

watch(selectedItems, (newValue, oldValue) => {
  console.log(newValue);
});
</script>
