<template>
  <ModalDown :modalActive="filter" title="Filtruj quizy" @close="filterShow()">
    <template #content>
      <!-- @state="quizView" -->
      <ModalContentQuizFilterView
        @close="filterShow"
        @category="category"
      />
    </template>
  </ModalDown>
  <ModalDown :modalActive="sorting" title="Sortowanie" @close="sortingShow()">
    <template #content>
      <ModalContentQuizSortingView @close="sortingClose" />
    </template>
  </ModalDown>
  <div class="fixed margin z-40 flex w-full justify-end">
    <div class="open-filter" @click="filterShow()">
      <Icon name="heroicons:adjustments-horizontal" size="32" color="white" />
    </div>
  </div>
  <NuxtLayout name="default">
    <!-- <pre>
      {{ allQuiz }}
        </pre
    > -->
    <div v-if=isLoading class="flex justify-center">
     <p class=text-center>Ładowanie wyników...</p>
          </div>
          <div v-else>
    <div class="flex justify-between place-items-center mb-4">
      <div class="flex flex-row gap-2">
        <p class="text-[13px] text-gray-400">
          Strona {{ route.query.page ? route.query.page : 1}}/{{ allQuiz.last_page }}
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
    <Pagination :last_page="allQuiz.last_page" />
  </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useQuiz } from "@/store/useQuiz";
import { number } from "yup";

definePageMeta({
  middleware: "auth",
});

const route = useRoute();
const router = useRouter();
const isLoading = ref(true)
const quiz = useQuiz();
const { allQuiz } = storeToRefs(quiz);

const f = async () => {
  let difficulty = route.query.difficulty;
  let category = route.query.cat_id;
  let min_count = route.query.min_count as any;
  let max_count = route.query.max_count as any;
  let min_time = route.query.min_time as any;
  let max_time = route.query.max_time as any;
  let per_page = route.query.per_page ? route.query.per_page : 15 as any;
  let page1 = route.query.page as any;
  let page = "page=" + route.query.page;

// console.log(page1)
  if (difficulty && category) {
    const difficultyFilter = createFilter("difficulty", difficulty);
    const categoryFilter = createFilter("category_id", category);
    const questionMinCountFilter = createFilterTwoParams(
      "questions",
      "count",
      min_count,
      "$gte"
    );
    const questionMaxCountFilter = createFilterTwoParams(
      "questions",
      "count",
      max_count,
      "$lt"
    );
    const questionMinTimeFilter = createFilterTwoParamsTime("time", min_time, "$gte");
    const questionMaxTimeFilter = createFilterTwoParamsTime("time", max_time, "$lt");

    await applyFilters(per_page, [
      page,
      difficultyFilter,
      categoryFilter,
      questionMinCountFilter,
      questionMaxCountFilter,
      questionMinTimeFilter,
      questionMaxTimeFilter,
    ]);
// console.log(page1)
  } 
  else if (difficulty) {
    const difficultyFilter = createFilter("difficulty", difficulty);
    const questionMinCountFilter = createFilterTwoParams(
      "questions",
      "count",
      min_count,
      "$gte"
    );
    const questionMaxCountFilter = createFilterTwoParams(
      "questions",
      "count",
      max_count,
      "$lt"
    );
    const questionMinTimeFilter = createFilterTwoParamsTime("time", min_time, "$gte");
    const questionMaxTimeFilter = createFilterTwoParamsTime("time", max_time, "$lt");

    await applyFilters(per_page, [
      page,
      difficultyFilter,
      questionMinCountFilter,
      questionMaxCountFilter,
      questionMinTimeFilter,
      questionMaxTimeFilter,
    ]);
  } 
  else if (category) {
    const categoryFilter = createFilter("category_id", category);
    const questionMinCountFilter = createFilterTwoParams(
      "questions",
      "count",
      min_count,
      "$gte"
    );
    const questionMaxCountFilter = createFilterTwoParams(
      "questions",
      "count",
      max_count,
      "$lt"
    );
    const questionMinTimeFilter = createFilterTwoParamsTime("time", min_time, "$gte");
    const questionMaxTimeFilter = createFilterTwoParamsTime("time", max_time, "$lt");

    await applyFilters(per_page, [
      page,
      categoryFilter,
      questionMinCountFilter,
      questionMaxCountFilter,
      questionMinTimeFilter,
      questionMaxTimeFilter,
    ]);
  } else {
    await quiz.getAllQuiz(per_page, page);
  }
  isLoading.value = false
};

const sorting = ref(false);
const sortingShow = () => {
  sorting.value = !sorting.value;
};
const sortingClose = () => {
  sorting.value = !sorting.value;
};

