<template>
  <ModalAlert
    :modalActive="isOpen"
    name="Premium"
    title="Brak dostępu"
    status="error"
    des="Ta część serwisu jest dostępna wyłącznie dla użytkowników z pakietem Premium. Wykup subskrypcję aby zyskać dostęp do tej sekcji"
    closeButton="Zamknij"
    @close="isAlert"
    actionButton="Zobacz pakiety"
    />
    <!-- redirect="/panel/pakiety" -->
  <ModalAlert :modalActive="isOpenDesktop" name="singleQuiz" @close="isCloseDesktop()">
    <template #content>
      <ModalContentSingleQuizAlert :quiz="quiz" />
    </template>
  </ModalAlert>

  <ModalDown :modalActive="isOpenMobile" title="Quiz" @close="isCloseMobile">
    <template #content>
      <ModalContentSingleQuiz :quiz="quiz" />
    </template>
  </ModalDown>
  <div
    v-if="!hasPremium.has_premium  "
    class="border-transparent rounded-[24px] lg:rounded-[12px] w-[260px] lg:w-full"
    :style="`background-image: url(${quiz.image}); background-size: cover;`"
    @click="isAlert()"
  >
    <!-- nie ma premium -->
    <div
      class="bg-image w-[260px] lg:w-full rounded-[24px] lg:rounded-[12px] cursor-pointer"
    >
      <div class="details">
        <h3 class="title hover:underline-offset-4">{{ quiz.title }}</h3>
        <div class="flex mt-3 gap-3 float-left">
          <!-- <p class="des">{{ quiz.questions_count }} pytań</p>
          <div class="vl"></div> -->
          <p class="des">{{ quiz.time }} min</p>
          <div class="vl"></div>
          <p class="des">{{ changeDifficult(quiz.difficulty) }}</p>
          <div class="vl"></div>
          <p class="des">{{ categoryMapping(categories, quiz) }}</p>
        </div>
      </div>
    </div>
  </div>
  <!-- ma premium -->
  <div
    v-else
    class="border-transparent rounded-[24px] lg:rounded-[12px] w-[260px] lg:w-full"
    :style="`background-image: url(${quiz.image}); background-size: cover;`"
    @click="isModal()"
  >
    <div
      class="bg-image w-[260px] lg:w-full rounded-[24px] lg:rounded-[12px] cursor-pointer"
    >
      <div class="details">
        <h3 class="title hover:underline-offset-4">{{ quiz.title }}</h3>
        <div class="flex mt-3 gap-3 float-left">
          <!-- <p class="des">{{ quiz.questions_count }} pytań</p>
        <div class="vl"></div> -->
          <p class="des">{{ quiz.time }} min</p>
          <div class="vl"></div>
          <p class="des">{{ changeDifficult(quiz.difficulty) }}</p>
          <div class="vl"></div>
          <p class="des">{{ categoryMapping(categories, quiz) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Quiz } from "@/types";
import { useUser } from "@/store/useUser";
import { useQuiz } from "@/store/useQuiz";
import { storeToRefs } from "pinia";

defineProps<{ quiz: Quiz }>();

const { hasPremium } = storeToRefs(useUser());
const { categories } = storeToRefs(useQuiz());
const userPlan = hasPremium;
const isOpen = ref(false);
const isOpenMobile = ref(false);
const isOpenDesktop = ref(false);

const isModal = () => {
  if (window.screen.width <= 900) {
    isOpenMobile.value = true;
    // console.log(window.screen.width);
  } else {
    isOpenDesktop.value = true;
  }
};

const isCloseMobile = () => {
  isOpenMobile.value = false;
};
const isCloseDesktop = () => {
  isOpenDesktop.value = false;
};
const isAlert = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style scoped>
.bg-image {
  position: relative;
  height: 260px;
  background: linear-gradient(
    27.47deg,
    rgba(0, 0, 0, 0.77) 31.09%,
    rgba(0, 0, 0, 0) 79.45%
  );
}
.details {
  position: absolute;
  bottom: 24px;
  margin-left: 24px;
  margin-right: 24px;
}
.title {
  color: white;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
}

.des {
  color: white;
  font-weight: 300;
  font-size: 14px;
  line-height: 22px;
}
.vl {
  border-left: 1px solid white;
  margin-top: 3px;
  margin-bottom: 3px;
}
</style>
