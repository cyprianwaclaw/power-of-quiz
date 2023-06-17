<template>
  <ModalAlert
    :modalActive="isSendQuiz"
    title="Wysłano!"
    des="Twój quiz został przesłany do nas w celu weryfikacji, gdy zostanie
  zaakceptowany poprawnie, zostaniesz o tym poinformowany"
    closeButton="Kolejny quiz"
    actionButton="Home"
    redirect="/panel"
    @close="sendQuiz1()"
  />
  <NuxtLayout name="panel">
    <!-- {{ questionArray}} -->
    <!-- {{ questionArray }} -->
    <div class="mb-12 flex justify-end -mr-3">
      <NuxtLink
        :to="`/panel/konto/dodane-quizy/${route.params.id}`"
        class="flex border-transparent rounded-lg py-2 px-3"
      >
        <Icon name="ph:caret-right-bold" size="22" class="primary-color back-arrow" />
        <p class="go primary-color">Powrót</p>
      </NuxtLink>
    </div>
    <button @click="consoleQuiz()">console.log</button>
    <div v-if="!image">
      <img :src="single.image" class="image-single" />
    </div>
    <LazyModalContentCropImageInput
      image="true"
      @close="openModal(isImageModal)"
      @image-file="handleImage"
    />
    <Form @submit="onSubmit" :validation-schema="schema">
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

        {{ time }}
        <template #time>
          <div class="flex flex-row w-full place-items-center" @click="isTime()">
            <CustomField
              class="w-2"
              name="time"
              mode="aggressive"
              v-model="time"
              placeholder="0"
              :style="styleObject"
            />
            <p class="font-medium pt-[6px]">minut</p>
          </div>
        </template>
      </WhiteRetangleContainer>
      <h2 class="title-h2 mt-10 mb-4">Opis</h2>
      <LazyWhiteRetangleContainer :array="[...desArray]" />
      <h2 class="title-h2 mt-10 -mb-1.5">Pytania</h2>
      <LazyQuizAddNewQuestionAnswer @array="answerQuestion" :array="questionArray" />
      <!-- @newArray="newAnswerQuestion"  -->
      <div class="mt-12 flex gap-6 mb-[72px] justify-end">
        <button @click="isModal()">
          <p class="action-button red">Usuń</p>
        </button>
        <button class="button-primary-small">Zapisz zmiany</button>
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

const route = useRoute();
const quizStore = useQuiz();
await quizStore.getSingleQuiz(route.params.id);
await quizStore.getQuestion(route.params.id);

const schema = yup.object({
  time: yup
    .string()
    .matches(/^[0-9]*$/, "Wpisz liczbę")
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

const validateData = (allArray: any) => {
  if (allArray?.title == "kk") {
    console.log(allArray);
    console.log("Jest błąd");
  } else {
    console.log(allArray);
    console.log("Wyślij quiz");
  }
};

const validateReceivedData = () => {
  validateData(answerQuestionArray.value);
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

const time = ref();
const timeActive = ref(true);
const isTime = () => {
  timeActive.value = true;
  styleObject.width = "30px";
};

const onSubmit = async () => {
  let quizId: any = route.params.id;
  await quizStore.updateQuiz(
    quizId,
    quizArray[0].value,
    // time.value,
    seletedCategory.value,
    // seletedDifficulty.value,
    desArray[0].value
    // image.value
  );
  quizQuestionForRemove(allQuestion, questionArray).forEach(
    async (questionsToRemove: any) => {
      await quizStore.deleteQuestionAnswer(questionsToRemove.id);
      await quizStore.deleteQuestion(questionsToRemove.id);
    }
  );
  questionArray.value.forEach(async (questionsToUpdate: any) => {
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
  answerQuestionArray.value?.forEach(async (answerQuestion: any) => {
    await quizStore.postNewQuestion(answerQuestion.title, quizId);
    let questionId = newQuestionId.value;
    answerQuestion.answers.forEach(async (answer: any) => {
      await quizStore.postNewAnswer(answer.answer, questionId, answer.correct);
    });
  });
};
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
</style>
