<template>

  <!-- <div v-if="isImageModal">
    <ModalDown
    title="Dodaj zdjęcie"
    @close= "imageModal()" 
    >
    <template #content>
<LazyModalContentCropImageInput/>
      </template>
      </ModalDown>
      </div> -->

  <!-- <div>
    <div class="fixed z-50 left-0 bottom-0 w-full" v-if="allQuestion">
      <div class="blur-background-update"></div>
      <div class="modal-view-update">
        <div class="px-7 py-7 grid">
          <div class="flex justify-center w-full">
            <Icon name="ph:x-circle-light" size="72" class="red mb-3" />
          </div>
          <p class="edit-message-modal">
            Uzupełnij tytół pytania, wszystkie odpowiedzi oraz zaznacz poprawną z nich
          </p>
        </div>
        <div class="border-top flex justify-end">
          <button class="button-modal primary-color" @click="allQuestion = !allQuestion">
            Okej
          </button>
        </div>
      </div>
    </div>

    <div class="fixed z-50 left-0 bottom-0 w-full" v-if="removeSucess">
      <div class="blur-background-update"></div>
      <div class="modal-view-update">
        <div class="px-7 py-7 grid">
          <div class="flex justify-center w-full">
            <Icon name="ph:check-circle-light" size="72" class="green mb-3" />
          </div>
          <p class="edit-message-modal">Pytanie zostało usuniętę pomyślnie</p>
        </div>
        <div class="border-top flex justify-end">
          <button
            class="button-modal primary-color"
            @click="removeSucess = !removeSucess"
          >
            Okej
          </button>
        </div>
      </div>
    </div>

    <div class="fixed z-50 left-0 bottom-0 w-full" v-if="isRemove">
      <div class="blur-background-update"></div>
      <div class="modal-view-update">
        <div class="px-7 py-7 grid">
          <div>
            <p class="red text-center font-medium">Czy napewno chcesz usunąć pytanie ?</p>
            <p class="text-center mt-3 text-gray text-sm">
              Tej operacji nie można cofnąć
            </p>
          </div>
        </div>
        <div class="flex w-full border-top">
          <div class="flex w-full justify-center" @click="remove">
            <button class="button-modal1 red">Usuń</button>
          </div>
          <div class="vl"></div>
          <div class="flex w-full justify-center">
            <p class="button-modal1 text-gray" @click="isRemove = !isRemove">Anuluj</p>
          </div>
        </div>
      </div>
    </div>

    <div class="fixed z-50 left-0 bottom-0 w-full" v-if="isOpen">
      <div class="blur-background-update"></div>
      <div class="modal-view-update">
        <div class="px-7 py-7 grid">
          <div class="flex justify-center w-full">
            <Icon name="ph:check-circle-light" size="72" class="green mb-3" />
          </div>
          <div>
            <p class="edit-message-modal-title green text-center">Dziękujemy!</p>
            <p class="edit-message-modal">
              Twój quiz został przesłany do nas w celu weryfikacji, gdy zostanie
              weryfikowany poprawnie, zostaniesz o tym poinformowany
            </p>
          </div>
        </div>
        <div class="flex flex-col w-full">
          <div class="flex w-full justify-center border-top pl-3.5" @click="modalClose()">
            <button class="button-modal1 primary-color">Dodaj kolejny quiz</button>
          </div>
          <NuxtLink to="/panel">
            <div class="flex w-full justify-center border-top pl-3.5">
              <p class="button-modal1 text-gray">Wróć na stronę główną</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div> -->
    <NuxtLayout name="panel">
      <h1 class="title-h1">Nowy quiz</h1>
      <h2 class="title-h2 mt-[52px] mb-8">Podstawowe informacje</h2>
      <Form
        class="mb-24"
        v-slot="{ values }"
        @submit="onSubmit"
        :validation-schema="schema"
        @invalid-submit="onInvalidSubmit"
      >
        <!-- początek formularza -->
        <!-- podstawowe informację -->
        <div class="white-retangle">
          <div class="row-table-start -mt-3 -pb-20 flex">
            <InputTextAreaNotBorder
              name="title"
              id="title"
              type="text"
              placeholder="Nazwa quizu"
            />
          </div>
          <div class="row-table-start -mt-2 -mb-1 flex place-items-end" @click="isTime()">
            <InputNotBorder
              name="time"
              class="time"
              id="timeInput"
              type="tel"
              :placeholder="timePlaceholder"
              :style="styleObject"
            />
            <p v-if="timeActive" class="font1 time1">minut</p>
          </div>
          <div class="row-table-start flex flex-col">
            <p v-if="values.category_id" class="text-des-mobile-add">Kategoria</p>
            <Field name="category_id" as="select" class="base-input-new-quiz" required>
              <option value="" hidden invalid>Wybierz kategorie</option>
              <option v-for="single in category" :key="single.id" :value="single.id">
                <p class="font1">{{ single.name }}</p>
              </option>
            </Field>
          </div>
          <div class="row-table-end mb-2 -mt-1.5 flex flex-col">
            <p v-if="values.difficulty" class="text-des-mobile-add">Poziom trudności</p>
            <Field name="difficulty" as="select" class="base-input-new-quiz" required>
              <option value="" hidden invalid>Wybierz poziom trudności</option>
              <option value="easy"><p class="font1">Łatwy</p></option>
              <option value="medium"><p class="font1">Średni</p></option>
              <option value="hard"><p class="font1">Trudny</p></option>
            </Field>
          </div>
        </div>
        <!-- opis quizu -->
        <h2 class="title-h2 mt-14 mb-8">Opis</h2>
        <div class="white-retangle">
          <div class="row-table-end -mt-4 -pb-20 flex">
            <InputTextArea
              name="description"
              id="description"
              type="text"
              placeholder="Twój opis quizu"
            />
          </div>
        </div>
        <h2 class="title-h2 mt-14 mb-8">Zdjęcie</h2>
