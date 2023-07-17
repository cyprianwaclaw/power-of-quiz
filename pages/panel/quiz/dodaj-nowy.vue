<template>
  <ModalAlert
    :modalActive="isSendQuiz"
    title="Wysłano quiz!"
    des="Twój quiz został przesłany do nas w celu weryfikacji, gdy zostanie
  zaakceptowany, zostaniesz o tym poinformowany"
    closeButton="Kolejny quiz"
    status="success"
    actionButton="Home"
    redirect="/panel"
    @close="sendQuiz()"
  />
  <NuxtLayout name="panel">
    <Form @submit="onSubmit" ref="form" :validation-schema="schema" v-slot="{ meta }">
      <h1 class="title-h1">Nowy quiz</h1>
      <div class="grid grid-cols-1 md:grid-rows-2 md:grid-cols-2 gap-10">
        <div class="row-start-1">
          <h2 class="title-h2  mb-3">Podstawowe informacje</h2>
          <WhiteRetangleContainer :array="[...quizArray]">
            <template #select>
          <QuizAddNewSelectOption
          :array="[...difficultyArray]"
          @selected="difficultyOption"
          :reset="isReset"
          header="Poziom trudności"
          name="Wybierz poziom trudności"
          />
        </template>
        <template #select1>
          <QuizAddNewSelectOption
          :array="[...categoriesArray]"
          @selected="categoryOption"
          :reset="isReset"
          header="Kategoria"
          name="Wybierz kategorie"
          />
        </template>
        <template #time>
          <div class="flex flex-row w-full place-items-center" @click="isTime()">
            <CustomField
              name="time"
              mode="aggressive"
              maxlength="2"
              :placeholder="timePlaceholder"
              :style="styleObject"
            />
            <p v-if="timeActive" class="font-medium pt-[6px]">minut</p>
          </div>
        </template>
      </WhiteRetangleContainer>
    </div>
      <div class="row-start-2 content-start">
        <h2 class="title-h2  mb-4">Opis</h2>
        <LazyWhiteRetangleContainer :array="[...desArray]" />
    </div>
    <div class="md:row-start-1">
      <h2 class="title-h2 mt-10 mb-4 md:mt-0">Zdjęcie</h2>
      <LazyModalContentCropImageInput
        @close="openModal(isImageModal)"
        @imageFile="handleImage"
        :test="image"
      />
    </div>
  </div>
      <div class="">
      <h2 class="title-h2">Pytania</h2>
      <LazyQuizAddNewQuestionAnswer1 :array="questionArray"/>
      </div>
      <div class="mt-12 justify-end flex mb-[72px]">
        <button class="button-primary" v-if="submitButton(meta)">Prześlij do akceptacji</button>
        <p v-else class="button-primary-disabled text-center" disabled>Prześlij do akceptacji</p>
      </div>
    </Form>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, reactive } from "vue";
import { useQuiz } from "@/store/useQuiz";
import * as yup from "yup";
import { Form, Field, useForm } from "vee-validate";

definePageMeta({
  middleware: "auth",
});

const schema = yup.object({
  time: yup
    .string()
    .matches(/^[0-9]*$/, "Wpisz liczbę")
    .max(2, "Quiz nie może być dłuższy niż 99 minut"),
});

const quizStore = useQuiz();
const { categories, newQuizId, newQuestionId } = storeToRefs(quizStore);
await quizStore.getCategory();
const isReset = ref()
const seletedCategory = ref();
const categoryOption = (select: any) => {
  seletedCategory.value = select;
};
const categoriesArray = categories.value.map((single: any) => ({
  value: single.id,
  label: single.name,
}));

const time1 = ref()

const seletedDifficulty = ref();
const difficultyOption = (select: any) => {
  seletedDifficulty.value = select;
};
const difficultyArray = reactive([
  { value: "easy", label: "Łatwy" },
  { value: "medium", label: "Średni" },
  { value: "hard", label: "Trudny" },
]);

const quizArray = reactive<any>([
  {
    type: "input",
    template: "addNew",
    wrap: "soft",
    placeholder: "Nazwa quizu",
    value: "",
    maxlength: 80,
  },
  { template: "addNew", type: "time" },
  { type: "select", template: "addNew" },
  { type: "select1", template: "addNew" },
]);

const desArray = reactive([
  {
    type: "input",
    template: "addNew",
    wrap: "soft",
    placeholder: "Opis quizu",
    maxlength: 400,
    value: "",
  },
]);
const image = ref<any | null>(null);
const isImageModal = ref(false);

const openModal = (open: boolean) => {
  let results: boolean = false;
  if (open == true) results = false;
  else results = true;
  return results;
};

const handleImage = (file: File) => {
  image.value = file;
};

const questionArray = ref([
   {
   title: "",
   answers: [
       { answer: "", correct: false },
       { answer: "", correct: false },
       { answer: "", correct: false },
       { answer: "", correct: false },
     ],
   },
])

const styleObject = reactive({
  width: "100%",
});
const isSendQuiz = ref(false);
const sendQuiz = () => {
  isSendQuiz.value = !isSendQuiz.value;
};

const timeActive = ref(false);
const timePlaceholder = ref("Szacunkowy czas trwania");
const isTime = () => {
  timeActive.value = true;
  timePlaceholder.value = "0";
  styleObject.width = "30px";
};

const onSubmit = async (values: any) => {
  sendQuiz()
  await quizStore.postNewQuiz(
    quizArray[0].value,
    values.time,
    seletedCategory.value,
    seletedDifficulty.value,
    desArray[0].value,
    image.value
    );
    let quziId = newQuizId.value;
    questionArray.value?.forEach(async (answerQuestion: any) => {
      await quizStore.postNewQuestion(answerQuestion.title, quziId);
      let questionId = newQuestionId.value;
      answerQuestion.answers.forEach(async (answer: any) => {
        await quizStore.postNewAnswer(answer.answer, questionId, answer.correct);
      });
    });

//   setTimeout(() => {
//     console.log(values)
//     clearAll(values)
//     console.log(values)
//  }, 500);

}

const submitButton = (meta: any) => {
  if (
    quizArray[0].value &&
    seletedCategory &&
    seletedDifficulty &&
    meta.valid &&
    image.value &&
    checkQuestion(questionArray.value) ){
    return true;
  } else {   
    return false;
  }
}

// const clearAll = (time:any) => {
//   quizArray.forEach((item:any) => {
//     if (item.type === 'input') {
//       item.value = '';
//     }
//   });

//   desArray.forEach((item:any) => {
//     if (item.type === 'input') {
//       item.value = '';
//     }
//   });
//   if (answerQuestionArray.value) {
//     answerQuestionArray.value.forEach((question:any) => {
//       question.title = '';
//       if (question.answers) {
//         question.answers.forEach((answer:any) => {
//           answer.answer = '';
//           answer.correct = false;
//         });
//       }
//     });
//   }
//   time.time = undefined
//   timeActive.value = false
//   timePlaceholder.value = "Szacunkowy czas trwania"
//  styleObject.width = "300px"
//   answerQuestionArray.value?.splice(1)
// image.value = 'brak'
// isReset.value = 'true'
// setTimeout(() => {
//   isReset.value = undefined;
// }, 200);
// };


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
  color: $icon;
}
</style>
