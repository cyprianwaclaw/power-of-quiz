<template>
    <div>
      <div class="fixed z-50 left-0 bottom-0 w-full" v-if="allQuestion1">
        <div class="blur-background-update"></div>
        <div class="modal-view-update">
          <div class="px-7 py-7 grid">
            <div class="flex justify-center w-full">
              <Icon name="ph:x-circle-light" size="72" class="red mb-3" />
            </div>
            <p class="edit-message-modal">
              Uzupełnij tytuł pytania, wszystkie odpowiedzi oraz zaznacz poprawną z nich
            </p>
          </div>
          <div class="border-top flex justify-end">
            <button
              class="button-modal primary-color"
              @click="allQuestion1 = !allQuestion1"
            >
              Okej
            </button>
          </div>
        </div>
      </div>

      <NuxtLayout name="single-quiz">
        <Form @submit="onSubmit" @invalid-submit="onInvalidSubmit" v-slot="{ values }">
          <img :src="quizItem[5].image" class="image-single" />

          <div class="mt-10 mb-10">
            <div class="white-retangle">
              <div class="row-table-end mb- -mt-1.5 flex flex-col">
                <p class="text-des-mobile-add pb-1">Nazwa quizu</p>
                <InputTextAreaNotBorder name="title" :value="quizItem[3].name" />
              </div>
            </div>
          </div>
          <!-- <div class="white-retangle" v-if="!editToggle">
            <div
              class="my-4 w-full flex justify-center pl-7 justify-items-centery-place-content"
            >
              <div class="border-r border-[#EDEDED] w-full">
                <p class="font-medium">{{ quizItem[11].pytania }}</p>
                <h2 class="text-sm text-[#a7a2a2] font-thin">Ilość pytań</h2>
              </div>
              <div class="border-r border-[#EDEDED] w-full pl-5">
                <p class="font-medium">{{ quizItem[6].time }} min</p>
                <h2 class="text-sm text-[#a7a2a2] font-thin">Czas</h2>
              </div>
              <div class="w-full pl-5">
                <p class="font-medium">{{ quizItem[7].poziom }}</p>
                <h2 class="text-sm text-[#a7a2a2] font-thin">Poziom</h2>
              </div>
            </div>
          </div> -->

            <div class="white-retangle">
              <div class="row-table-start -mt-5 flex place-items-end">
                <InputNotBorder
                  name="time"
                  class="times"
                  id="timeInput"
                  type="tel"
                  :value="quizItem[6].time"
                />
                <p class="font1 time1 pb-[3px]">minut</p>
              </div>
              <div class="row-table-start flex flex-col">
                <p class="text-des-mobile-add">Kategoria</p>
                <Field name="category_id" as="select" class="base-input-new-quiz" required>
                  <option value="" hidden invalid>{{ quizItem[1].category.name }}</option>
                  <option v-for="single in category" :key="single.id" :value="single.id">
                    <p class="font1">{{ single.name }}</p>
                  </option>
                </Field>
              </div>
              <div class="row-table-end mb- -mt-1.5 flex flex-col">
                <p class="text-des-mobile-add">Poziom trudności</p>
                <Field name="difficulty" as="select" class="base-input-new-quiz" required>
                  <option value="" hidden invalid>{{ quizItem[7].poziom }}</option>
                  <option value="easy"><p class="font1">Łatwy</p></option>
                  <option value="medium"><p class="font1">Średni</p></option>
                  <option value="hard"><p class="font1">Trudny</p></option>
                </Field>
              </div>
            </div>

            <p class="title-h2 mt-16 mb-7">Opis</p>
            <div class="white-retangle">
              <div class="row-table-end mb- -mt-3 flex flex-col">
                <InputTextAreaNotBorder
                  name="description"
                  placeholder="Twój opis"
                  :value="quizItem[4].opis"
                />
              </div>
            </div>

          <p class="title-h2 mt-16 mb-3">Pytania</p>
          <!-- <div v-if="!editToggle">
            <div class="white-retangle mt-7" v-for="(item, index) in newItem" :key="index">
              <p class="quest-text">Pytanie {{ index + 1 }}</p>
              <div class="row-table-end flex flex-col gap-3 mb-4 mt-1">
                <p class="text-des-mobile-add">Treść pytania</p>
                <h2 class="font-medium -mt-2.5">{{ item.question }}</h2>
              </div>
              <div v-for="(answers, index) in item.test" :key="index">
                <div
                  :class="{
                    row_table_end: index == 3 ? true : false,
                    row_table_start: index == 3 ? false : true,
                  }"
                >
                  <div class="flex gap-3 place-items-center">
                    <div v-if="answers.correct">
                      <Icon name="ph:check-circle-light" size="21" class="green" />
                    </div>
                    <div v-else class="w-5"></div>
                    <div class="w-full flex flex-col gap-1">
                      <p class="text-des-mobile-add">Odpowiedź {{ index + 1 }}</p>
                      <div>
                        <h2 class="font-medium mt-0.5">{{ answers.answer }}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->

          <div>
            <!-- <div class="white-retangle mt-7" v-for="(item, index) in newItem" :key="index">
              <p class="quest-text">Pytanie {{ index + 1 }}</p>
              <div class="row-table-end flex flex-col gap-3 mb-4 mt-1">
                <p class="text-des-mobile-add">Treść pytania</p>
                  <h2 class="font-medium -mt-2.5">{{ item.question }}</h2>
              </div>
              <div v-for="(answers, index) in item.test" :key="index">
                <div
                  :class="{ row_table_end: index == 3 ? true : false, row_table_start: index == 3 ? false : true }"
                >
                  <div class="flex gap-3 place-items-center ">
                    <div v-if="answers.correct">
                      <Icon name="ph:check-circle-light" size="21" class="green" />
                    </div>
                    <div v-else class="w-5"></div>
                    <div class="w-full flex flex-col gap-1">
                      <p class="text-des-mobile-add">Odpowiedź {{ index + 1 }}</p>
                      <div>
                        <h2 class="font-medium mt-0.5">{{ answers.answer }}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p @click="newQuestionInput" class="text-end primary-color font-medium mt-6 mb-6">
              Dodaj kolejne pytanie
            </p> -->
            <div class="white-retangle mt-7" v-for="(item, index) in newItem" :key="index">
              <p class="quest-text">Pytanie {{ index + 1 }}</p>
              <div class="row-table-end flex flex-col gap-3 mb-4 mt-1">
                <p class="text-des-mobile-add">Treść pytania</p>
                {{ item.id }}
                <h2 class="font-medium -mt-2.5">{{ item.question }}</h2>
              </div>
              <div v-for="(answers, index) in item.test" :key="index">
                <div
                  :class="{
                    row_table_end: index == 3 ? true : false,
                    row_table_start: index == 3 ? false : true,
                  }"
                >
                  <div class="flex gap-3 place-items-center">
                    <div v-if="answers.correct">
                      <Icon name="ph:check-circle-light" size="21" class="green" />
                    </div>
                    <div v-else class="w-5"></div>
                    <div class="w-full flex flex-col gap-1">
                      <p class="text-des-mobile-add">Odpowiedź {{ index + 1 }}</p>
                      <div>
                        <h2 class="font-medium mt-0.5">{{ answers.answer }}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p
              @click="newQuestionInput"
              class="text-end primary-color font-medium mt-6 mb-6"
            >
              Dodaj kolejne pytanie
            </p>

            <div class="white-retangle" :class="{ margin: indexBigger(form.length) }" v-for="(item, index) in newItem" :key="index">
              <p class="quest-text">Pytanie {{ index +1}}</p>
              <div class="row-table-start mt-3 -pb-20 flex">
                <input
                  name="item.id"
                  type="text"
                  placeholder="Treść pytania"
                  v-model="newItem[index].question" />
              </div>
              <!-- pytania do quizu -->
  <div v-for="(answer, index) in item.test" :key="answer.id" class="grid content-center ">
    <div>
        <button @click="toggleCorrect(index)">
            {{ answer.correct ?  "Poprawna" : "Błędna" }}
            <!-- <fieldest id="group"> -->
                <input name="group" :checked="answer.correct === 1"  type="checkbox"/>
            <!-- </fieldest> -->
        </button>
    </div>
    <div>
        <input v-model="item.test[index].answer" />
    </div>
