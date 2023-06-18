<template>
  <ModalAlert
    :modalActive="isSendQuiz"
    title="Wysłano!"
    des="Twój quiz został przesłany do nas w celu weryfikacji, gdy zostanie
  zaakceptowany, zostaniesz o tym poinformowany"
    closeButton="Kolejny quiz"
    actionButton="Home"
    redirect="/panel"
    @close="sendQuiz()"
    @closeButtonClick="clearAll()"
  />
  <NuxtLayout name="panel">
    <p @click="clearAll()">sas</p>
    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ values }">
      <h1 class="title-h1">Nowy quiz</h1>
      <h2 class="title-h2 mt-[28px] mb-3">Podstawowe informacje</h2>
      <WhiteRetangleContainer :array="[...quizArray]">
        <template #select>
          <QuizAddNewSelectOption
          :array="[...difficultyArray]"
          @selected="difficultyOption"
          header="Poziom trudności"
          name="Wybierz poziom trudności"
          />
        </template>
        <template #select1>
          <QuizAddNewSelectOption
          :array="[...categoriesArray]"
          @selected="categoryOption"
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
      <h2 class="title-h2 mt-10 mb-4">Opis</h2>
      <LazyWhiteRetangleContainer :array="[...desArray]" />
      <h2 class="title-h2 mt-10 mb-4">Zdjęcie</h2>
      {{ image }}
      <LazyModalContentCropImageInput
        @close="openModal(isImageModal)"
        @imageFile="handleImage"
        :test="image"
      />
      <h2 class="title-h2 mt-10 -mb-1.5">Pytania</h2>
      <LazyQuizAddNewQuestionAnswer @array="answerQuestion" />
      <div class="mt-12 justify-end flex mb-[72px]">
        <button
          class="button-primary w-full"
          v-if="submitButton(values)">
          Prześlij quiz do akceptacji
        </button>
        <p class="button-primary-disabled w-full" disabled v-else>
          Prześlij quiz do akceptacji
        </p>
      </div>
    </Form>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, reactive } from "vue";
import { useQuiz } from "@/store/useQuiz";
import * as yup from "yup";
import { Form, Field } from "vee-validate";

definePageMeta({
  middleware: "auth",
});

const emit = defineEmits(['delete'])

const schema = yup.object({
  time: yup
    .string()
    .matches(/^[0-9]*$/, "Wpisz liczbę")
    .max(2, "Quiz nie może być dłuższy niż 99 minut"),
});

const quizStore = useQuiz();
const { categories, newQuizId, newQuestionId } = storeToRefs(quizStore);
await quizStore.getCategory();

const seletedCategory = ref(null);
const categoryOption = (select: any) => {
  seletedCategory.value = select;
};
const categoriesArray = categories.value.map((single: any) => ({
  value: single.id,
  label: single.name,
}));

const seletedDifficulty = ref(null);
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
const isOpen = ref(false);

const openModal = (open: boolean) => {
  let results: boolean = false;
  if (open == true) results = false;
  else results = true;
  return results;
};

const handleImage = (file: File) => {
  image.value = file;
};

const answerQuestionArray = ref();
const answerQuestion = (allArray: any) => {
  answerQuestionArray.value = allArray;
};

const styleObject = reactive({
  width: "100%",
});
const isSendQuiz = ref(false);
const sendQuiz = () => {
  isSendQuiz.value = !isSendQuiz.value;
};
const clearAll = () => {
  quizArray.forEach((item:any) => {
    if (item.type === 'input') {
      item.value = '';
    }
  });

  desArray.forEach((item:any) => {
    if (item.type === 'input') {
      item.value = '';
    }
  });

  if (answerQuestionArray.value) {
    answerQuestionArray.value.forEach((question:any) => {
      question.title = '';
      if (question.answers) {
        question.answers.forEach((answer:any) => {
          answer.answer = '';
          answer.correct = false;
        });
      }
    });
  }
  answerQuestionArray.value?.splice(1)
image.value = 'brak'
emit('delete')
  seletedCategory.value = null;
  seletedDifficulty.value = null;
};



const timeActive = ref(false);
const timePlaceholder = ref("Szacunkowy czas trwania");
const isTime = () => {
  timeActive.value = true;
  timePlaceholder.value = "0";
  styleObject.width = "30px";
};

const onSubmit = async (values: any) => {
  let { time } = values
  sendQuiz()
  await quizStore.postNewQuiz(
    quizArray[0].value,
    time,
    seletedCategory.value,
    seletedDifficulty.value,
    desArray[0].value,
    image.value
    );
  let quziId = newQuizId.value;
  answerQuestionArray.value?.forEach(async (answerQuestion: any) => {
    await quizStore.postNewQuestion(answerQuestion.title, quziId);
    let questionId = newQuestionId.value;
    answerQuestion.answers.forEach(async (answer: any) => {
      await quizStore.postNewAnswer(answer.answer, questionId, answer.correct);
    });
  });
};

const submitButton = (values: any) => {
  let { time } = values;
  if (
    time &&
    quizArray[0].value &&
    seletedCategory &&
    seletedDifficulty &&
    image.value &&
    answerQuestionArray.value?.every(
      (answerQuestion: any) => answerQuestion.title.length > 3
    ) &&
    answerQuestionArray.value?.every((item: any) =>
      item.answers?.every((answer: any) => answer.answer.length > 3)
    ) &&
    answerQuestionArray.value?.every((item: any) =>
      item.answers.some((answer: any) => answer.correct)
    )
  ) {
    return true
  } else {
    return false
  }
};
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
