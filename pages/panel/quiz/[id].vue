<template>
  <NavUser />
  <div class="h-screen">
    <div class="pt-[60px]">
      <div class="quest-bg">
        <div class="absolute -top-5 mt-2 -right-3">
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="6.60536"
              cy="6.60514"
              r="5"
              transform="rotate(24.0845 6.60536 6.60514)"
              fill="#FFD15C"
            />
            <circle
              cx="27.8153"
              cy="6.60514"
              r="5"
              transform="rotate(24.0845 27.8153 6.60514)"
              fill="#FFD15C"
            />
            <circle
              cx="49.0253"
              cy="6.60514"
              r="5"
              transform="rotate(24.0845 49.0253 6.60514)"
              fill="#FFD15C"
            />
            <circle
              cx="6.60536"
              cy="27.8161"
              r="5"
              transform="rotate(24.0845 6.60536 27.8161)"
              fill="#FFD15C"
            />
            <circle
              cx="27.8153"
              cy="27.8161"
              r="5"
              transform="rotate(24.0845 27.8153 27.8161)"
              fill="#FFD15C"
            />
            <circle
              cx="49.0253"
              cy="27.8161"
              r="5"
              transform="rotate(24.0845 49.0253 27.8161)"
              fill="#FFD15C"
            />
            <circle
              cx="6.60536"
              cy="49.0251"
              r="5"
              transform="rotate(24.0845 6.60536 49.0251)"
              fill="#FFD15C"
            />
            <circle
              cx="27.8153"
              cy="49.0251"
              r="5"
              transform="rotate(24.0845 27.8153 49.0251)"
              fill="#FFD15C"
            />
            <circle
              cx="49.0253"
              cy="49.0251"
              r="5"
              transform="rotate(24.0845 49.0253 49.0251)"
              fill="#FFD15C"
            />
          </svg>
        </div>
        <p>1/{{ quiz?.questions_count }}</p>
        <h5> {{ current?.next_question.question }}</h5>
        <div class="absolute left-4 bottom-5">
          <svg
            width="34"
            height="30"
            viewBox="0 0 34 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="13.9511"
              cy="6.60514"
              r="5"
              transform="rotate(24.0845 13.9511 6.60514)"
              fill="#FFD15C"
            />
            <circle
              cx="27.3339"
              cy="15.8747"
              r="5"
              transform="rotate(24.0845 27.3339 15.8747)"
              fill="#FFD15C"
            />
            <circle
              cx="6.60536"
              cy="23.0387"
              r="5"
              transform="rotate(24.0845 6.60536 23.0387)"
              fill="#FFD15C"
            />
          </svg>
        </div>
      </div>
      {{ checkAnswer }}
      <div class="mx-6" v-for="(answer, index) in current?.next_question.answers" :key="index">
        <!-- {{ current?.next_question.id }} -->
        <button @click="postAnswer(current?.next_question.id, answer.id)" class="single-answer">
          <div class="circle-answer">
            <p class="circle-answer-text">A</p>
          </div>
          <p class="answer">{{ answer.answer }} {{ answer.id }}</p>
        </button>
        <!-- <button class="single-answer">
          <div class="circle-answer">
            <p class="circle-answer-text">B</p>
          </div>
          <p class="answer">test</p>
        </button>
        <button class="single-answer">
          <div class="circle-answer">
            <p class="circle-answer-text">C</p>
          </div>
          <p class="answer">test</p>
        </button>
        <button class="single-answer">
          <div class="circle-answer">
            <p class="circle-answer-text">D</p>
          </div>
          <p class="answer">test</p>
        </button> -->

      </div>
    </div>
    <pre>
      <!-- {{ current?.next_question.answers }} -->
      <!-- <div v-if="nextQuestion.length > 1">
        test
      </div> -->
      <!-- <div v-else>
        {{ startQuiz }}
        test
      </div> -->
      <!-- {{ nextQuestion }} -->
      <!-- <button @click="postAnswer()" class="bg-blue-300 px-5 py-3 border rounded-xl">
        Wyślij odpowidź
      </button> -->
    </pre>
  </div>
  <NavBottom />
  <!-- <div class="mx-12 py-10">
      <div class="mb-12">
        <p>test quiz id: {{ route.params.id }}</p>
        <h1 class="">Tytuł quizu: {{ quiz.title }}</h1>
        <h2 class="">Kategoria: {{ findCategory.name }}</h2>
        <img :src="quiz.image" class="" />
        <div>
          <h2>Pytanie 1: {{ start.next_question.question }}</h2>
          <p>Odpowiedzi:</p>
          <div v-for="answers in start.next_question.answers" :key="answers.id">
            <p>{{ answers.answer }}- {{ answers.id }}</p>
          </div>
          <p>id_pytania: {{ start.next_question.id }}</p>
          <pre>
  Pytanie:{{ correct }} 
  Odpowiedzi: {{ correctAnswer1 }} </pre
          >
        </div>
      </div>
      <pre>
      {{ quiz }}
      {{ findCategory }}
