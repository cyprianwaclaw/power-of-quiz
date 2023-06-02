<template>
  <ModalAlert
    v-if="isSendQuiz"
    title="Wysłano!"
    des="Twój quiz został przesłany do nas w celu weryfikacji, gdy zostanie
  zaakceptowany poprawnie, zostaniesz o tym poinformowany"
    closeButton="Kolejny quiz"
    actionButton="Home"
    redirect="/panel"
    @close="sendQuiz1()"
  />
  <NuxtLayout name="panel">
    <h1 class="title-h1">Nowy quiz</h1>
    <h2 class="title-h2 mt-[52px] mb-8">Podstawowe informacje</h2>
    <WhiteRetangleContainer :array="[...quizArray]">
      <template #select>
        <QuizAddNewSelectOption
          :array="[...difficultyArray]"
          @select="difficultyOption"
          header="Poziom trudności"
          name="Wybierz poziom trudności"
        />
      </template>
      <template #select1>
        <QuizAddNewSelectOption
          :array="[...categoriesArray]"
          @select="categoryOption"
          header="Kategoria"
          name="Wybierz kategorie"
        />
      </template>
      <template #time>
        {{ time }}
        <div class="flex flex-row w-full place-items-center" >
          <input
            class="time"
            v-model="time"
            />
            <!-- @click="isTime()"> -->
            <!-- :placeholder="timePlaceholder"
            :style="styleObject" -->
          <p v-if="timeActive" class="font-medium pt-2">minut</p>
        </div>
        <!-- gdy jest błąd -->
      </template>
    </WhiteRetangleContainer>
    <h2 class="title-h2 mt-14 mb-8">Opis</h2>
    <WhiteRetangleContainer :array="[...desArray]" />
    <h2 class="title-h2 mt-14 mb-8">Zdjęcie</h2>
    <LazyModalContentCropImageInput @close="openModal(isImageModal)" @image-file="handleImage" />
    <h2 class="title-h2 mt-14 mb-8">Pytania</h2>
    <QuizAddNewQuestionAnswer @array="answerQuestion" />
    <!-- button do wysłania -->
    <!-- <button class="button-primary-disabled" disabled id="submit" type="submit">
      Prześlij quiz do akceptacji
    </button> -->
    <!-- <pre>
      {{ answerQuestionArray }}
      {{seletedCategory }}
      {{ image }}
      {{ desArray[0] }}
      {{ quizArray[0].value }}
    </pre> -->
    <div class="mt-12 justify-end flex mb-[72px]">
      <button
        class="button-primary w-full"
        @click="onSubmit()"
        >
        <!-- @click="validateReceivedData" -->
        Prześlij quiz do akceptacji
      </button>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, reactive } from "vue";
import { whiteRetangle } from "@/types";
import { useQuiz } from "@/store/useQuiz";
import * as Yup from "yup";
import { Form, Field } from "vee-validate";
import { onInvalidSubmit, indexBigger } from "@/utils/function";

definePageMeta({
  middleware: "auth",
});

const quizStore = useQuiz();
const { categories, newQuizId, newQuestionId } = storeToRefs(quizStore);
await quizStore.getCategory();
let category: any = categories.value;

const seletedCategory = ref();

const categoryOption = (select: any) => {
  seletedCategory.value = select;
};
const seletedDifficulty = ref();

const difficultyOption = (select: any) => {
  seletedDifficulty.value = select;
};
const categoriesArray = categories.value.map((single: any) => ({
  value: single.id,
  label: single.name,
}));

const difficultyArray = reactive([
  { value: "easy", label: "Łatwy" },
  { value: "medium", label: "Średni" },
  { value: "hard", label: "Trudny" },
]);
const quizArray = reactive<any>([
  { type: "input", template: "addNew", wrap: "soft", placeholder: "Nazwa quizu", value: '' },
  { template: "addNew", type: "time" },
  { type: "select", template: "addNew" },
  { type: "select1", template: "addNew" },
]);
const desArray = reactive([
  { type: "input", template: "addNew", wrap: "soft", placeholder: "Opis quizu", value: '' },
]);
const image = ref<any | null>(null);
const isImageModal = ref(false);
const isOpen = ref(false);


const openModal= (open:boolean)=>{
let results:boolean= false
if(open == true) results = false
else results = true
return results;
}

const handleImage = (file: File) => {
  image.value = file;
};

const answerQuestionArray = ref();
const answerQuestion = (allArray: any) => {
 answerQuestionArray.value = allArray;
};

const validateData = (allArray:any) => {
  if (
    allArray?.title == 'kk'
    ) {
    console.log(allArray);
    console.log('Jest błąd');
  } else {
    console.log(allArray);
    console.log("Wyślij quiz");
  }
};

const validateReceivedData = () => {
   validateData(answerQuestionArray.value)
};

const styleObject = reactive({
  width: "100%",
});

const isSendQuiz = ref(false);

const sendQuiz = () => {
  isSendQuiz.value = !isSendQuiz.value;
};

const sendQuiz1 = () => {
  isSendQuiz.value = !isSendQuiz.value;
  window.location.reload();
};

const time = ref()
const timeActive = ref(false);
const timePlaceholder = ref("Szacunkowy czas trwania");
const isTime = () => {
  (document.getElementById("timeInput") as any).focus();
  timeActive.value = true;
  timePlaceholder.value = "0";
  styleObject.width = "30px";
};

const onSubmit=async()=> {
   await quizStore.postNewQuiz(
    quizArray[0].value,
     time.value,
     seletedCategory.value,
     seletedDifficulty.value,
     desArray[0].value,
     image.value
   );
   let quziId = newQuizId.value
   answerQuestionArray.value.forEach(async (answer: any) => {
     await quizStore.postNewQuestion(answer.title, quziId)
     let questionId = newQuestionId.value
     answer.questions.forEach(async (question: any) =>{
       await quizStore.postNewAnswer(
        question.name,
         questionId,
         question.selected
       )})
    })
 }
</script>
<style scoped lang="scss">
.row-table-start {
  border-bottom: 1px solid #ededed;
  padding: 14px 28px 14px 8px;
  margin-left: 20px;
}
select:invalid {
  color: #a7a2a2;
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

input[type="radio"] {
  border-radius: 50%;
  width: 24px;
  height: 3px;
  margin-right: 14px;
  position: relative;
}
</style>
