<template>
  <NavUser />
  <div class="h-screen">
    <!-- <div class="quest-bg">
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
      {{ start }}
      {{ checkAnswer }}
      <div class="mx-6" v-for="(answer, index) in current?.next_question.answers" :key="index">
        <button @click="postAnswer(current?.next_question.id, answer.id)" class="single-answer">
          <div class="circle-answer">
            <p class="circle-answer-text">A</p>
          </div>
          <p class="answer">{{ answer.answer }} {{ answer.id }}</p>
        </button>
      </div>
    </div> -->
    <!-- <div v-for="(question, index) in checkAnswer" :key="index">
      {{ question }}
      {{ question.is_correct === 0 ? "poprawna":"błędna odpowiedź" }}
      <div v-for="(answer, index) in question.answers" :key="index">
        {{ amswer }}
      </div>
    </div> -->
    <div class="pt-20 px-8">

        {{ checkAnswerAlert() }}
        <div v-for="(quiz, index) in current" :key="index">
          <p class="text-lg font-semibold">{{ quiz?.question }}</p>
          <div v-for="(answer, index) in quiz?.answers" :key="index">
            <button @click="postAnswer(quiz.id, answer.id)">{{ answer.answer }}</button>
          </div>
        </div>
      <!-- {{current }} -->
      <!-- {{ nextQuestion }} -->
      <!-- {{  getNextQuestion1 }} -->
    </div>
  </div>
  <NavBottom />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useQuiz } from "@/store/useQuiz";
const route = useRoute();
const quizState = useQuiz();

await quizState.startingQuiz(route.params.id);
const { startQuiz, nextQuestion, getNextQuestion1 } = storeToRefs(quizState);
let start: any = startQuiz.value;

const current = ref<any>(startQuiz.value);
const checkAnswer = ref(null);

// await quizState.getNextQuestion(start.submission_id)

const postAnswer = async (question_id: any, ansewer_id: any) => {
  await quizState.postAnswerNextQuestion(start.submission_id, question_id, ansewer_id);
  let next = nextQuestion.value
   startQuiz.value = null
   checkAnswer.value = next.is_correct
   current.value = next
};

const checkAnswerAlert = ()=>{
  if(checkAnswer.value == 0){
return 'błedna odpowiedz'
  } else if(checkAnswer.value == 1){
    return "poprawna odpowiedz"
  }
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