<LazyModalContentCropImageInput
@close= "imageModal()"
@image-file="handleImage"
/>
        <h2 class="title-h2 mt-14 mb-8">Pytania</h2>

        <div v-for="(item, index) in form" :key="index">
          <div
            class="white-retangle"
            v-if="form.length > 0"
            :class="{ margin: indexBigger(form.length) }"
          >
            <p class="quest-text">Pytanie {{ index + 1 }}</p>
            <div v-if="form.length >= 1" class="justify-end flex mr-6">
              <Icon
                name="carbon:close"
                size="22"
                class="red text-xs -mt-7 absolute"
                @click="isRemove = !isRemove"
              />
            </div>
            <div class="row-table-end flex place-items-center gap-3 mb-4 mt-1">
              <div class="">
                <p class="text-des-mobile-add">Treść pytania</p>
                <div>
                  <h2 class="font-medium mt-0.5">{{ item.title }}</h2>
                </div>
              </div>
            </div>
            <div class="row-table-start flex place-items-center gap-3">
              <div v-if="item.answer1.isCorrect">
                <Icon name="ph:check-circle-light" size="21" class="green" />
              </div>
              <div v-else class="w-5"></div>
              <div class="">
                <p class="text-des-mobile-add">Odpowiedź 1</p>
                <div>
                  <h2 class="font-medium mt-0.5">{{ item.answer1.title }}</h2>
                </div>
              </div>
            </div>
            <div class="row-table-start flex place-items-center gap-3">
              <div v-if="item.answer2.isCorrect">
                <Icon name="ph:check-circle-light" size="21" class="green" />
              </div>
              <div v-else class="w-5"></div>
              <div class="">
                <p class="text-des-mobile-add">Odpowiedź 2</p>
                <div>
                  <h2 class="font-medium mt-0.5">{{ item.answer2.title }}</h2>
                </div>
              </div>
            </div>
            <div class="row-table-start flex place-items-center gap-3">
              <!--! zmienić we waszystkich -->
              <div v-if="item.answer3.isCorrect">
                <Icon name="ph:check-circle-light" size="21" class="green" />
              </div>
              <div v-else class="w-5"></div>
              <div class="">
                <p class="text-des-mobile-add">Odpowiedź 3</p>
                <div>
                  <h2 class="font-medium mt-0.5">{{ item.answer3.title }}</h2>
                </div>
              </div>
            </div>
            <div class="row-table-end flex place-items-center gap-3">
              <div v-if="item.answer4.isCorrect">
                <Icon name="ph:check-circle-light" size="21" class="green" />
              </div>
              <div v-else class="w-5"></div>
              <div class="">
                <p class="text-des-mobile-add">Odpowiedź 4</p>
                <div>
                  <h2 class="font-medium mt-0.5">{{ item.answer4.title }}</h2>
                </div>
              </div>
            </div>
            <div class="w-full">
              <p class="edit-quest primary-color">Edytuj</p>
            </div>
          </div>
        </div>

        <div class="white-retangle" :class="{ margin: indexBigger(form.length) }">
          <p class="quest-text">Pytanie {{ form.length + 1 }}</p>
          <div class="row-table-start mt-3 -pb-20 flex">
            <textarea
              name="titleQuestion"
              v-model="titleQuestion"
              type="text"
              placeholder="Treść pytania"
            />
          </div>
          <!-- pytania do quizu -->
          <fieldset id="group">
          <div class="row-table-start -mt-2 -mb-1 flex place-items-end">
             <Field type="radio" name="group" v-model="radioCorrect"  value="correct1" />
            <input
              name="answer_1"
              v-model="answer_1"
              type="text"
              placeholder="Odpowiedź 1"
            />
          </div>
          <div class="row-table-start -mt-2 -mb-1 flex place-items-end">
             <Field type="radio" name="group" v-model="radioCorrect" value="correct2"  />
            <input
              name="answer_2"
              v-model="answer_2"
              type="text"
              placeholder="Odpowiedź 2"
            />
          </div>
          <div class="row-table-start -mt-2 -mb-1 flex place-items-end">
             <Field type="radio" name="group" v-model="radioCorrect"  value="correct3" />
            <input
              name="answer_3"
              v-model="answer_3"
              type="text"
              placeholder="Odpowiedź 3"
            />
          </div>
          <div class="row-table-end -mt-2 -mb-1 flex place-items-end">
             <Field type="radio" name="group" v-model="radioCorrect" value="correct4"  />
            <input
              name="answer_4"
              v-model="answer_4"
              type="text"
              placeholder="Odpowiedź 4"
            />
          </div>
        </fieldset>
          <div v-if="form.length + 1 == 1">
            <div
              class="mr-7 mb-3 mt-8"
              v-if="
                titleQuestion.length > 2 &&
                answer_1.length > 2 &&
                answer_2.length > 2 &&
                answer_3.length > 2 &&
                answer_4.length > 2 &&
                values.group
              "
            >
              <p @click="newQuestionInput" class="text-end primary-color font-medium">
                Dodaj pierwsze pytanie
              </p>
            </div>

            <div class="mr-7 mb-3 mt-8" v-else>
              <p
                @click="allQuestion = !allQuestion"
                class="text-end primary-color font-medium"
              >
                Dodaj pierwsze pytanie
              </p>
            </div>
          </div>
          <div v-else>
            <div
              class="mr-7 mb-3 mt-8"
              v-if="
                titleQuestion.length > 2 &&
                answer_1.length > 2 &&
                answer_2.length > 2 &&
                answer_3.length > 2 &&
                answer_4.length > 2 &&
                values.group
              "
            >
              <p @click="newQuestionInput" class="text-end primary-color font-medium">
                Dodaj
              </p>
            </div>

            <div class="mr-7 mb-3 mt-8" v-else>
              <p
                @click="allQuestion = !allQuestion"
                class="text-end primary-color font-medium"
              >
                Dodaj
              </p>
            </div>
          </div>
        </div>

       
        <div
          class="mt-9 justify-end flex"
          v-if="
          values.title && values.difficulty && values.category_id && values.time && form.length
              ? false
              : true
          "
        >
          <button class="button-primary-disabled" disabled id="submit" type="submit">
            Prześlij quiz do akceptacji
           <!-- <Icon name="carbon:chevron-right" class="-mr-2" size="24" /> -->
          </button>
        </div>
        <div class="mt-9 justify-end flex" v-else>
          <button class="button-primary" id="submit" type="submit">
            Prześlij quiz do akceptacji
            <!-- <Icon name="carbon:chevron-right" class="-mr-2" size="24" /> -->
          </button>
        </div>
        <!-- koniec formularza -->
      </Form> 
    </NuxtLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, reactive } from "vue";