</div>
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

                </div>

                <div class="mr-7 mb-3 mt-8" v-else>

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
          </div>
{{ newItem }}
          <div class="mt-16 flex w-full gap-7">
            <button class="button-primary flex w-full" type="submit">Zapisz zmiany</button>
          </div>
          <pre>
            <div v-for="single in newItem" :key="single.id">
<!-- {{ single.test[0].answer }}
{{ single.test[1].answer }}
{{ single.test[2].answer }}
{{ single.test[3].answer }} -->
<!-- <fieldest>
    <input v-model="single.test[0].correct" type="checkbox" name="group"    false-value="0" true-value="1"/>
    <input v-model="single.test[1].correct" type="checkbox" name="group"    false-value="0" true-value="1" />
    <input v-model="single.test[2].correct" type="checkbox" name="group"    false-value="0" true-value="1" />
    <input v-model="single.test[3].correct" type="checkbox" name="group"    false-value="0" true-value="1" />
</fieldest> -->


<!-- <Field type="radio" name="group" v-model="radioCorrect"  value="correct1" />
<Field type="radio" name="group" v-model="radioCorrect"  value="correct2" />
<Field type="radio" name="group" v-model="radioCorrect"  value="correct3" />
<Field type="radio" name="group" v-model="radioCorrect"  value="correct4" />
<input v-model="single.test[0].answer "/>
<input v-model="single.test[1].answer "/>
<input v-model="single.test[2].answer "/>
<input v-model="single.test[3].answer "/> -->
         <div v-for="(answer, index) in single.test" :key="answer.id">