const filter = ref(false);
const filterShow = () => {
  filter.value = !filter.value;
};

onBeforeRouteUpdate(async (to, from) => {
  scrollToTop();

  let page = "";
  if (to.query.page === from.query.page) {
    page = "page=1";
  } else {
    page = "page=" + to.query.page;
  }
console.log(page)
  let difficulty = to?.query.difficulty;
  let category = to?.query.cat_id;
  let min_count = to.query.min_count as any;
  let max_count = to.query.max_count as any;
  let min_time = to.query.min_time as any;
  let max_time = to.query.max_time as any;
  let changeView = to.query.view;
  let per_page = to.query.per_page ? to.query.per_page : 15 as number;

  view.value = changeView || localStorage.getItem("listView")

  if (difficulty && category) {
    const difficultyFilter = createFilter("difficulty", difficulty);
    const categoryFilter = createFilter("category_id", category);
    const questionMinCountFilter = createFilterTwoParams(
      "questions",
      "count",
      min_count,
      "$gte"
    );
    const questionMaxCountFilter = createFilterTwoParams(
      "questions",
      "count",
      max_count,
      "$lt"
    );
    const questionMinTimeFilter = createFilterTwoParamsTime("time", min_time, "$gte");
    const questionMaxTimeFilter = createFilterTwoParamsTime("time", max_time, "$lt");

    await applyFilters(per_page, [
      page,
      difficultyFilter,
      categoryFilter,
      questionMinCountFilter,
      questionMaxCountFilter,
      questionMinTimeFilter,
      questionMaxTimeFilter,
    ]);
  } 
  else if (difficulty) {
    const difficultyFilter = createFilter("difficulty", difficulty);
    const questionMinCountFilter = createFilterTwoParams(
      "questions",
      "count",
      min_count,
      "$gte"
    );
    const questionMaxCountFilter = createFilterTwoParams(
      "questions",
      "count",
      max_count,
      "$lt"
    );
    const questionMinTimeFilter = createFilterTwoParamsTime("time", min_time, "$gte");
    const questionMaxTimeFilter = createFilterTwoParamsTime("time", max_time, "$lt");

    await applyFilters(per_page, [
      page,
      difficultyFilter,
      questionMinCountFilter,
      questionMaxCountFilter,
      questionMinTimeFilter,
      questionMaxTimeFilter,
    ]);
  } 
  else if (category) {
    const categoryFilter = createFilter("category_id", category);
    const questionMinCountFilter = createFilterTwoParams(
      "questions",
      "count",
      min_count,
      "$gte"
    );
    const questionMaxCountFilter = createFilterTwoParams(
      "questions",
      "count",
      max_count,
      "$lt"
    );
    const questionMinTimeFilter = createFilterTwoParamsTime("time", min_time, "$gte");
    const questionMaxTimeFilter = createFilterTwoParamsTime("time", max_time, "$lt");

    await applyFilters(per_page, [
      page,
      categoryFilter,
      questionMinCountFilter,
      questionMaxCountFilter,
      questionMinTimeFilter,
      questionMaxTimeFilter,
    ]);
  }
  else{
    await quiz.getAllQuiz(per_page as number, page);

  }
});

function createFilter(filterName: any, filterValue: any) {
  let paramsArray = [];
  let index = 0;

  if (Array.isArray(filterValue)) {
    filterValue.forEach((el) => {
      const data = `filters[${filterName}][$in][${index}]=${el}`;
      paramsArray.push(data);
      index++;
    });
  } else {
    const data = `filters[${filterName}][$in][0]=${filterValue}`;
    paramsArray.push(data);
  }

  return paramsArray.join("&");
}

function createFilterTwoParams(
  filterName1: any,
  filterName2: any,
  filterValue: any,
  name: any
) {
  let paramsArray = [];
  const data = `filters[$with][${filterName1}][${filterName2}][${name}]=${filterValue}`;
  paramsArray.push(data);

  return paramsArray.join("&");
}

function createFilterTwoParamsTime(filterName: any, filterValue: any, name: any) {
  let paramsArray = [];
  const data = `filters[${filterName}][${name}]=${filterValue}`;
  paramsArray.push(data);

  return paramsArray.join("&");
}

async function applyFilters(perPage: any, filters: any) {
  const params = filters.join("&");
  await quiz.getAllQuiz(perPage, params);
}

const view = ref();
onMounted(async () => {
    view.value = view.value || localStorage.getItem("listView");
  f();
});

const quizView = () => {
  // view.value = value;
  console.log('value')
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
.active {
  color: white;
  background-color: #618cfb;
  border-radius: 4px;
  margin-right: 7px;
  margin-left: 7px;
}
</style>
