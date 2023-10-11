<template>
  <ModalAlert
    :modalActive="standard"
    name="Premium"
    title="Brak dostępu"
    status="error"
    des="Ta sekcja wymaga pakietu Premium. Dołącz już teraz i ciesz się pełnymi możliwościami"
    closeButton="Zamknij"
    actionButton="Zobacz pakiety"
    redirect="/panel/pakiety"
    @close="standardPlan"
  />
  <ModalAlert :modalActive="premium" name="singleQuiz" @close="premiumPlan">
    <template #content>
      <ModalContentSingleQuizAlert :quiz="selectedQuiz" />
    </template>
  </ModalAlert>
  <div v-if="isOpen" class="dark-blur-background z-10"></div>
  <div class="py-8 md:py-0 place-items-center relative w-full md:flex hidden">
    <input
      class="z-30 w-full"
      @click="openSearch()"
      placeholder="Wyszukaj quiz..."
      v-model="search"
    />
    <div class="flex absolute left-7">
      <Icon
        name="ph:magnifying-glass"
        size="28"
        color="#E6E8EA"
        class="search_icon_color z-30"
      />
    </div>
    <div
      v-if="isOpen"
      v-on-click-outside="openSearch"
      class="border-own top-7 absolute w-full bg-white min-h p-6  z-20 h-[400px]"
    >
      <!-- {{ typeof(userPlan) }} -->
      <div class="" v-if="!search">
        <p class="font-semibold text-lg mb-4">Popularne quizy</p>
        <div class="overflow-y-auto rounded-xl h-[295px] scrollbar-hide">
          <div class="grid grid-cols-2 gap-[23px]" v-if="userPlan">
            <QuizSearchCardMini
              v-for="quiz in populars"
              :key="quiz"
              :quiz="quiz"
              @click="premiumPlan(quiz)"
            />
          </div>
          <div class="grid grid-cols-2 gap-[23px]" v-else>
            <QuizSearchCardMini
              v-for="quiz in populars"
              :key="quiz"
              :quiz="quiz"
              @click="standardPlan"
            />
          </div>
        </div>
      </div>
      <div class="" v-else>
        <div v-if="searchInput().length">
          <p class="font-semibold text-lg mb-4">Wyniki wyszukiwania</p>
          <div class="overflow-y-auto rounded-xl h-[295px] scrollbar-hide">
            <div class="grid grid-cols-2 gap-[23px]" v-if="userPlan">
              <QuizSearchCardMini
                v-for="quiz in searchInput()"
                :key="quiz"
                :quiz="quiz"
                @click="premiumPlan(quiz)"
              />
            </div>
            <div class="grid grid-cols-2 gap-[23px]" v-else>
              <QuizSearchCardMini
                v-for="quiz in searchInput()"
                :key="quiz"
                :quiz="quiz"
                @click="standardPlan"
              />
            </div>
          </div>
        </div>
        <div v-else>
          <p class="text-2xl font-semibold primary-color -mt-1">Brak wyników</p>
          <p class="text-gray mt-2 w-3/4 leading-7">
            nie znaleziono wyników dla:
            <span class="font-semibold break-words text-black">{{ search }}</span>
          </p>
          <p class="mb-4 font-semibold text-xl mt-5">Zobacz popularne quizy</p>
          <div class="overflow-y-auto rounded-xl h-[210px] scrollbar-hide">
            <div class="grid grid-cols-2 gap-[23px]" v-if="userPlan">
              <QuizSearchCardMini
                v-for="quiz in populars"
                :key="quiz"
                :quiz="quiz"
                @click="premiumPlan(quiz)"
              />
            </div>
            <div class="grid grid-cols-2 gap-[23px]" v-else>
              <QuizSearchCardMini
                v-for="quiz in populars"
                :key="quiz"
                :quiz="quiz"
                @click="standardPlan"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useQuiz } from "@/store/useQuiz";
import { vOnClickOutside } from "@vueuse/components";
import { useUser } from "@/store/useUser";
const { hasPremium } = storeToRefs(useUser());
const userPlan = hasPremium as any;
// usePersistCart();
defineProps(["modelValue"]);
// const emits = defineEmits(["update:modelValue",]);

const isOpen = ref(false);
const openSearch = () => {
  isOpen.value = !isOpen.value;
};

const quiz = useQuiz();
const { allQuizName, popularQuiz, categories } = storeToRefs(quiz);
await quiz.getCategory();
const search: any = ref();
await quiz.getAllName();

watch(isOpen, (newValue) => {
  if (newValue == false) {
    search.value = "";
  }
});

let category = categories.value;
const allCategories: any = ref();

let mapCategory = (allCategories.value = category.map((single: any) => ({
  id: single.id,
  name: single.name,
  selected: false,
})));

let populars = quizesValue(popularQuiz.value, mapCategory);

const searchInput: any = () => {
  return allQuizName.value.filter((quiz: any) =>
    quiz.title.toLowerCase().includes(search.value)
  );
};

// const alert = ref(false)
const standard = ref(false);
const premium = ref(false);

const selectedQuiz = ref(null);
const premiumPlan = (quizData: any) => {
  openSearch();
  selectedQuiz.value = quizData;
  premium.value = !premium.value;
};

const standardPlan = () => {
  openSearch();
  standard.value = !standard.value;
};

const isAlert = () => {
  if (userPlan === true) {
    premium.value = !premium.value;
  }
  if (userPlan === false) {
    standard.value = !standard.value;
    console.log("dsd");
  }
  openSearch();
  // alert.value = !alert.value;
  // console.log('close')
};
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
.serach_color {
  background-color: $primary;
  border-radius: 8px;
  width: 50px;
  position: absolute;
  right: 20px;
  height: 43px;
  margin-top: 4px;
}

.search_icon_color {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

input {
  margin-top: 0px;
  width: 100%;
  font-size: 15px;
  border: 2px solid transparent;
  outline: none;
  border-radius: 100px;
  border-color: #e6e8ea;
  padding: 0.5rem 3.5rem;
  transition: border-color 0.2s ease-in-out, color 0.2s ease-in-out,
    background-color 0.2s ease-in-out;
}

.border-own {
  border: 2px solid #e6e8ea;
  border-radius: 0px 0px 12px 12px;
}

input::placeholder {
  font-size: 15px;
  color: $text-gray;
}
</style>