DO znalezienie id pytania 
      {{ start }}
      {{ start.next_question.answers[0].id }}
      </pre>
      <div>
        <button @click="postAnswer" class="bg-blue-300 px-5 py-3 border rounded-xl">
          Wyślij odpowidź
        </button>
        {{ NextQuestion }}
        <p class="answer">test</p>
      </div>
    </div> -->
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useQuiz } from "@/store/useQuiz";
const route = useRoute();
const quizState = useQuiz();

const currentTitle = ref(
  "Jaką zupę podano Jackowi Soplicy w “Pan Tadeusz” Adama Mickiewicza ?"
);

await quizState.startingQuiz(route.params.id);
const { startQuiz,nextQuestion, getNextQuestion } = storeToRefs(quizState);
let start: any = startQuiz.value;
// await quizState.getNextQuestion(start.submission_id)
// let nextQuestion1 = getNextQuestion.value
// console.log(nextQuestion1)

const current = ref(startQuiz.value)
const checkAnswer= ref()
// const currentQuestion = async ()=>{
//   if(nextQuestion){
//     return nextQuestion
//   } else {
//     return nextQuestion
//   }
// }
// let next = ref<any>(nextQuestion)
// const check = () =>{
//   if(next.length > 1){
//     console.log('test')
//   }
// }
 const postAnswer = async (question_id:any, ansewer_id:any)=> {
 const res =  await quizState.postAnswerNextQuestion(
    start.submission_id,
    start.next_question.id,
    start.next_question.answers[2].id
    );
    let next = nextQuestion.value
   startQuiz.value = null
   checkAnswer.value = next
   current.value = next
}

</script>

<style scoped lang="scss">
@import "@/assets/style/variables";
.circle-answer {
  height: 38px;
  width: 38px;
  margin-left: 7px;
  position: relative;
  background-color: $secondary;
  border-radius: 200px;
}
.circle-answer-text {
  position: absolute;
  font-size: 21px;
  font-weight: 600;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.answer {
  text-align: center;
  padding: 15px;
  font-size: 14px;
  // height: 52px;
  font-weight: 700;
  padding-left: 10px;
}
.single-answer {
  display: flex;
  width: 100%;
  place-items: center;
  margin-top: 16px;
  border: 1px solid $primary;
  border-radius: 12px;
  background-color: #dee7ff;
}

.single-answer:focus {
  display: flex;
  place-items: center;
  margin-top: 16px;
  border: 1px solid $secondary;
  border-radius: 12px;
  background-color: #dee7ff;
}

.quest-bg {
  margin: 33px 27px;
  height: 200px;
  position: relative;
  padding-top: 11%;
  //background: linear-gradient(100.61deg, #3863D1 12.67%, #618CFB 88.68%, #497CFF 88.68%);
  background: linear-gradient(
    103.38deg,
    #3961c9 -9.26%,
    #618cfb 119.62%,
    #497cff 119.62%
  );
  border-radius: 16px;
  p {
    font-family: "Manrope";
    font-style: normal;
    font-weight: 700;
    font-size: 11px;
    line-height: 15px;
    text-align: center;
    color: #dbdbdb;
  }
  h5 {
    font-family: "Manrope";
    margin: 2px 32px;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
    /* or 153% */
    text-align: center;
    color: #ffffff;
  }
}
.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50% -50%);
}
</style>
