<template>
  <ModalAlert
    :modalActive="isSendQuiz"
    title="Zapisano"
    des="Prawidłowo zapisano wszystkie zmiany, które wprowadiłeś"
    closeButton="Okej"
    @close="removeSuccessClose()"
  />  
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
  <NuxtLayout name="panel">
    <div class="mb-12 flex justify-end -mr-3">
      <NuxtLink
        :to="`/panel/konto/dodane-quizy/${route.params.id}`"
        class="flex border-transparent rounded-lg py-2 px-3"
      >
        <Icon name="ph:caret-right-bold" size="22" class="primary-color back-arrow" />
        <p class="go primary-color">Powrót</p>
      </NuxtLink>
    </div>
    <div v-if="!image">
      <img :src="single.image" class="image-single" />
    </div>
    <LazyModalContentCropImageInput
      image="true"
      @close="openModal(isImageModal)"
      @image-file="handleImage"
    />
    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ meta }" :initial-values="formValues">
      <!-- {{ meta }} -->
      <WhiteRetangleContainer :array="[...quizArray]" class="mt-10">
        <template #select>
          <QuizAddNewSelectOption
            v-model="selectedDifficulty"
            :defaultOption="defaultDifficulty"
            :array="[...difficultyArray]"
            @selected="DifficultyOption"
            header="Poziom truności"
          />
        </template>
        <template #select1>
          <QuizAddNewSelectOption
            v-model="selectedCategory"
            :defaultOption="defaultCategory"
            :array="[...categoriesArray]"
            @selected="categoryOption"
            header="Kategoria"
          />
        </template>
        <template #time>
          <div class="flex flex-row w-full place-items-center">
            <CustomField
              class="w-6"
              name="time"
              placeholder="0"
              maxlength="2"
              mode="aggressive"
              :initial-value="single.time"
              />
            {{  test}}
            <p class="font-medium pt-[6px] ml-1">minut</p>
          </div>
        </template>
      </WhiteRetangleContainer>
      <h2 class="title-h2 mt-10 mb-4">Opis</h2>
      <LazyWhiteRetangleContainer :array="[...desArray]" />
      <h2 class="title-h2 mt-10 -mb-1.5">Pytania</h2>
      <LazyQuizAddNewQuestionAnswer1 @questionToRemove="toRemove" :array="questionArray" />
      <div class="mt-12 flex gap-6 mb-[72px] justify-end">
        <button @click="isModal()">
          <p class="action-button red">Usuń</p>
        </button>
        <button class="button-primary" v-if="submitButton(meta)" type="Submit">Zapisz zmiany</button>
        <p v-else class="button-primary-disabled text-center" disabled>Zapisz zmiany</p>
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

const route = useRoute();
const quizStore = useQuiz();
await quizStore.getSingleQuiz(route.params.id);
await quizStore.getQuestion(route.params.id);

const schema = yup.object({
  time: yup
    .string()
    .matches(/^[0-9]*$/, "Wpisz liczbę")
    .required("Uzupełnij czas trwania quizu")
    .max(2, "Quiz nie może być dłuższy niż 99 minut"),
});
const { singleQuiz, allQuestion, answerById, categories, newQuestionId } = storeToRefs(
  quizStore
);
await quizStore.getCategory();
let category: any = categories.value;
let single = singleQuiz.value;
let question: any = allQuestion.value;

const defaultDifficulty = single.difficulty;
const seletedDifficulty = ref();
const difficultyArray = reactive([
  { value: "easy", label: "Łatwy" },
  { value: "medium", label: "Średni" },
  { value: "hard", label: "Trudny" },
]);
const difficultyOption = (select: any) => {
  seletedDifficulty.value = select;
};

const quizDesc = () => {
  if (singleQuiz.value.description) {
    return singleQuiz.value.description;
  } else {
    return "";
  }
};
const test = ref('')
const defaultCategory = single.category_id;
const seletedCategory = ref();
const categoriesArray = categories.value.map((single: any) => ({
  value: single.id,
  label: single.name,
}));
const categoryOption = (select: any) => {
  seletedCategory.value = select;
};

