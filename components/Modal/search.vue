<template>
  <Transition name="slide-fade">
    <div class="fixed z-50 left-0 bottom-0 w-full top-[60px] bg-white">
      <div class="flex place-items-center bg-white flex-col mx-5">
        <input name="search" class="mb-6 mt-6" v-model="search" placeholder="Wyszukaj quiz..." />
          <button class="serach_color" @click="click" v-if="search">
            <Icon
              name="ph:magnifying-glass"
              size="22"
              color="white"
              class="search_icon_color"
            />
          </button>
          <button class="serach_color_disabled" disabled v-else>
            <Icon
              name="ph:magnifying-glass"
              size="22"
              color="white"
              class="search_icon_color"
            />
          </button>
        <div v-if="!search" class="flex w-full flex-col">
            <LazyQuizLastResults/>
            <p class="mb-4 font-semibold text-xl mt-5">Popularne quizy</p>
            <div class="overflow-y-auto rounded-xl h-screen scrollbar-hide pb-[360px]">
              <div v-for="quiz in populars" :key="quiz" class="">
                <QuizSearchCard :quiz="quiz" />
              </div>
            </div>
        </div>
      </div>
      <div
        class="overflow-auto h-screen relative bg-white rounded-xl flex flex-col mx-6 scrollbar-hide  pb-[240px]"
      >
        <div v-for="quiz in searchInput" :key="quiz" >
          <div v-if="search.length">
            <QuizSearchCard :quiz="quiz" />
          </div>
        </div>
      </div>
      <div>
        <div v-if="results">
          <button class="serach_color_disabled" @click="click" disabled>
            <Icon
              name="ph:magnifying-glass"
              size="22"
              color="white"
              class="search_icon_color"
            />
          </button>
            <div class="absolute top-28 left-6 right-6 z-20 ">
              <p class="text-2xl font-semibold primary-color -mt-1">Brak wyników</p>
              <p class="text-gray mt-3 w-3/4 leading-7">
                  nie znaleziono wyników dla:
                  <span class="serach-vmodel break-words">{{ search }}</span> spróbuj inaczej
                  wpisać frazę
                </p>
                <p class="mb-4 font-semibold text-xl mt-10">Popularne quizy</p>
                <div class="overflow-y-auto rounded-xl h-screen scrollbar-hide pb-[420px]">
                    <div v-for="quiz in populars" :key="quiz" class="">
                        <QuizSearchCard :quiz="quiz" />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useQuiz } from "@/store/useQuiz";

const isOpen = ref(false);
const Modal = () => {
  isOpen.value = !isOpen.value;
};

const quiz = useQuiz();
const { allQuizName, popularQuiz, loadingQuiz, categories } = storeToRefs(quiz);
const openSearch = ref(false);
await quiz.getCategory();
const results = ref(false);
const search: any = ref();

let category = categories.value;
const allCategories: any = ref();

let mapCategory = (allCategories.value = category.map((single: any) => ({
  id: single.id,
  name: single.name,
  selected: false,
})));

let populars = quizesValue(popularQuiz.value, mapCategory);

const searchInput: any = computed(() => {
    return quizesValue(allQuizName.value, mapCategory).filter((quiz: any) =>
    quiz.title.toLowerCase().includes(search.value)
    );
});


function deleteItem() {
  console.log("delete");
}

function newStorge() {}

watch(search, async (newValue: any) => {
  if (newValue.length > 0) {
    await quiz.getAllName();
  }
});

watch(searchInput, async (newValue: any) => {
  if (newValue.length) {
    results.value = false;
  } else {
    results.value = true;
  }
});

watch(openSearch, async (newValue: any) => {
  if (newValue) {
    // zrobić ifa gdy nie ma popularnych
    await quiz.getPopularQuiz();
    document.body.style.overflow = "hidden";
    document.body.style.userSelect = "none";
  } else {
    document.body.style.overflow = "auto";
    document.body.style.userSelect = "auto";
  }
});

function click() {
  openSearch.value = false;
  quiz.add(search.value);
  search.value = "";
  // useRouter().push("/panel/quiz/szukaj");
}
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

@media only screen and (max-width: 770px) {
  .size-logo {
    width: 175px;
  }

  .background_gradient {
    background-color: $color-error;
    height: 80px;
    bottom: 190px;
    background: linear-gradient(179.73deg, rgba(255, 255, 255, 0) 11.43%, #ffffff 70.53%);
  }
  .serach_color {
    background-color: $primary;
    border-radius: 8px;
    width: 54px;
    position: absolute;
    top: 21px;
    right: 20px;
    height: 43px;
    margin-top: 3px;
  }
  .serach_color_disabled {
    background-color: #aec5ff;
    border-radius: 8px;
    width: 54px;
    position: absolute;
    top: 21px;
    right: 20px;
    height: 43px;
    margin-top: 3px;
  }

  .search_icon_color {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .serach-vmodel {
    font-weight: 500;
    letter-spacing: 0.02em;
    text-decoration-line: underline;
    color: $text-black;
  }
  .last-search {
    color: $text-gray;
    font-size: 15px;
  }
  .last-search:active {
    color: $text-black;
    font-size: 15px;
    text-decoration-line: underline;
  }
  .text-click {
    -webkit-tap-highlight-color: transparent;
    text-decoration-line: underline;
    border-radius: 20px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
}

@media only screen and (min-width: 770px) {
  .size-logo {
    width: 160px;
  }
}
.search-icon {
  color: #c4c4c4;
}
</style>
