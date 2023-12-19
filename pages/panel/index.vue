<template>
  <NuxtLayout name="default">
    <div class="flex flex-col justify-center w-full mb-10  lg:mb-16  mt-4 md:mt-5 lg:mt-8">
      <div class="flex items-place-center">
        <div class="md:flex">
          <img
            :src="currentUser.avatar_path"
            v-if="currentUser.avatar_path"
            class="avatar h-[52px] lg:h-[72px]"
          />
          <Icon
            name="carbon:user-avatar-filled"
            color="#BFCBEE"
            class="md:w-24 md:h-24 w-12 h-12"
            v-else
          />
        </div>
        <h2 class="text-2xl md:text-3xl flex place-items-center font-semibold pl-4">
          Witaj {{ currentUser.name }} !
        </h2>
      </div>
    </div>
    <div class="hidden md:grid grid-cols-2 grid-rows-1 gap-8">
      <userStatistics />
      <div class="gap-8 grid">
        <PakietAddUser
          text="Zyskaj bonus od 11 do 36 punktów, za każdego poleconego, który wykupi pakiet Premium"
        />
        <PakietHero text="true" />
      </div>
    </div>
      <h2 class="title-h2 mb-3 md:mt-20">Wybrane dla Ciebie</h2>
      <p class="text mb-8">Wybrane quizy na podstawie Twoich ostatnich wyborów</p>
        <div
        class=" -mr-8 lg:grid lg:static md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 lg:mx-0 lg:px-0 lg:gap-8 gap-8 flex flex-row overflow-auto overflow-x-scroll -mx-8 px-8 scrollbar-hide"
        >
        <QuizForYou v-for="(quiz, index) in quizForYou" :key="index" :quiz="quiz" />
      </div>
      <userStatistics class="md:hidden flex mt-14" />
    <div class=" mt-14 ">
      <h2 class="title-h2 mb-2">Quizy zyskujące popularność</h2>
      <p class="text mb-8">Zobacz jakie quizy są ostatnio na topie i zagraj w nie</p>
      <div
      class=" -mr-8 lg:grid lg:static md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 lg:mx-0 lg:px-0 lg:gap-8 gap-8 flex flex-row overflow-auto overflow-x-scroll -mx-8 px-8 scrollbar-hide"
      >
        <QuizForYou v-for="(quiz, index) in popularQuiz" :key="index" :quiz="quiz" />
      </div>
    </div>
    <PakietHero text="true" class="md:hidden  mt-14" />
    <div class="mt-14 ">
      <h2 class="title-h2 mb-2">Najnowsze quizy</h2>
      <p class="text mb-8">Zobacz jakie quizy są ostatnio na topie i zagraj w nie</p>
      <div
      class=" -mr-8 lg:grid lg:static md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 lg:mx-0 lg:px-0 lg:gap-8 gap-8 flex flex-row overflow-auto overflow-x-scroll -mx-8 px-8 scrollbar-hide"
      >
        <QuizForYou v-for="(quiz, index) in popularQuiz" :key="index" :quiz="quiz" />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUser } from "@/store/useUser";
import { useQuiz } from "@/store/useQuiz";

definePageMeta({
  middleware: "auth",
});



const userStore = useUser();
const quizStore = useQuiz();
const { currentUser } = storeToRefs(userStore);
const { quizForYou, popularQuiz, quizLatest, categories } = storeToRefs(quizStore);
await userStore.getUser();
await quizStore.getCategory();
await quizStore.getQuizForYou();
await quizStore.getLatestQuiz();
await quizStore.getPopularQuiz();

</script>
<style scoped lang="scss">
@import "@/assets/style/variables.scss";
.avatar {
  border: 1px solid $border;
  border-radius: 2000px;
}
</style>