<!-- {{answer[0]}} -->

    <input
    type="checkbox"
    v-model="answer.correct"
    id="single.id"
    false-value="0" true-value="1"
    />

         </div>
</div> 
             <!-- <p @click="test111.click">tets</p> -->
          </pre>
          <p class="mt-7" @click="consoleLog1">Console1</p>
          <p class="mt-7" @click="newQuestionInput">addForm</p>
          <pre>

              {{form}}
          </pre>
        </Form>
      </NuxtLayout>
    </div>
  </template>

  <script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { ref, reactive, onMounted } from "vue";
  import { useQuiz } from "@/store/useQuiz";
  import { changeStatus, changeDifficult } from "@/utils/function";
  import * as Yup from "yup";
  import { Form, Field } from "vee-validate";
  import { onInvalidSubmit, indexBigger } from "@/utils/function";

  const allQuestion1 = ref(false);
  const route = useRoute();

  let answer1 = ref()





  const quizStore = useQuiz();
  const { singleQuiz, allQuestion, answerById, categories, test1 } = storeToRefs(quizStore);
  await quizStore.getSingleQuiz(route.params.id);
  await quizStore.getQuestion(route.params.id);
  await quizStore.getCategory();
  let category: any = categories.value;
  let question: any = allQuestion.value;
  let quizCategory: any[] = categories.value;
  const answers: any[] = reactive([]);

  for (let quest of question) {
    await quizStore.getAnswerById(quest.id);
    answers.push(answerById.value);
  }
  let responses = ref<any>()

