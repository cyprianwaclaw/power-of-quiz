<template>
      <ModalDown v-if="isOpen"  @close= "Modal()"  title="Filtruj quizy">
    <template #content>
      <div class="overflow-y-scroll h-[275px] right-8 left-8 pr-4">
        <p class="mb-3 text-lg font-bold">Kategoria</p>
        <div v-for="(category, index) in allCategories" :key="index">
          <label class="flex w-full mt-2">
            <input
              class="w-5 flex mb-[4px]"
              type="checkbox"
              v-model="category.selected"
              @change="handleChange(mapCategory)"
            />
            <p class="w-full flex ml-2">{{ category.name }}</p>
          </label>
        </div>
        <p class="mb-3 text-lg font-bold mt-10">Poziom trudności</p>
        <div v-for="(level, index) in difficulty" :key="index">
          <label class="flex w-full mt-2">
            <input
              class="w-5 flex mb-[4px]"
              type="checkbox"
              v-model="level.selected"
              @change="handleChangeLevel(difficulty)"
              />
              <p class="w-full flex ml-2">{{ level.name }}</p>
          </label>
        </div>
        <p class="text-lg font-bold mt-10 mb-8">Liczba pytań</p>
        
        <InputRange
        :max="99"
          v-model:min-value="minAnswersRange"
          v-model:max-value="maxAnswersRange"
        />

        <p class="text-lg font-bold mt-12 mb-8">
          Czas trwania<span class="text-gray text-xs font-normal ml-[5px]"
          >( minuty )</span
          >
        </p>
        <div class="mb-8">
          <InputRange
            :max="60"
            v-model:min-value="minTimeRange"
            v-model:max-value="maxTimeRange"
            />
          </div>
      <div class="">
        <button class="button-remove flex w-full" @click="routeRemove">Wyczyść</button>
        <button class="button-primary text-center flex w-full" @click="routePush">
          Zapisz
        </button>
        </div>
      </div>
  </template>
    </ModalDown>
        <ModalDown v-if="isSort" @close="Sort()" title="Sortowanie">
          <template #content>
        <div class="overflow-y-scroll h-[255px] right-8 left-8 pr-4">
          <p class="mb-4 text-lg font-bold">Wybierz układ</p>
          <QuizSortAll @two="twoView" @three="threeView" @four="fourView" />
          <div class="mb-8">
            <p class="mb-3 text-lg font-bold mt-[16px]">Liczba na stronie</p>
            <InputSingleRange :max="60" v-model="perPage" />
          </div>

          <p class="mb-4 text-lg font-bold">Inne opcje sortowania</p>
          <CHOOSE_TEST />
          <div class="mt-7"></div>
        <div class="">
          <button class="button-remove flex w-full" @click="routeRemove">Wyczyść</button>
          <button class="button-primary text-center flex w-full" @click="saveSortTest()">
            Zapisz
          </button>
        </div>
        </div>
        </template>
        </ModalDown>
    <div class="fixed margin z-10 flex w-full justify-end">
      <div class="open-filter" @click="Modal">
        <Icon name="heroicons:adjustments-horizontal" size="32" color="white" />
      </div>
    </div>
    <NuxtLayout name="panel">
      <!-- <pre>
        {{ sortItems }}
        <div v-if="sortItems?.[0].selected == true">
