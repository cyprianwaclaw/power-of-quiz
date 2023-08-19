<template>
  <ModalDown :modalActive="filter" title="Filtruj quizy" @close="filterShow()">
    <template #content>
      <ModalContentQuizFilterView
        @state="quizView"
        @perPage="perPageChange"
        @close="filterShow"
      />
    </template>
  </ModalDown>
  <ModalDown :modalActive="sorting" title="Sortowanie" @close="sortingShow()">
    <template #content>
      <ModalContentQuizSortingView
        @state="quizView"
        @perPage="perPageChange"
        @close="sortingClose"
      />
    </template>
  </ModalDown>
  <!-- po zmiene czogoś current page musi powrócić do strony 1 -->
  <div class="fixed margin z-40 flex w-full justify-end">
    <div class="open-filter" @click="filterShow()">
      <Icon name="heroicons:adjustments-horizontal" size="32" color="white" />
    </div>
  </div>
  <NuxtLayout name="panel">
    <div class="pb-[90px]">
      <div class="flex justify-between place-items-center">
        <div class="flex flex-row gap-2">
          <p class="text-[13px] text-gray-400">
            Strona {{ currentPage }}/{{ allQuiz.last_page }}
          </p>
          <div class="vl"></div>
          <p class="text-[13px] text-gray-400">{{ allQuiz.total }} wyników</p>
        </div>
        <div class="flex">
          <button @click="sortingShow">Sortuj</button>
        </div>
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
      <div class="flex justify-center mt-6">
        <div class="flex gap-1">
          <button @click="firstPage" v-if="allQuiz.current_page !== 1">
            <Icon name="ph:caret-double-left-light" size="21" class="" />
          </button>
          <button @click="previousPage" v-if="allQuiz.current_page !== 1">
            <Icon name="ph:caret-left-light" size="21" class="" />
          </button>
        </div>
        <div class="flex space-x-5 mx-3">
          <div v-for="(links, index) in pagination()" :key="index">
            <button
              @click="changePageButton(links.label)"
              class="mt-[3px]"
              :class="[links.active == true ? 'font-bold primary-color' : 'font-reular']"
            >
              {{ links.label }}
            </button>
          </div>
        </div>
        <div class="flex gap-1">
          <button @click="nextPage" v-if="allQuiz.current_page !== allQuiz.last_page">
            <Icon name="ph:caret-right-light" size="21" class="" />
          </button>
          <button @click="lastPage" v-if="allQuiz.current_page !== allQuiz.last_page">
            <Icon name="ph:caret-double-right-light" size="21" class="" />
          </button>
        </div>
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
const pageToShow = 5;

const quiz = useQuiz();
const { allQuiz } = storeToRefs(quiz);
await quiz.getCategory();
await quiz.getAllQuiz(perPageStart.value, 1);

const sorting = ref(false);
const sortingShow = () => {
  sorting.value = !sorting.value;
};
const sortingClose = () => {
  sorting.value = !sorting.value;
  currentPage.value = 1;
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
    scrollToTop();
    currentPage.value++;
    await quiz.getAllQuiz(perPageStart.value, currentPage.value);
  }
};

const firstPage = async () => {
  scrollToTop();
  currentPage.value = 1;
  await quiz.getAllQuiz(perPageStart.value, currentPage.value);
};

const lastPage = async () => {
  scrollToTop();
  currentPage.value = allQuiz.value.last_page;
  await quiz.getAllQuiz(perPageStart.value, currentPage.value);
};

const previousPage = async () => {
  if (currentPage.value !== 1) {
    scrollToTop();
    currentPage.value--;
    await quiz.getAllQuiz(perPageStart.value, currentPage.value);
  }
};
const perPageChange = async (value: number) => {
  perPageStart.value = value;
  await quiz.getAllQuiz(value, currentPage.value);
};

const pagination = () => {
  const lastPageNumber = allQuiz.value.last_page;

  // Oblicz indeks początkowy i końcowy stron, tak aby wyświetlać 5 stron z aktywnym środkiem.
  let startPage = Math.max(1, currentPage.value - Math.floor(pageToShow / 2));
  let endPage = Math.min(lastPageNumber, startPage + pageToShow - 1);

  // Dostosuj indeks początkowy, jeśli końcowa strona jest za blisko końca.
  if (endPage - startPage + 1 < pageToShow) {
    startPage = Math.max(1, endPage - pageToShow + 1);
  }
  // Aktualizuj tablicę linksPagination z pełnymi informacjami o stronach.
  allQuiz.value.links = [];
  for (let i = startPage; i <= endPage; i++) {
    const isActive = i === currentPage.value; // Sprawdza, czy strona jest aktywna
    allQuiz.value.links.push({ label: i, url: `?page=${i}`, active: isActive });
  }

  return allQuiz.value.links;
};

const changePageButton = async (value: any) => {
  currentPage.value = value;
  await quiz.getAllQuiz(perPageStart.value, value);
  scrollToTop();
};
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

.vl {
  border-left: 1px solid rgb(156 163 175);
  margin-top: 4px;
  margin-bottom: 4px;
}
</style>