//   function toggleCorrect(index: number) {
//   const answer = item.test.value[index];
//   if (answer.correct === 0) {
//     item.test.value.forEach((a) => (a.correct = 0));
//     answer.correct = 1;
//   } else {
//     answer.correct = 0;
//   }
// }

  const test = ref()

  const newItem:any = question.map((item: any) => ({
    id: item.id,
    question: item.question,
    test: answers.flat().filter((single) => single.question_id == item.id),
  }));

  const current = Object.entries(singleQuiz.value).map(([key, value]) => {
    return { [key]: value };
  });

  const quizItem: any[] = current.map((single: any) => ({
    category: categories.value.find((cat: any) => single.category_id == cat.id),
    time: single.time,
    name: single.title,
    image: single.image,
    poziom: changeDifficult(single.difficulty),
    pytania: single.questions_count,
    status: changeStatus(single.is_active),
    opis: single.description,
  }));

  async function removeQuiz() {
    await quizStore.deleteSingleQuiz(route.params.id);
  }

  const editToggle = ref(false);

  let titleQuestion = ref("");
  let answer_1 = ref("");
  let answer_2 = ref("");
  let answer_3 = ref("");
  let answer_4 = ref("");
  let radioCorrect = ref("");

  function isCorrect1(params: any) {
    let results = false;
    if (params == "correct1") {
      results = true;
    } else {
      results = false;
    }
    return results;
  }
  function isCorrect2(params: any) {
    let results = false;
    if (params == "correct2") {
      results = true;
    } else {
      results = false;
    }
    return results;
  }
  function isCorrect3(params: any) {
    let results = false;
    if (params == "correct3") {
      results = true;
    } else {
      results = false;
    }
    return results;
  }
  function isCorrect4(params: any) {
    let results = false;
    if (params == "correct4") {
      results = true;
    } else {
      results = false;
    }
    return results;
  }

  let form = reactive<any>([]);

  const remove = (index: any) => {
    // isRemove.value = !isRemove.value;
    form.splice(index, 1);
    // removeSucess.value = !removeSucess.value;
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
    radioCorrect.value = "";
  };

  async function onSubmit(values: any) {
    console.log(route.params.id);
    let { title, time, category_id, difficulty, description } = values;

    await quizStore.updateQuiz(route.params.id, title, category_id, description);
  }

let answer:any[] = reactive([])
//   function toggleCorrect(id: number) {
    // let answers = newItem.test
  newItem.forEach((single:any)=>{
    answer = single.test
        // answer.forEach((e:any)=>{
        //     console.log(e)
        // })
        
    })
    // console.log(answer)
//     answers.forEach((single:any)=>{
// console.log(single)
// const answer = single.test[id];
// if (answer.correct === 0) {
//   newItem[0].test.forEach((a:any) => (a.correct = 0));
//   answer.correct = 1;
// } else {
//   answer.correct = 0;
// }

//     })
// }
// const test121 = newItem.forEach((single:any)=>{
//     return single.test
//         // answer.forEach((e:any)=>{
//         //     console.log(e)
//         // })
//     })
//     console.log(test121)
// newItem.forEach((single:any)=>{
//         const answer = single.test
//         answer.forEach((e:any)=>{
//             console.log(e)
//             const groupedItems = computed(() => {
//               const result: any[] = [];
//               for (let i = 0; i < 4; i++) {
//                 result.push(e.filter(e => item.group === i + 1));
//               }
//               return result;
//             });
//             console.log(groupedItems.value)
//         })
// console.log(answer)
//     })

  async function consoleLog1(){

  console.log(newItem[0].test)
  console.log(newItem[1].test)
  console.log(newItem[0].question)
  newItem.forEach(async(question:any)=>{
      await quizStore.updateQuestion(question.id, question.question)
  })

  }

watchEffect(() => console.log('Value: ' + newItem[0].test[1].correct))


  function onCheckboxChange(index: number): void {
    // function toggleCorrect(index: number) {
  newItem.forEach((single:any)=>{

      console.log(answer)
  });
//   if (answer.correct === 0) {
//     test.value.forEach((a) => (a.correct = 0));
//     answer.correct = 1;
//   } else {
//     answer.correct = 0;
//   }
// }
// if (selectedItem) {
// // Update correct value
// selectedItem.correct = !selectedItem.correct;

// // Unselect all other items in the same group
// const otherItems = items.filter(item => item.group === groupIndex + 1 && item.id !== itemId);
// otherItems.forEach(item => {
//   item.correct = false;
// });

// // Update selectedItems array
// if (selectedItem.correct) {
//   selectedItems.value = [...selectedItems.value.filter(item => item.group !== groupIndex + 1), selectedItem];
// } else {
//   selectedItems.value = selectedItems.value.filter(item => item.id !== itemId);
// }
// }
}

// const radioCorrect=ref()

  </script>

  <style scoped lang="scss">
  @import "@/assets/style/variables.scss";

  .image-single {
    border-radius: 24px;
    height: 260px;
    width: 100%;
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
