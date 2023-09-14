<template>
  <ModalDown :modalActive="filter" title="Filtruj quizy" @close="filterShow()">
    <template #content>
      <ModalContentQuizFilterView
        @state="quizView"
        @perPage="perPageChange"
        @close="filterShow"
        @category="category"
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
  <!-- po zmianie czegoś current page musi powrócić do strony 1 -->
  <div class="fixed margin z-40 flex w-full justify-end">
    <div class="open-filter" @click="filterShow()">
      <Icon name="heroicons:adjustments-horizontal" size="32" color="white" />
    </div>
  </div>
  <NuxtLayout name="panel">
    <div class="pb-[90px]">
      <div class="flex justify-between place-items-center mb-4">
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
      <pre>
        <!-- {{ allQuiz1 }} -->
        <!-- {{ filters(2) }} -->
        <!-- {{ allQuiz }} -->
      </pre>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useQuiz } from "@/store/useQuiz";

const perPageStart = ref();
const currentPage = ref(1);
const perPage = ref(15); // Inicjalizacja perPage z domyślną wartością

const route = useRoute();
const quiz = useQuiz();
const { allQuiz } = quiz;

const f = async () => {
  let difficulty = route.query.difficulty;
  let category = route.query.cat_id;
  let min_count = route.query.min_count as any;
  let max_count = route.query.max_count as any;
  let min_time = route.query.min_time as any;
  let max_time = route.query.max_time as any;

  if (difficulty && category) {
    // Jeśli oba parametry są obecne, tworzymy odpowiednie filtry
    const difficultyFilter = createFilter("difficulty", difficulty);
    const categoryFilter = createFilter("category_id", category);
 const questionMinCountFilter = createFilterTwoParams("questions", "count", min_count, "$gte");
    const questionMaxCountFilter = createFilterTwoParams("questions", "count", max_count, "$lt");
    const questionMinTimeFilter =  createFilterTwoParamsTime("time", min_time, '$gte');
    const questionMaxTimeFilter =  createFilterTwoParamsTime("time", max_time, '$lt');

    await applyFilters([difficultyFilter, categoryFilter, questionMinCountFilter, questionMaxCountFilter, questionMinTimeFilter, questionMaxTimeFilter]);
  } else if (difficulty) {
    // Jeśli jest tylko difficulty, stosujemy tylko ten filtr
    const difficultyFilter = createFilter("difficulty", difficulty);
 const questionMinCountFilter = createFilterTwoParams("questions", "count", min_count, "$gte");
    const questionMaxCountFilter = createFilterTwoParams("questions", "count", max_count, "$lt");
    const questionMinTimeFilter =  createFilterTwoParamsTime("time", min_time, '$gte');
    const questionMaxTimeFilter =  createFilterTwoParamsTime("time", max_time, '$lt');

    await applyFilters([difficultyFilter, questionMinCountFilter, questionMaxCountFilter, questionMinTimeFilter, questionMaxTimeFilter]);
  } else if (category) {

    const categoryFilter = createFilter("category_id", category);
     const questionMinCountFilter = createFilterTwoParams("questions", "count", min_count, "$gte");
    const questionMaxCountFilter = createFilterTwoParams("questions", "count", max_count, "$lt");
    const questionMinTimeFilter =  createFilterTwoParamsTime("time", min_time, '$gte');
    const questionMaxTimeFilter =  createFilterTwoParamsTime("time", max_time, '$lt');

    await applyFilters([categoryFilter, questionMinCountFilter, questionMaxCountFilter, questionMinTimeFilter, questionMaxTimeFilter]);
  } else {

    await quiz.getAllQuiz(perPageStart.value, 1, null);
  }

  // Po zmianie filtrów lub perPage, pobierz nowe dane
  await fetchData();
};


// Funkcja do tworzenia filtrów
function createFilter(filterName:any, filterValue:any) {
  let paramsArray = [];
  let index = 0;

  if (Array.isArray(filterValue)) {
    filterValue.forEach((el) => {
      console.log(filterValue.length)
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

const perPageChange = async (value: number) => {
  perPageStart.value = value;
};


function createFilterTwoParams(filterName1:any, filterName2:any,filterValue:any, name:any) {
  let paramsArray = [];

  // if (Array.isArray(filterValue)) {
    // filterValue.forEach((el) => {
      const data = `filters[$with][${filterName1}][${filterName2}][${name}]=${filterValue}`;
      paramsArray.push(data);
    // });
  // } else {
    // const data = `filters[${filterName}][$in]=${filterValue}`;
    // paramsArray.push(data);
  // }

  return paramsArray.join("&");
}

function createFilterTwoParamsTime(filterName:any,filterValue:any, name:any) {
  let paramsArray = [];

  // if (Array.isArray(filterValue)) {
    // filterValue.forEach((el) => {
      const data = `filters[${filterName}][${name}]=${filterValue}`;
      paramsArray.push(data);
    // });
  // } else {
    // const data = `filters[${filterName}][$in]=${filterValue}`;
    // paramsArray.push(data);
  // }

  return paramsArray.join("&");
}

// Funkcja do zastosowania filtrów
async function applyFilters(filters:any) {
  const params = filters.join("&");
  await quiz.getAllQuiz(perPageStart.value, 1, params);
}
const fetchData = async () => {
  // Tutaj umieść kod do pobierania danych z API z uwzględnieniem perPage
};

// ... Pozostały kod ...


// ... Pozostały kod ...
const view = ref();
onMounted(async () => {
  // Inicjalizacja perPage
  perPageStart.value = parseInt(localStorage.getItem("perPage") as any);
  perPage.value = perPageStart.value;
  const checkEmitsData = () => {
    view.value = view.value || localStorage.getItem("listView");
  };
  checkEmitsData();
  await f();
});
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

<!-- Pozostały kod CSS -->
