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
    <img :src="singleQuiz.image" class="image-single" />
    <p class="text-[22px] font-medium mr-8 mt-4 mb-10">
      {{singleQuiz.title }}
    </p>
    <!-- {{ singleQuiz }}
    <pre>
     {{  answers.flat()}}
      ! lista wszystkich odpowiedzi do danego pytania
      {{ answerById }}
      ! lista wszystkich pytań do danego quizu
       {{allQuestion}}
      </pre> -->

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
  <p class="text-[18px] font-semibold mb-[15px] mt-9">Pytania</p>
  
  <WhiteRetangleContainer 
  :array="[...questionArray]" 
  />

    <div class="mt-12 flex gap-6 mb-2 justify-end">
      <button @click="isModal()">
        <p class="action-button red">Usuń</p>
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
.image-single {
  border: 1px solid $border;
  border-radius: 12px;
  height: 240px;
}

.text-des-mobile-add {
  font-size: 14px;
  font-weight: 300;
  color: #a7a2a2;
  margin-top: 2px;
  margin-bottom: -6px;
  z-index: 10;
}

.quest-text {
  font-size: 16px;
  margin-left: 28px;
  margin-top: 6px;
  margin-bottom: 6px;
  font-weight: 600;
}
.row_table_end {
  border-bottom: transparent;
  padding: 14px 28px 4px 8px;
  margin-left: 20px;
}
.row_table_start {
  border-bottom: 1px solid #ededed;
  padding: 14px 28px 14px 8px;
  margin-left: 20px;
}

.button-remove {
  background-color: transparent;
  border: solid 1px $color-error;
  padding: 10px 23px;
  color: $color-error;
  font-family: $family;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  letter-spacing: 0.05em;
  display: block;
  border-radius: 8px;
  transition: color 0.3s ease-in-o;
}

.row-table-start {
  border-bottom: 1px solid #ededed;
  padding: 14px 28px 14px 8px;
  margin-left: 20px;
}
select:invalid {
  color: $text-black;
  font-size: 16px;
}

select::-ms-expand {
  display: none;
}
select {
  overflow: hidden !important;
  overflow: -moz-hidden-unscrollable !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  appearance: none !important;
  font-size: 16px;
  font-weight: 500;
  box-shadow: none;
  outline: none;
  background: transparent;
  background-repeat: no-repeat;
}

.base-input-new-quiz,
.base-input-new-quiz:focus {
  font-size: 16px;
  margin-top: 4px;
  font-weight: 500;
  width: 100%;
}

.time {
  border-color: white;
  padding: 0px;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: -2.5px;
}
.time::placeholder {
  font-size: 16px;
  font-weight: 500;
}

.base-input-new-quiz::placeholder {
  font-size: 16px;
  font-weight: 500;
}
.text-des-mobile-add {
  font-size: 14px;
  font-weight: 300;
  color: #a7a2a2;
  margin-top: 2px;
  margin-bottom: -6px;
  z-index: 10;
}
.font1 {
  font-size: 16px;
  font-weight: 500;
}
.time1 {
  margin-bottom: 3px;
  margin-left: 2px;
}
.button-modal1 {
  letter-spacing: 0.02em;
  margin-top: 4px;
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 600;
}
.edit-message-modal {
  line-height: 24px;
  font-weight: 400;
  font-size: 15px;
  text-align: center;
  margin-top: 10px;
}
.edit-message-modal-title {
  line-height: 27px;
  font-weight: 600;
  font-size: 21px;
  text-align: center;
}
.modal-view-update {
  background-color: white;
  border: solid transparent;
  border-radius: 24px;
  margin-left: 54px;
  margin-right: 54px;
  position: absolute;
  left: 0;
  right: 0;
  top: 25%;
  z-index: 100;
}
.border-top {
  border-top: 1px solid #e0e0e0 !important;
  padding-top: 6px;
  padding-bottom: 6px;
  display: flex;
  padding-right: 16px;
}
.image-retangle {
  display: flex;
  flex-direction: column;
  padding: 36px 37px;
  background: #f7f7f7;
  border: 2px dashed #9f9f9f;
  border-radius: 16px;
}

input[type="file"]::file-selector-button {
  display: hidden;
}
input[type="file"] {
  border: none;
  display: flex;
  justify-content: center;
}
.image-retangle h1 {
  text-align: center;
  margin-top: -6px;
  font-weight: 600;
  color: #9c9c9c;
}
.image-retangle p {
  text-align: center;
  margin-top: 2px;
  font-weight: 400;
  font-size: 14px;
  color: #9c9c9c;
  margin-bottom: 12px;
}
.white-retangle-image {
  background-color: white;
  border-radius: 24px;
  padding: 33px;
}
.quest-text {
  font-size: 16px;
  margin-left: 28px;
  margin-top: 6px;
  margin-bottom: 6px;
  font-weight: 600;
}
.margin {
  margin-top: 36px;
}
.vl {
  border-left: 1px solid #e0e0e0 !important;
  margin-top: 3px;
  margin-bottom: 3px;
}

.edit-quest {
  font-size: 13px;
  font-weight: 500;
  text-align: end;
  padding: 12px 25px 5px 12px;
}

textarea {
  outline: none;
  font-size: 16px;
  font-weight: 500;
  width: 100%;
  overflow: hidden;
  min-height: 30px;
  max-height: 100px;
  border-color: white;
}
textarea::placeholder {
  font-size: 16px;
}
textarea:focus::placeholder {
  font-size: 0px;
}

input {
  outline: none;
  font-size: 16px;
  width: 100%;
  overflow: hidden;
  min-height: 30px;
  padding: 0px;
  max-height: 100px;
  font-weight: 500;
  border-color: white;
}
input::placeholder {
  font-size: 16px;
}
input:focus::placeholder {
  font-size: 0px;
}

.default-file-input {
  opacity: 0;
}

input[type="radio"] {
  border-radius: 50%;
  width: 24px;
  height: 3px;
  margin-right: 14px;
  position: relative;
}

.imagehidden {
  display: none;
}

.times {
  width: 32px;
  margin-top: 2px;
}
</style>
