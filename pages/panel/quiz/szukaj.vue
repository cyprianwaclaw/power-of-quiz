<template>
    <div>
      <div class="fixed z-50 left-0 bottom-0 w-full" v-if="isOpen">
        <div class="dark-blur-background"></div>
        <div class="modal-view h-80">
          <div class="flex columns-2 w-full justify-between mb-8">
            <p class="font-medium text-2xl">Filtruj quizy</p>
            <Icon name="carbon:close" size="30" class="black-color w-12" @click="Modal()" />
          </div>
          <div class="mt-2" @click="Modal()">
            <NuxtLink to="/panel/quiz/dodaj-nowy">
              <div class="flex columns-2 w-full mb-2 place-items-center">
                <Icon
                  name="ph:lightning-fill"
                  color="D19D38"
                  size=""
                  class="gold circle-icon"
                />
                <p class="ml-5 text-base">Nowy quiz</p>
              </div>
            </NuxtLink>
          </div>
          <div class="mt-5" @click="Modal()">
            <div class="flex columns-2 w-full mb-2 place-items-center">
              <Icon
                name="ph:user-circle-plus-fill"
                color="26AB22"
                size=""
                class="green circle-icon"
              />
              <p class="ml-5 text-base">Skopiuj link polecający</p>
            </div>
          </div>
          <div class="mt-5" @click="Modal()">
            <NuxtLink to="/panel/konto/srodki/wyplata">
              <div class="flex columns-2 w-full mb-2 place-items-center">
                <Icon
                  name="ph:wallet-fill"
                  color="2B3BC7"
                  size=""
                  class="blue circle-icon"
                />
                <p class="ml-5 text-base">Wypłać środki</p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="fixed margin z-10 flex w-full justify-end">
          <div class="open-filter" @click="Modal">
            <Icon name="ph:faders" size="32" color="white" />
          </div>
      </div>
      <NuxtLayout name="panel">
          <h1 class="title-h1 mb-4">Wyniki dla:</h1>
          {{ quiz.formattedCart.slice(-1)[0]?.title }}
          <div v-for="quiz in searchInput" :key="quiz" class="mb-6">
              <QuizSearchCard :quiz="quiz" />
          </div>
        <div class="h-44"></div>
      </NuxtLayout>
    </div>
  </template>
  
  <script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { useQuiz } from "@/store/useQuiz";
  import { usePersistCart } from "@/utils/hooks";

  definePageMeta({
    middleware: "auth",
  });
  
  usePersistCart();

  const quiz = useQuiz();
  const { allQuiz, allQuizName, formattedCart } = storeToRefs(quiz);
  await quiz.getAllName();
  let all = allQuiz.value;
  const isOpen = ref(false);
  function Modal() {
    isOpen.value = !isOpen.value;
  }
  
let formatted = formattedCart.value

  watch(formatted,  (oldValue,newValue)=>{
    console.log('test')
  })
 
  let search = 'e'

  const searchInput: any = computed(() => {
  return allQuizName.value.filter((quiz: any) =>
    quiz.title.toLowerCase().includes(search)
  );
});

  </script>
  <style scoped>
  .margin {
    margin-top: 450px;
  }
  .open-filter {
    color: white;
    background-color: #618cfb;
    padding: 8px 6px 8px 9px;
    border: 1px solid transparent;
    border-radius: 14px 0px 0px 14px;
  }
  </style>
  