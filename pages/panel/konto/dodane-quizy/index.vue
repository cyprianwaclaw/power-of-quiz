<template>
  <NuxtLayout name="my-account">
    <h1 class="title-h1 mb-2">Dodane quizy</h1>
    <div
      class="overflow-x-scroll space-x-5 w-11/12 absolute right-0 flex py-4 whitespace-nowrap overflow-auto scrollbar-hide pr-10"
    >
      <button
        class="filter_button_disactive"
        :class="{ filter_button_active: all }"
        @click="allButton"
      >
        Wszystkie
      </button>
      <button
        class="filter_button_disactive"
        :class="{ filter_button_active: active }"
        @click="acceptButton"
      >
        Aktywne
      </button>
      <button
        class="filter_button_disactive"
        :class="{ filter_button_active: waiting }"
        @click="waitingButton"
      >
        Oczekujące na akceptację
      </button>
    </div>
    <div class="mt-28" v-if="all">
      <div  v-if="userQuizAll">
        <div v-if="loadingQuiz">
          <p>loadingQuiz data...</p>
        </div>
        <div class="grid grid-cols-2 gap-5" v-else>
          <QuizMyQuizes v-for="quiz in userQuizAll" :key="quiz" :quiz="quiz" />
        </div>
      </div>
      <div v-else>
        <div class="grid place-items-center mt-10">
          <Icon name="ph:game-controller-light" size="166" color="#CFD8E0" />
          <p class="invite-text -mt-2 mb-5">Brak quizów</p>
          <NuxtLink to="/panel/quiz/dodaj-nowy">
            <p class="font-base font-semibold primary-color place-items-center">
              Dodaj nowy quiz
              <Icon name="carbon:chevron-right" size="21" class="primary-color" />
            </p>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="mt-28" v-if="active">
      <div v-if="activeQuiz">
        <div v-if="loadingQuiz">
          <p>loadingQuiz data...</p>
        </div>
        <div class="grid grid-cols-2 gap-5" v-else>
          <QuizMyQuizes v-for="quiz in userAcceptQuiz" :key="quiz" :quiz="quiz" />
        </div>
      </div>
      <div v-else>
        <div class="grid place-items-center mt-10">
          <Icon name="ph:game-controller-light" size="166" color="#CFD8E0" />
          <p class="invite-text -mt-2 mb-5">Brak quizów</p>
          <NuxtLink to="/panel/quiz/dodaj-nowy">
            <p class="font-base font-semibold primary-color place-items-center">
              Dodaj nowy quiz
              <Icon name="carbon:chevron-right" size="21" class="primary-color" />
            </p>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="mt-28" v-if="waiting">
      <div v-if="notActiveQuiz">
        <div v-if="loadingQuiz">
          <p>loadingQuiz data...</p>
        </div>
        <div class="grid grid-cols-2 gap-5" v-else>
          <QuizMyQuizes v-for="quiz in userNotAcceptQuiz" :key="quiz" :quiz="quiz" />
        </div>
      </div>
      <div v-else>
        <div class="grid place-items-center mt-10">
          <Icon name="ph:game-controller-light" size="166" color="#CFD8E0" />
          <p class="invite-text -mt-2 mb-5">Brak quizów</p>
          <NuxtLink to="/panel/quiz/dodaj-nowy">
            <p class="font-base font-semibold primary-color place-items-center">
              Dodaj nowy quiz
              <Icon name="carbon:chevron-right" size="21" class="primary-color" />
            </p>
          </NuxtLink>
        </div>
      </div>
    </div>
    <!-- paginacja -->
  </NuxtLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useQuiz } from "@/store/useQuiz";
import { useUser } from "@/store/useUser";

definePageMeta({
  middleware: "auth",
});

const all = ref(true);
const active = ref();
const waiting = ref();

function acceptButton() {
  all.value = false;
  active.value = true;
  waiting.value = false;
}

function allButton() {
  all.value = true;
  active.value = false;
  waiting.value = false;
}

function waitingButton() {
  all.value = false;
  active.value = false;
  waiting.value = true;
}

const userStore = useUser();
const { currentUser } = storeToRefs(userStore);
await userStore.getUser();
let user = currentUser.value;

const quizStore = useQuiz();
const { activeQuiz, notActiveQuiz, allQuiz, loadingQuiz } = storeToRefs(quizStore);

const userAcceptQuiz = ref<any>("");
watch(active, async (newValue) => {
  if (newValue == true) {
    await quizStore.getActiveQuiz();
    userAcceptQuiz.value = activeQuiz.value.filter(
      (quiz: any) => quiz.user_id === user.id
    );
  }
});

const userNotAcceptQuiz = ref<any>("");
watch(waiting, async (newValue) => {
  if (newValue == true) {
    await quizStore.getNotActiveQuiz();
    userNotAcceptQuiz.value = notActiveQuiz.value.filter(
      (quiz: any) => quiz.user_id === user.id && quiz.is_active == 0
    );
  }
});

await quizStore.getAllQuiz();
let userQuizAll = allQuiz.value.filter((quiz: any) => quiz.user_id === user.id);
</script>

<style scoped>
.invite-text {
  font-style: normal;
  font-weight: 800;
  font-size: 38px;
  color: #cfd8e0;
}
</style>
