<template>
  <div v-if="!hasPremium">
    <ModalAlert
    :modalActive="isOpen"
    name="Premium"
    status="error"
    title="Brak dostępu"
    des="Ta sekcja wymaga pakietu Premium. Dołącz już teraz i ciesz się pełnymi możliwościami"
    closeButton="Zamknij"
    actionButton="Zobacz pakiety"
    redirect="/panel/pakiety"
    @close="isClose"
  />
        <div class="card bg-size" :style="`background-image: url(${quiz?.image})`" @click="isClose()">
          <div class="bg-image">
            <div class="details">
              <h3 class="title">{{ quiz?.title }}</h3>
              <div class="float-left flex mt-3 gap-3">
                <p class="des">{{ quiz?.questions_count }} pytań</p>
                <div class="vl"></div>
                <p class="des">{{ quiz?.time }} min</p>
                <div class="vl"></div>
                <p class="des">{{ quiz?.difficulty }}</p>
                <div class="vl"></div>
                <p class="des">{{ categoryMapping(categories, quiz)?.name }}</p>
              </div>
            </div>
          </div>
        </div>
  </div>
  <div v-else>
    <!-- <div v-if="isQuiz"> -->
      <ModalDown
      :modalActive="isQuiz"
      title="Quiz"
      @close= "isQuizClose" 
      >
      <template #content>
        <ModalContentSingleQuiz
        :quiz="quiz"
        />
        </template>
        </ModalDown>
    <!-- </div> -->
      <!-- <NuxtLink :to="`/panel/quiz/${quiz?.id}`"> -->
        <div class="card bg-size" :style="`background-image: url(${quiz?.image})`" @click="isQuizClose()">
        <div class="bg-image">
          <div class="details">
            <h3 class="title">{{ quiz?.title }}</h3>
            <div class="float-left flex mt-3 gap-3">
              <p class="des">{{ quiz?.questions_count }} pytań</p>
              <div class="vl"></div>
              <p class="des">{{ quiz?.time }} min</p>
              <div class="vl"></div>
              <p class="des">{{ quiz?.difficulty }}</p>
              <div class="vl"></div>
              <p class="des">{{ categoryMapping(categories, quiz)?.name }}</p>
            </div>
          </div>
        </div>
    <!-- </NuxtLink> -->
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
const {categories } = storeToRefs(useQuiz());

const isOpen = ref(false)
const isClose = ()=>{
    isOpen.value =! isOpen.value
}

const isQuiz = ref(false)
const isQuizClose = ()=>{
    isQuiz.value =! isQuiz.value
}
</script>

<style scoped>
@media only screen and (max-width: 520px) {
  .card {
    border-radius: 24px;
    margin-top: 32px;
  }
  .bg-image {
    width: 100%;
    position: relative;
    border-radius: 24px;
    height: 270px;
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
}

@media only screen and (min-width: 520px) {
  .card {
    border-radius: 24px;
    margin-top: 12px;
  }
  .bg-image {
    width: 100%;
    position: relative;
    border-radius: 24px;
    height: 270px;
    background: linear-gradient(
      27.47deg,
      rgba(0, 0, 0, 0.77) 31.09%,
      rgba(0, 0, 0, 0) 79.45%
    );
  }
  .details {
    position: absolute;
    bottom: 20px;
    margin-left: 12px;
    margin-right: 12px;
  }
  .title {
    color: white;
  }

  .des {
    font-weight: 500;
    font-size: 12px;
  }
  .vl {
    border-left: 1px solid whitey;
    margin-top: 3px;
    margin-bottom: 3px;
  }
}

.bg-size{
  background-size: cover;

}
</style>
