<template>
  <ModalDown :modalActive="filter" title="Filtruj quizy" @close="filterShow()">
    <template #content>
      <ModalContentQuizFilterView
        @state="quizView"
        @perPage="perPageChange"
        @close="filterShow"
        @category = "category"
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
   <!-- {{ filters(2) }} -->
    <!-- {{ allQuiz }} -->
        </pre
      >
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useQuiz } from "@/store/useQuiz";

definePageMeta({
  middleware: "auth",
});
const router = useRouter();
const route = useRoute();
const currentPage = ref(1);

const quiz = useQuiz();
const { allQuiz, } = storeToRefs(quiz);
const f = async () => {
  let difficulty = route.query.difficulty;
  let category = route.query.cat_id;

  if (difficulty && category) {
    // Jeśli oba parametry są obecne, tworzymy odpowiednie filtry
    const difficultyFilter = createFilter("difficulty", difficulty);
    const categoryFilter = createFilter("category_id", category);

    // Wywołujemy funkcję z obiema filtrami
    await applyFilters([difficultyFilter, categoryFilter]);
  } else if (difficulty) {
    // Jeśli jest tylko difficulty, stosujemy tylko ten filtr
    const difficultyFilter = createFilter("difficulty", difficulty);
    await applyFilters([difficultyFilter]);
  } else if (category) {
    // Jeśli jest tylko category, stosujemy tylko ten filtr
    const categoryFilter = createFilter("category_id", category);
    await applyFilters([categoryFilter]);
  } else {
    // Jeśli brak parametrów, pobieramy wszystkie quizy
    await quiz.getAllQuiz(15, 1, null);
  }
};


const sorting = ref(false);
const sortingShow = () => {
  sorting.value = !sorting.value;
};
const sortingClose = () => {
  sorting.value = !sorting.value;
  // firstPage()
};
const filter = ref(false);
const filterShow = () => {
  filter.value = !filter.value;
};


// onBeforeRouteUpdate(async (to) => {

//   let difficulty= to?.query.difficulty;
//   if (difficulty) {
//     console.log(difficulty);
//   // await getQuizByCategory(category, quiz.getAllQuiz);
//   getQuizByDiffuculty(difficulty, quiz.getAllQuiz)
//   }

//   let category = to?.query.cat_id;
//   if (category) {
//   await getQuizByCategory(category, quiz.getAllQuiz);
//   }
// });

onBeforeRouteUpdate(async (to) => {
  let difficulty = to?.query.difficulty;
  let category = to?.query.cat_id;

  if (difficulty && category) {
    // Jeśli oba parametry są obecne, tworzymy odpowiednie filtry
    const difficultyFilter = createFilter("difficulty", difficulty);
    const categoryFilter = createFilter("category_id", category);

    // Wywołujemy funkcję z obiema filtrami
    await applyFilters([difficultyFilter, categoryFilter]);
  } else if (difficulty) {
    // Jeśli jest tylko difficulty, stosujemy tylko ten filtr
    const difficultyFilter = createFilter("difficulty", difficulty);
    await applyFilters([difficultyFilter]);
  } else if (category) {
    // Jeśli jest tylko category, stosujemy tylko ten filtr
    const categoryFilter = createFilter("category_id", category);
    await applyFilters([categoryFilter]);
  }
});

// Funkcja do tworzenia filtrów
function createFilter(filterName, filterValue) {
  let paramsArray = [];

  if (Array.isArray(filterValue)) {
    filterValue.forEach((el) => {
      const data = `filters[${filterName}][$in]=${el}`;
      paramsArray.push(data);
    });
  } else {
    const data = `filters[${filterName}][$in]=${filterValue}`;
    paramsArray.push(data);
  }

  return paramsArray.join("&");
}

// Funkcja do zastosowania filtrów
async function applyFilters(filters) {
  const params = filters.join("&");
  await quiz.getAllQuiz(15, 1, params);
}



const view = ref();
onMounted( async () => {
  f()
  const checkEmitsData = () => {
    view.value = view.value || localStorage.getItem("listView");
  };
  checkEmitsData();
});
const quizView = (value: string) => {
  view.value = value;
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
