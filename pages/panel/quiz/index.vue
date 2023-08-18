<template>
  <ModalDown :modalActive="filter" title="Filtruj quizy" @close="filterShow()">
    <template #content>
      <ModalContentQuizFilterView 
      @state="quizView" @perPage="perPageChange" @close="filterShow"
      />
    </template>
  </ModalDown>
  <ModalDown :modalActive="sorting" title="Sortowanie" @close="sortingShow()">
    <template #content>
      <ModalContentQuizSortingView @state="quizView" @perPage="perPageChange" @close="sortingShow"/>
    </template>
  </ModalDown>
      <div class="fixed margin z-40 flex w-full justify-end">
        <div class="open-filter" @click="filterShow()">
          <Icon name="heroicons:adjustments-horizontal" size="32" color="white" />
        </div>
      </div>
  <NuxtLayout name="panel">
    <div class="pb-[90px]">
      <div class="flex justify-end">
        <button @click="sortingShow">Sortuj</button>
      </div>
      <div v-if="view == 'two'">
        <QuizCard v-for="quiz in allQuiz.data" :key="quiz?.id" :quiz="quiz" />
      </div>
      <div v-if="view == 'three'">
        <QuizSearchCard v-for="quiz in allQuiz.data" :key="quiz?.id" :quiz="quiz" />
      </div>
      <div v-if="view == 'four'">
        <div class="grid grid-cols-2 gap-6">
          <QuizTwoQuiz v-for="quiz in allQuiz.data" :key="quiz?.id" :quiz="quiz" />
        </div>
      </div>
      <div class="flex justify-end">
        <button @click="previousPage" v-if="currentPage !== quizes.current_page">
          Poprzednia strona
        </button>
        <button @click="nextPage" v-if="currentPage !== allQuiz.last_page">
          Następna strona
        </button>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useQuiz } from "@/store/useQuiz";

definePageMeta({
  middleware: "auth",
});
const perPageStart = ref(parseInt(localStorage.getItem("perPage") as any));
const currentPage = ref(1);

const quiz = useQuiz();
const { allQuiz, categories } = storeToRefs(quiz);
await quiz.getCategory();
await quiz.getAllQuiz(perPageStart.value, 1);

let quizes = allQuiz.value as any;

const sorting = ref(false);
const sortingShow = () => {
  sorting.value = !sorting.value;
};
const filter = ref(false);
const filterShow = () => {
  filter.value = !filter.value;
};

const view = ref();
onMounted(() => {
  const checkEmitsData = () => {
    view.value = view.value || localStorage.getItem("listView");
  };
  checkEmitsData();
});
const quizView = (value: string) => {
  view.value = value;
};

const nextPage = async () => {
  if (currentPage.value < allQuiz.value.last_page) {
    currentPage.value++;
    await quiz.getAllQuiz(perPageStart.value, currentPage.value);
  }
};

const previousPage = async () => {
  if (currentPage.value !== 1) currentPage.value--
  await quiz.getAllQuiz(perPageStart.value, currentPage.value);
};
const perPageChange = async(value:number)=>{
    perPageStart.value = value
    await quiz.getAllQuiz(value, currentPage.value);
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
.margin {
    margin-top: 440px;
  }
  .open-filter {
    color: white;
    background-color: #618cfb;
    padding: 8px 6px 8px 9px;
    border: 1px solid transparent;
    border-radius: 14px 0px 0px 14px;
  }
</style>