import { useQuiz } from "@/store/useQuiz";
import * as Yup from "yup";
import { Form, Field } from "vee-validate";
import { onInvalidSubmit, indexBigger } from "@/utils/function";



const quizStore = useQuiz();
const { categories, newQuizId, newQuestionId } = storeToRefs(quizStore);
await quizStore.getCategory();
let category:any = categories.value;



let titleQuestion = ref("");
let answer_1 = ref("");
let answer_2 = ref("");
let answer_3 = ref("");
let answer_4 = ref("");
let radioCorrect = ref("")

const allQuestion = ref(false);

definePageMeta({
  middleware: "auth",
});

const image = ref<any | null>(null);
const isImageModal = ref(false);
const imageModal=()=>{
  isImageModal.value =!isImageModal.value;
}

const handleImage= (file:File)=>{
image.value = file
}

function isCorrect1(params: any){
    let results = false 
  if(params=='correct1'){
   results = true
  }else{
  results = false
}
    return results
}
function isCorrect2(params: any){
    let results = false 
  if(params=='correct2'){
   results = true
  }else{
  results = false
}
    return results
}
function isCorrect3(params: any){
    let results = false 
  if(params=='correct3'){
   results = true
  }else{
  results = false
}
    return results
}
function isCorrect4(params: any){
    let results = false 
  if(params=='correct4'){
   results = true
  }else{
  results = false
}
    return results
}

