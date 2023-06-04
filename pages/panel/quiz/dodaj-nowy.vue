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
    <Form>
    <h1 class="title-h1">Nowy quiz</h1>
    <pre>{{ values }}</pre>
    <h2 class="title-h2 mt-[28px] mb-3">Podstawowe informacje</h2>
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
        <div class="flex flex-row w-full place-items-center" @click="isTime()">
          <input
            v-model="time"
            :placeholder="timePlaceholder"
            :style="styleObject"
            />
          <p v-if="timeActive" class="font-medium pt-[6px]">minut</p>
        </div>
        <!-- gdy jest błąd -->
      </template>
    </WhiteRetangleContainer>
    <h2 class="title-h2 mt-10 mb-4">Opis</h2>
    <WhiteRetangleContainer :array="[...desArray]" />
    <h2 class="title-h2 mt-10 mb-4">Zdjęcie</h2>
    <LazyModalContentCropImageInput @close="openModal(isImageModal)" @image-file="handleImage" />
    <h2 class="title-h2 mt-10 mb-4">Pytania</h2>
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
        @click="onSubmit"
        >
        <!-- @click="validateReceivedData" -->
        Prześlij quiz do akceptacji
      </button>
    </div>
  </Form>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, reactive } from "vue";
import { useQuiz } from "@/store/useQuiz";
import * as Yup from "yup";
import { Form, Field } from "vee-validate";

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
//  window.location.reload();
};

const time = ref()
const timeActive = ref(false);
const timePlaceholder = ref("Szacunkowy czas trwania");
const isTime = () => {
  timeActive.value = true;
  timePlaceholder.value = "0";
  styleObject.width = "30px";
};

const onSubmit=async()=> {
   await quizStore.postNewQuiz(quizArray[0].value,time.value, seletedCategory.value, seletedDifficulty.value, desArray[0].value, image.value)
   let quziId = newQuizId.value
   answerQuestionArray.value.forEach(async (answer: any) => {
     await quizStore.postNewQuestion(answer.title, quziId)
     let questionId = newQuestionId.value
     answer.questions.forEach(async (question: any) =>{
       await quizStore.postNewAnswer(
        question.name,
         questionId,
         question.selected
       )})})}
</script>
<style scoped lang="scss">
@import "@/assets/style/variables.scss";

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
  font-weight: 400;
  color:$icon;
}
</style>