<p>false</p>
        </div>
      </pre> -->
      <h1 class="title-h1 mb-5">Wszystkie quizy</h1>
      <div v-if="route.fullPath.includes('?')" class="-mb-[16px]">
        <div>
          <p class="text-lg font-semibold">Wyniki wyszukiwania dla:</p>
        </div>

        <div
          v-if="
            route.query.category ||
            route.query.difficulty ||
            route.query.category ||
            queryParams(route.query.minAnswers)[0] != 0 ||
            queryParams(route.query.maxAnswers)[0] != 99 ||
            queryParams(route.query.minTime)[0] != 0 ||
            queryParams(route.query.maxTime)[0] != 60
          "
        >
          <p class="mb-3">Aktywne filtry:</p>
          <div
            class="flex flex-row overflow-auto overflow-x-scroll w-full absolute left-0 right-0 pl-7 pr-4 scrollbar-hide"
          >
            <div
              v-for="(singleCategory, index) in queryParams(route.query.category)"
              :key="index"
            >
              <button
                v-if="route.query.category ? true : false"
                @click="removeCategory(index)"
                class="filter_button_active place-items-center mr-4"
              >
                <Icon name="ph:x-light" size="17" class="color-primary mb-[2px] mr-1" />
                {{ singleCategory }}
              </button>
            </div>
            <div
              v-for="(singledifficulty, index) in changeDifficulty(
                difficulty,
                route.query.difficulty
              )"
              :key="index"
            >
              <button
                v-if="route.query.difficulty ? true : false"
                @click="removedifficulty(index)"
                class="filter_button_active place-items-center mr-4"
              >
                <Icon name="ph:x-light" size="17" class="color-primary mb-[2px] mr-1" />
                {{ singledifficulty?.name }}
              </button>
            </div>
            <div
              v-if="
                queryParams(route.query.minAnswers)[0] != 0 ||
                queryParams(route.query.maxAnswers)[0] != 99
                  ? true
                  : false
              "
            >
              <button class="filter_button_active place-items-center mr-4">
                <Icon name="ph:x-light" size="17" class="color-primary mb-[2px] mr-1" />
                Liczba pytań: {{ queryParams(route.query.minAnswers)[0] }} -
                {{ queryParams(route.query.maxAnswers)[0] }}
              </button>
            </div>
            <div
              v-if="
                queryParams(route.query.minTime)[0] != 0 ||
                queryParams(route.query.maxTime)[0] != 60
                  ? true
                  : false
              "
            >
              <button class="filter_button_active place-items-center mr-4">
                <Icon name="ph:x-light" size="17" class="color-primary mb-[2px] mr-1" />
                Czas trwania: {{ queryParams(route.query.minTime)[0] }} -
                {{ queryParams(route.query.maxTime)[0] }}
              </button>
            </div>
          </div>
        </div>
        <div class="mt-[85px]">
          <p class="text-gray text-sm font-medium">
            Znalezione quizy:
            <span class="font-semibold">{{ filterCategory().length }}</span>
          </p>
        </div>
      </div>
      <div v-if="!filterCategory().length" class="mt-44">
        <p>brak wyników</p>
      </div>
      <div
        v-else
        class="mt-20"
        :class="{ margin_filter: route.fullPath.includes('?') ? true : false }"
      >
        <button
          @click="Sort()"
          class="absolute right-7 -mt-[44px]"
          :class="{ margin_filter1: route.fullPath.includes('?') ? true : false }"
        >
          Sortowanie
        </button>
        <!-- <pre>
{{ allQuiz1 }}
        </pre> -->

        <div v-if="firstView">
          <QuizCard v-for="quiz in filterCategory()" :key="quiz?.id" :quiz="quiz" />
        </div>
        <div v-if="secondView">
          <QuizSearchCard v-for="quiz in filterCategory()" :key="quiz?.id" :quiz="quiz" />
        </div>
        <div v-if="thirdView">
          <div class="grid grid-cols-2 gap-6">
            <QuizMyQuizes v-for="quiz in filterCategory()" :key="quiz?.id" :quiz="quiz" />
          </div>
        </div>
        <pre></pre>
      </div>

      <div class="h-44"></div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useQuiz } from "@/store/useQuiz";

definePageMeta({
  middleware: "auth",
});

const firstView = ref(localStorage.getItem("listView") == "two" ? true : false);
const twoView = (value: any) => {
  firstView.value = !firstView.value;
  secondView.value = false;
  thirdView.value = false;
};
const secondView = ref(localStorage.getItem("listView") == "three" ? true : false);
const threeView = (value: any) => {
  firstView.value = false;
  secondView.value = !secondView.value;
  thirdView.value = false;
};
const thirdView = ref(localStorage.getItem("listView") == "four" ? true : false);
const fourView = (value: any) => {
  firstView.value = false;
  secondView.value = false;
  thirdView.value = !thirdView.value;
};

let perPage = ref(parseInt(localStorage.getItem("perPage") as any));
watch(perPage, (newVal: any) => {
  localStorage.setItem("perPage", newVal);
});
let minAnswersRange = ref(0);
let maxAnswersRange = ref(99);
let minTimeRange = ref(0);
let maxTimeRange = ref(60);

const route: any = useRoute();
const router: any = useRouter();

const timeTest = "sort[0]=time,desc";
const timeTest1 = "sort[1]=count ,decs";
const quiz = useQuiz();

