<template>
  <NuxtLayout name="panel">
      <!-- <div class="flex-container">
        <div>1</div>
        <div>2</div>
        <div class="shrink-0">3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div>8</div>
        <div>9</div>
        <div>10</div>
      </div> -->
        <div class="flex flex-col justify-center w-full mb-12 mt-4">
          <div class="flex items-place-center">
            <div class="md:flex" >         
              <img :src="currentUser.avatar_path" v-if="currentUser.avatar_path" class="avatar"/>
              <Icon name="carbon:user-avatar-filled" color="#BFCBEE" class="md:w-24 md:h-24 w-12 h-12" v-else/>
            </div>
            <h2 class="text-2xl  md:text-3xl flex place-items-center ml-2 md:ml-4 font-semibold">Witaj {{ currentUser.name }} !</h2>
          </div>
      </div>
      <div class="mb-[350px] mt-7">
        <h2 class="title-h2 mb-3">Wybrane dla Ciebie</h2>
        <p class="text mb-8">Wybrane quizy na podstawie Twoich ostatnich wyborów</p>
        <div class="flex flex-row overflow-auto overflow-x-scroll w-full absolute left-0 right-0 gap-7 pl-7 pr-7 scrollbar-hide" >
          <QuizForYou v-for="(quiz, index) in forYou" :key="index" :quiz="quiz"/>
        </div>
      </div>
        <userStatistics/>
      <div class="mb-[350px] mt-14">
        <h2 class="title-h2 mb-2">Quizy zyskujące popularność</h2>
        <p class="text mb-8">Zobacz jakie quizy są ostatnio na topie i zagraj w nie </p>
        <div class="flex flex-row overflow-auto overflow-x-scroll w-full absolute left-0 right-0 gap-7 pl-7 pr-7 scrollbar-hide" >
          <QuizForYou v-for="(quiz, index) in populars" :key="index" :quiz="quiz"/>
        </div>
      </div>
      <PakietHero 
      text="true"
      />
      <div class="mb-[420px] mt-14">
        <h2 class="title-h2 mb-2">Najnowsze quizy</h2>
        <p class="text mb-8">Zobacz jakie quizy są ostatnio na topie i zagraj w nie </p>
        <div class="flex flex-row overflow-auto overflow-x-scroll w-full absolute left-0 right-0 gap-7 pl-7 pr-7 scrollbar-hide" >
          <QuizForYou v-for="(quiz, index) in latest" :key="index" :quiz="quiz"/>
        </div>
      </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUser } from "@/store/useUser";
import { useQuiz } from "@/store/useQuiz";
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css/pagination';
import { Pagination } from 'swiper';
import 'swiper/css';

definePageMeta({
  middleware: "auth"
});

const userStore = useUser();
const quizStore = useQuiz();
const {currentUser} = storeToRefs(userStore)
const {quizForYou, popularQuiz, quizLatest, categories} = storeToRefs(quizStore)
await userStore.getUser();
await quizStore.getCategory();
await quizStore.getQuizForYou()
await quizStore.getLatestQuiz()
await quizStore.getPopularQuiz()

let category = categories.value;
const allCategories: any = ref();

let mapCategory = (allCategories.value = category.map((single: any) => ({
  id: single.id,
  name: single.name,
  selected: false,
})));

let forYou = quizesValue(quizForYou.value, mapCategory)
let populars = quizesValue(popularQuiz.value, mapCategory)
let latest =  quizesValue(quizLatest.value, mapCategory)
</script>
<style scoped lang="scss">
@import '@/assets/style/variables.scss';
.avatar {
  border: 1px solid $border;
  border-radius: 2000px;
  height: 52px;
  }

  
.swiper-slide {
  background: transparent;
  height: 220px;
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-pagination {
	position: absolute;
	top: 10px;
	right: 10px;
	width: auto !important;
	left: auto !important;
	margin: 0;
}
.swiper-pagination-bullet, swiper-pagination-bullet-active {
	padding: 5px 10px !important;
	border-radius: 0;
	width: auto;
	height: 30px;
	text-align: center;
	line-height: 30px;
	font-size: 12px;
	color:#000;
	opacity: 1;
	background: rgba(0,0,0,0.2);
}
.swiper-pagination-bullet-active {
	color:#fff;
	background: #007aff;
}

.swiper-pagination-bullet-active {
  background-color: #000 !important;
}

.flex-container {
  display: flex;
  align-items: stretch;
  background-color: #f1f1f1;
}

.flex-container>div {
  background-color: DodgerBlue;
  color: white;
  width: 100px;
  margin: 10px;
  text-align: center;
  line-height: 75px;
  font-size: 30px;
}
</style>