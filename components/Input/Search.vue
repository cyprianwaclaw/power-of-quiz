<template>
  <div class="mx-6 py-8 md:py-0 flex place-items-center relative w-full">
    <input
      class="z-50 w-full"
      @click="openSearch()"
      placeholder="Wyszukaj quiz..."
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <div class="flex absolute left-7">
      <Icon
        name="ph:magnifying-glass"
        size="28"
        color="#E6E8EA"
        class="search_icon_color z-50"
      />
    </div>
    <div
      v-if="isOpen"
      v-on-click-outside="openSearch"
      class="border-own top-8 absolute w-full bg-white min-h p-6 pt-8"
    >
    <div class="left-5 right-5 top-8">
      <LazyQuizLastResults/>
      <!-- {{ items }} -->
      <p class="font-semibold text-lg mb-4">Popularne quizy</p>
      <div class="grid grid-cols-2 gap-4 overflow-y-scroll h-[200px] scrollbar-hide"
      >
      <!-- :class="[
        items==1 ? ' grid-rows-3 grid-flow-col' : null,
        items==2 ? 'grid-rows-3 grid-cols-3' : null,
      ]" -->
      <QuizSearchCardMini v-for="(quiz, index) in populars" :key="index" :quiz="quiz" class="w-[300px]"/>
    </div>
  </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useQuiz } from "@/store/useQuiz";
import { vOnClickOutside } from "@vueuse/components";
import { usePersistCart } from "@/utils/hooks";
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css/pagination';
import { Pagination } from 'swiper';
import 'swiper/css';

usePersistCart();
defineProps(["modelValue"]);
const emits = defineEmits(["update:modelValue", "open"]);

const isOpen = ref(false);
const openSearch = () => {
  isOpen.value = !isOpen.value;
};

watch(isOpen, (newValue) => {
  emits("open", newValue);
});

const quiz = useQuiz();
const items = ref<any>(quiz.formattedCart.slice(-4).reverse().length)
const { allQuizName, popularQuiz, loadingQuiz, categories } = storeToRefs(quiz);
await quiz.getCategory();
const results = ref(false);
const search: any = ref();

const numberOfRows = ref(2)

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
  border-radius: 12px;
}

input::placeholder {
  font-size: 15px;
  color: $text-gray;
}
</style>