await quiz.getAllQuiz(perPage.value, timeTest, null);
await quiz.getAllQuiz1();
const { allQuiz1, allQuiz, categories } = storeToRefs(quiz);
await quiz.getCategory();
const saveSortTest = async () => {
  await quiz.getAllQuiz1();
};

let all = allQuiz.value;
let category = categories.value;

const allCategories: any = ref();

let mapCategory = (allCategories.value = category.map((single: any) => ({
  id: single.id,
  name: single.name,
  selected: false,
})));

let difficulty = reactive([
  { name: "Łatwy", value: "easy", selected: false },
  { name: "Średni", value: "medium", selected: false },
  { name: "Trudny", value: "hard", selected: false },
]);

const isOpen = ref(false);
const Modal = () => {
  isOpen.value = !isOpen.value;
};
const isSort = ref(false);
const Sort = () => {
  isSort.value = !isSort.value;
};

const routePush = () => {
  let categoryArray: any = [];
  let selectedCategory = handleChange(mapCategory).filter(
    (single: any) => single.selected == true
  );
  selectedCategory.forEach((single: any) => {
    categoryArray.push(single.name);
  });

  let difficultyArray: any = [];
  let selectedDifficulty = handleChangeLevel(difficulty).filter(
    (single: any) => single.selected == true
  );
  selectedDifficulty.forEach((single: any) => {
    difficultyArray.push(single.value);
  });

  let maxTime = [maxTimeRange.value];
  let minTime = [minTimeRange.value];
  let minAnswers = [minAnswersRange.value];
  let maxAnswers = [maxAnswersRange.value];

  router.push({
    query: {
      category: categoryArray,
      difficulty: difficultyArray,
      minAnswers: minAnswers,
      maxAnswers: maxAnswers,
      minTime: minTime,
      maxTime: maxTime,
    },
  });

  isOpen.value = false;
};

const routeRemove = () => {
  router?.replace({ query: { category: undefined, difficulty: undefined } });
  isOpen.value = false;
};

// ! nie działa - do poprawy
function removeCategory(index: any) {
  let str1 = ref(route.query.category);

  let split_string = String(str1).split(",");

  return str1.splice(index, 1);
}

const filterCategory: any = () => {
  let allQuizArray = quizesValue(all, mapCategory);
  let categoriesArray = queryParams(route.query.category);
  let difficultyArray = queryParams(route.query.difficulty);
  let maxAnswersArray = queryParams(route.query.maxAnswers);
  let minAnswersArray = queryParams(route.query.minAnswers);
  let minTimeArray = queryParams(route.query.minTime);
  let maxTimeArray = queryParams(route.query.maxTime);

  function filter(
    quizzes: any[],
    categories: any[],
    difficulties: any[],
    minAnswers: any[],
    maxAnswers: any[],
    minTime: any[],
    maxTime: any[]
  ) {
    return quizzes.filter((quiz: any) => {
      if (difficulties && !difficulties.includes(quiz.difficulty)) {
        return false;
      }
      if (
        categories &&
        !quiz.category.some((cat: any) => categories.includes(cat.name))
      ) {
        return false;
      }
      if (
        (minAnswers !== undefined && quiz.questions_count < minAnswers) ||
        (maxAnswers !== undefined && quiz.questions_count > maxAnswers)
      ) {
        return false;
      }
      if (
        (minTime !== undefined && quiz.time < minTime) ||
        (maxTime !== undefined && quiz.time > maxTime)
      ) {
        return false;
      }
      if (
        categories === undefined &&
        difficulties === undefined &&
        maxAnswers === undefined &&
        minAnswers === undefined &&
        minTime === undefined &&
        maxTime === undefined
      ) {
        return quizzes;
      }
      return true;
    });
  }

  const filteredQuizzes = filter(
    allQuizArray,
    categoriesArray,
    difficultyArray,
    minAnswersArray,
    maxAnswersArray,
    minTimeArray,
    maxTimeArray
  );

  return filteredQuizzes;
};
</script>

<style scoped lang="scss">
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
.button-remove {
  background-color: transparent;
  border: solid 1px $color-error;
  padding: 10px 23px;
  color: $color-error;
  font-family: $family;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  letter-spacing: 0.05em;
  display: block;
  border-radius: 8px;
  transition: color 0.3s ease-in-o;
}

.margin_filter {
  margin-top: 48px;
}

.margin_filter1 {
  margin-top: -54px;
}
</style>
