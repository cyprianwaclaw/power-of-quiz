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
    <!-- <button @click="sort()">Sortuj</button> -->
    <button @click="remove()">Wyczyść</button>
    <div>
      <p class="text-2xl font-semibold mt-8">wszystkie quizy</p>
      <!-- {{ allQuiz }} -->
        <div v-for="quiz in allQuiz" :key="quiz.id" class="flex mt-5">
{{ quiz.title }}
czas: {{ quiz.time }}
{{ quiz.difficulty }}
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useQuiz } from "@/store/useQuiz";
import {storeToRefs} from 'pinia'

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

const selectedItems = computed(() => {
  return data1.value.filter((item) => item.selected);
});

watch(selectedItems, async(newValue, oldValue) => {
  let time = newValue?.[0]?.api
  let difficulty = newValue?.[1]?.api
  await quiz.getAllQuiz(24, difficulty, time);
});

const quiz = useQuiz();
const { allQuiz, categories } = storeToRefs(quiz);

const fetchData = async () => {
  await quiz.getAllQuiz(24, null);
}

const remove = async()=>{
  data1.value.forEach((option) => {
    option.selected = false;
  });
  const selectedOptions = data1.value.map((option) => option.selected);
  localStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));
}
onMounted(async () => {
  await fetchData();
});
</script>
