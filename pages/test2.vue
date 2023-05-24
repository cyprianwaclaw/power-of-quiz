<template>
  <div>
    <button @click="sort">Sort</button>
    <div>
      <div>
        <h2>Time</h2>
        <div v-for="(item, index) in timeOptions" :key="index">
          <input type="checkbox" v-model="item.selected" @click="selectOption(index, 'time')">{{ item.name }}
        </div>
      </div>
      <div>
        <h2>Difficulty</h2>
        <div v-for="(item, index) in difficultyOptions" :key="index">
          <input type="checkbox" v-model="item.selected" @click="selectOption(index, 'difficulty')">{{ item.name }}
        </div>
      </div>
    </div>
    <div v-for="(quiz, index) in allQuiz" :key="index">
      {{ quiz.title }}
      czas: {{ quiz.time }}
      {{ quiz.difficulty }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from "vue";
import { useQuiz } from "@/store/useQuiz";
import {storeToRefs} from 'pinia'

const sorting = reactive([
  { name: "Czas rosnąco", value: "medium", selected:false, api: "sort[0]=time,desc", category: "time"   },
  { name: "Czas malejąco", value: "medium", selected:false,  api: "sort[0]=time,asc", category: "time" },
  { name: "Trudność", value: "easy", selected: false, des: "( łatwe, trudne )", category: "difficulty" },
  { name: "Trudność", value: "easy", selected:false, des: "( trudne, łatwe )", category: "difficulty" }
]);

const data1 = ref(sorting);

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

const quiz = useQuiz();
const fetchData = async () => {
  const allQuizFromStorage = JSON.parse(localStorage.getItem('allQuiz'));
  if (allQuizFromStorage) {
    quiz.allQuiz.value = allQuizFromStorage;
  } else {
    await quiz.getAllQuiz(24, null);
  }
}

const { allQuiz, categories } = storeToRefs(quiz);

const sort = async () => {
  const selectedOptions = JSON.parse(localStorage.getItem("selectedOptions"));
  const selectedSortOptions = data1.value.filter(option => option.selected);
  const sortApiParams = selectedSortOptions.map(option => option.api).join('&');
  await quiz.getAllQuiz(2, sortApiParams);
};

onMounted(async () => {
  await fetchData();
});

</script>