const allAnswer = allQuestion.value.forEach(async (single: any) => {
  await quizStore.getAnswerById(single.id);
});

const answers: any[] = reactive([]);

for (let quest of question) {
  await quizStore.getAnswerById(quest.id);
  answers.push(answerById.value);
}

const answerByIdArray = (id: number) => {
  const answerNew = answers.flat();
  const filtered: any = answerNew.filter((element: any) => element.question_id === id);
  return filtered;
};
const questionArray = ref(
  question.map((element: any, index: number) => ({
    id: element.id,
    title: element.question,
    answers: answerByIdArray(element.id),
  }))
);
const quizArray = reactive<any>([
  {
    type: "input",
    template: "addNew",
    wrap: "soft",
    placeholder: "Nazwa quizu",
    value: single.title,
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
    value: quizDesc(),
  },
]);
const image = ref<any | null>(null);
const isImageModal = ref(false);
const isOpen = ref(false);
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
  
const openModal = (open: boolean) => {
  let results: boolean = false;
  if (open == true) results = false;
  else results = true;
  return results;
};

const handleImage = (file: File) => {
  image.value = file;
};

const toRemoveArray = ref<any>();
const toRemove = (allArray: any) => {
  toRemoveArray.value = allArray;
  console.log(allArray)
};

const isSendQuiz = ref(false);

const sendQuiz = () => {
  isSendQuiz.value = !isSendQuiz.value;
};

const onSubmit = async (meta:any) => {
  let quizId: any = route.params.id;
  const questionUpdate = questionArray.value.filter((question: any)=>question.id>0)
  await quizStore.updateQuiz(
    quizId,
    quizArray[0].value,
    // meta.initialValues.time,
    seletedCategory.value,
    // seletedDifficulty.value,
    desArray[0].value
    // image.value
  )
  toRemoveArray?.value?.forEach(
    async (questionsToRemove: any) => {
      await quizStore.deleteQuestionAnswer(questionsToRemove.id);
      await quizStore.deleteQuestion(questionsToRemove.id);
    }
  );
  sendQuiz()
  questionArray.value.filter((question: any)=>question.id>0).forEach(async (questionsToUpdate: any) => {
    await quizStore.updateQuestion(questionsToUpdate.id, questionsToUpdate.title);
    questionsToUpdate.answers.forEach(async (singleAnswer: any) => {
      await quizStore.updateAnswer(
        singleAnswer.id,
        singleAnswer.question_id,
        singleAnswer.answer,
        1
      );
    });
  });
  questionArray.value.filter((question: any)=> !question.id)?.forEach(async (answerQuestion: any) => {
    await quizStore.postNewQuestion(answerQuestion.title, quizId);
    let questionId = newQuestionId.value;
    answerQuestion.answers.forEach(async (answer: any) => {
      await quizStore.postNewAnswer(answer.answer, questionId, answer.correct);
    });
  });
};

const newQuestion = questionArray.value.filter((question: any)=>question.id>0)

const submitButton = (meta: any) => {
  if (
    quizArray[0].value &&
    seletedCategory &&
    seletedDifficulty &&
    meta.valid &&
    checkQuestion(questionArray.value) ){
    return true;
  } else {   
    return false;
  }
}


const formValues = {
  time: single.time,
};
useForm({
  initialValues: formValues,
});
</script>
<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.image-single {
  border: 1px solid $border;
  border-radius: 16px;
  height: 240px;
}

input {
  outline: none;
  font-size: 16px;
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

.action-button {
  letter-spacing: 0.05em;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 600;
  padding: 6px 16px 6px 16px;
}

.go {
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  margin-left: 4px;
}
.back-arrow {
  transform: rotate(180deg);
  margin-left: -4px;
}
.errorM{
  position: absolute;
 // margin-top: -3px;
 // margin-bottom: 8px;
  font-size: 12px;
  width: 100vh;
  left: 60px;
  bottom: 47px;
color: $color-error;
}
</style>
