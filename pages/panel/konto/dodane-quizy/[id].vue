<template>
  <ModalAlert
    :modalActive="isOpen"
    title="Usuń quiz"
    des="Czy na pewno chcesz usunąć quiz? Tej operacji nie będzie można cofnąć"
    closeButton="Anuluj"
    actionButton="Usuń"
    actionButtonClass="text-red-500"
    @close="isModal()"
    @action="removeQuiz"
  />
  <ModalAlert
    :modalActive="isRemoveSucessModal"
    title="Usunięto quiz"
    des="Twój quiz został usunięty"
    closeButton="Okej"
    @close="removeSuccessClose()"
  />
  <NuxtLayout name="single-quiz">
    <p class="hidden md:flex md:text-[32px] md:font-medium md:mr-8 md:mt-4 md:mb-10">
      {{singleQuiz.title }}
    </p>    
    <div class="grid grid-cols-2 md:gap-20">
      <div class="flex flex-col md:hidden" >
        <img :src="singleQuiz.image" class="image-single" />
        <p class="md:hidden text-[22px] font-medium mr-8 mt-4 mb-10">
          {{singleQuiz.title }}
        </p>
        <WhiteRetangleContainer :array="[...quizArray]" />
        <p
        class="text-[18px] font-semibold mb-[3px] mt-9"
        v-if="quizStore.singleQuiz.description"
        >
        Opis
      </p>
      <p class="text" v-if="quizStore.singleQuiz.description">
        {{ quizStore.singleQuiz.description }}
      </p>
    </div>
  <div>
    <p class="text-[19px] font-semibold mb-[16px]">Pytania do quizu</p>
    <WhiteRetangleContainer 
    :array="[...questionArray]" 
    />
  </div>
  <div class="md:flex md:flex-col hidden" >
    <img :src="singleQuiz.image" class="image-single" />
    <p class="md:hidden text-[22px] font-medium mr-8 mt-4 mb-10">
      {{singleQuiz.title }}
    </p>
    <div class="white-retangle1 mt-10">
      <div class="row-table1 place-items-center"
      v-for="(single, index) in quizArray" :key="index"
      :class="[index==4 ? '': 'border-own1']"
      >
      <p class="text-[16px]">{{ single.des }}:</p>
      <p class="text-[16px] font-medium primary-color ml-1">{{ single.text }}</p>
        </div>
      </div>
    <p
    class="text-[18px] font-semibold mb-[3px] mt-9"
    v-if="quizStore.singleQuiz.description"
    >
    Opis
  </p>
  <p class="text" v-if="quizStore.singleQuiz.description">
    {{ quizStore.singleQuiz.description }}
  </p>
</div>
</div>
  <div class="mt-12 flex gap-6 mb-2 justify-end">
      <button @click="isModal()">
        <p class="action-button red">Usuń quiz</p>
      </button>
      <NuxtLink :to="`/panel/konto/dodane-quizy/edycja${route.params.id}`">
        <button class="button-primary-small">Edytuj</button>
      </NuxtLink>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useQuiz } from "@/store/useQuiz";

const route = useRoute();
const answers: any[] = reactive([]);
const isOpen = ref(false);
const quizStore = useQuiz();
await quizStore.getSingleQuiz(route.params.id);
await quizStore.getQuestion(route.params.id);
const {singleQuiz, allQuestion, answerForSingleQuiz, answerById}= storeToRefs(quizStore);
let question: any = allQuestion.value;
let quiz: any = singleQuiz.value;
 const isModal = () => {
   isOpen.value = !isOpen.value;
  };
  const isRemoveSucessModal = ref(false);
  const removeSuccess = () => {
    isRemoveSucessModal.value = !isRemoveSucessModal.value;
  };
  const removeQuiz = async () => {
    isModal();
    await quizStore.deleteSingleQuiz(route.params.id);
    removeSuccess();
  };
  const removeSuccessClose = () => {
    navigateTo("/panel/konto/dodane-quizy");
  };
  
  
  const quizArray = reactive([
    { text: changeStatus(quiz.is_active), des: "Status quizu" },
    { text: categoryMapping(quizStore.categories, quiz), des: "Kategoria" },
    { text: quiz.questions_count, des: "Liczba pytań" },
    { text: changeDifficult(quiz.difficulty), des: "Poziom trudności" },
    { text: quiz.time, des: "Szacunkowy czas trwania" },
  ]);
  
  for (let quest of question) {
    await quizStore.getAnswerById(quest.id);
    answers.push(answerById.value);
  }

const answerByIdArray = (id:number)=>{
  const answerNew = answers.flat()
 const filtered:any = answerNew.filter((element:any) =>element.question_id === id)
 return filtered
}
const questionArray = question.map((element: any, index: number) => ({
  //  des: element.id,
  template: 'question',
  text: 'Pytanie ' + (index + 1),
  answer: answerByIdArray(element.id),
question:  element.question,
}));
//{ text: "testowa ikona", template: true,  link: "/",  firstIcon:"ph:gear-light"},
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.action-button {
  letter-spacing: 0.05em;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 600;
  padding: 6px 16px 6px 16px;
}
.border-own1 {
  border-bottom: 1px solid $border;
}
.image-single {
  border: 1px solid $border;
  border-radius: 16px;
  height: 240px;
  object-fit: cover;
}
.row-table1 {
  padding: 10px 14px 10px 10px;
  display: flex;
}
.white-retangle1 {
  background-color: white;
  border-radius: 16px;
  padding-left: 21px;
  padding-bottom: 6px;
  padding-top: 6px;
}
</style>