const isOpen = ref(false);
const isRemove = ref(false);
const removeSucess = ref(false);

function modalClose() {
  isOpen.value = !isOpen.value;
  // window.location.reload();
}

const styleObject = reactive({
  width: "100%",
});
const timeActive = ref(false);
const timePlaceholder = ref("Szacunkowy czas trwania");
function isTime() {
  (document.getElementById("timeInput") as any).focus();
  timeActive.value = true;
  timePlaceholder.value = "0";
  styleObject.width = "30px";
}

let form = reactive<any>([]);

const remove = (index: any) => {
  isRemove.value = !isRemove.value;
  form.splice(index, 1);
  removeSucess.value = !removeSucess.value;
};

const newQuestionInput = () => {
  let formL = form.length;

  form.push({
    title: titleQuestion.value,
    answer1: {
      title: answer_1.value,
      isCorrect: isCorrect1(radioCorrect.value),
    },
    answer2: {
      title: answer_2.value,
      isCorrect: isCorrect2(radioCorrect.value),
    },
    answer3: {
      title: answer_3.value,
      isCorrect: isCorrect3(radioCorrect.value),
    },
    answer4: {
      title: answer_4.value,
      isCorrect: isCorrect4(radioCorrect.value),
    },
  });

  titleQuestion.value = "";
  answer_1.value = "";
  answer_2.value = "";
  answer_3.value = "";
  answer_4.value = "";
  radioCorrect.value = ""
};


const schema = Yup.object().shape({
  title: Yup.string().max(80, "Ups! nazwa jest zbyt długa"),
  time: Yup.string()
    .matches(/^[0-9]*$/, "Wpisz liczbę")
    .max(2, "Quiz nie może być dłuższy niż 99 minut"),
});

async function onSubmit(values: any) {
  // !dodać obraz

  let { title, time, category_id, difficulty, description } = values;

  // !działa już dodawanie quizu
  await quizStore.postNewQuiz(title, time, category_id, difficulty,description, image.value);
  let quziId = newQuizId.value;

  // console.log(newQuizId.value)
  form.forEach(async (answer:any) => {
    await quizStore.postNewQuestion(answer.title, quziId);

    let questionId = newQuestionId.value;

      await quizStore.postNewAnswer(
        answer.answer1.title,
        questionId,
        answer.answer1.isCorrect
      );
      await quizStore.postNewAnswer(
        answer.answer2.title,
        questionId,
        answer.answer2.isCorrect
      );
      await quizStore.postNewAnswer(
        answer.answer3.title,
        questionId,
        answer.answer3.isCorrect
      );
      await quizStore.postNewAnswer(
        answer.answer4.title,
        questionId,
        answer.answer4.isCorrect
      );
  }),
  isOpen.value = !isOpen.value;
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

input[type=radio] {
   border-radius: 50%;
   width: 24px;
   height: 3px;
   margin-right: 14px;
   position: relative;
 }

</style>
