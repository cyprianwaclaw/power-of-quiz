<template>
  <div class="flex w-full flex-col">
    <p class="text-3xl font-semibold mb-5">Aktywne quizy</p>
    <div class="grid grid-cols-3 gap-6 w-full">
      <QuizDesktopCard v-for="quiz in userQuizAccepted" :key="quiz" :quiz="quiz"/>
    </div>
  </div>
</template>
<script setup lang="ts">

import { storeToRefs } from "pinia";
import { useQuiz } from "@/store/useQuiz";
import { useUser } from "@/store/useUser";

definePageMeta({
middleware: "auth",
});

const userStore = useUser();
const { currentUser } = storeToRefs(userStore);
await userStore.getUser();
let user = currentUser.value;

const quizStore = useQuiz();
const {activeQuiz} = storeToRefs(quizStore);
await quizStore.getActiveQuiz();
let userQuizAccepted = activeQuiz.value.filter(
      (quiz: any) => quiz.user_id === user.id
    );
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

</style>
