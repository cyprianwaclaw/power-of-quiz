<template>
  <ModalSearch 
  :modalActive="openSearch"
  @close= "isClose" 
  />
  <div class="fixed z-50 w-full">

    <div class="flex bg-white border place-items-center justify-between h-16 border-b-gray-300  z-40  px-10">
      <div class="flex items-center shrink-0  pr-[80px]">
        <NuxtLink to="/panel" class="md:mr-14">
          <img src="@/assets/file/logo.png" class="w-[175px] "/>
        </NuxtLink>
        <div v-for="(page, index) in links" :key="index" class="mr-7 hidden md:flex">
          <NuxtLink :to="page.link" class="flex gap-7">
            <p class="text-[#464646] font-semibold whitespace-nowrap  hover:text-black">{{ page.name }}</p>
          </NuxtLink>
        </div>
      </div>
      <div class="flex lg:flex-1 shrink place-items-center gap-7 max-w-[1000px] ">
        <div class="lg:flex hidden w-full">   
          <InputSearch 
          @open="openMenuDesktop"
          />
          <userCard 
          @open="openMenuDesktop"
          class="shrink-0" />
        </div>
        <div class="lg:hidden flex ">
          <button @click="openSearch = !openSearch" v-if="!openSearch">
            <Icon name="ph:magnifying-glass-light" size="30" class="search-icon" />
          </button>
          <button @click="openSearch = !openSearch" v-else>
            <Icon name="carbon:close" size="30" class="search-icon" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useQuiz } from "@/store/useQuiz";
import { usePersistCart } from "@/utils/hooks";

const isOpen = ref(false);
const Modal = () => {
  isOpen.value = !isOpen.value;
};

const openMenu = ref(false);
const openMenuDesktop = (value: any) => {
  console.log("wartosc z komponenty: " + value);
  openMenu.value = value;
  // return value
};

const quiz = useQuiz();
const { allQuizName, popularQuiz, loadingQuiz, categories } = storeToRefs(quiz);
const openSearch = ref(false);
await quiz.getCategory();
const results = ref(false);
const search: any = ref();
usePersistCart();

let category = categories.value;
const allCategories: any = ref();

const links = [
  { name: "Zaproś znajomych", link: "/panel/zaproszeni" },
  { name: "Dodaj nowy", link: "/panel/quiz/dodaj-nowy" },
];

const searchInput: any = computed(() => {
  return allQuizName.value.filter((quiz: any) =>
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
  .paddingbottom {
    padding-bottom: 250px;
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
    top: 32px;
    right: 24px;
    height: 43px;
    margin-top: 4px;
  }
  .serach_color_disabled {
    background-color: #aec5ff;
    border-radius: 8px;
    width: 54px;
    position: absolute;
    top: 32px;
    right: 24px;
    height: 43px;
    margin-top: 4px;
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

.search-icon {
  color: #c4c4c4;
}
</style>
