<template>

  <div class="h-screen">
  <NavUser />
    <div class="pt-[95px] px-8">
      <img :src="singleQuiz.image" class="image-single" />
      <div v-for="(quiz, index) in current" :key="index" class="mt-2">
        <div class="w-full justify-center flex mb-[15px]">
          <p class="text-base font-medium tracking-wider">{{ quiz?.question }}</p>
        </div>

        <div class="grid grid-cols-2 gap-4">
            {{ answer }}
            <div v-for="(answer, index) in quiz?.answers" :key="index" @click="postAnswer(quiz.id, answer.id)" 
            :class="[ 
              answer.id == select && checkAnswerAlert() == false ? 'bg-red-400':'bg-[#DEE7FF]',
              answer.id == select && checkAnswerAlert() == true ? 'bg-green-400':'bg-[#DEE7FF]',
            ]"
            class="grid place-items-center h-[84px] border cursor-pointer">
              <p>{{ answer.answer }}</p>
            </div>
          </div>
        </div>
    </div>
    <NavBottom />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useQuiz } from "@/store/useQuiz";
const route = useRoute();
const quizState = useQuiz();
await quizState.getSingleQuiz(route.params.id);
await quizState.startingQuiz(route.params.id);
const {singleQuiz, startQuiz, nextQuestion, getNextQuestion1 } = storeToRefs(quizState);
let start: any = startQuiz.value;

const current = ref<any>(startQuiz.value);
const checkAnswer = ref(null);

// await quizState.getNextQuestion(start.submission_id)
let select = ref()
const postAnswer = async (question_id: any, ansewer_id: any) => {
  await quizState.postAnswerNextQuestion(start.submission_id, question_id, ansewer_id);
  let next = nextQuestion.value
   startQuiz.value = null
   checkAnswer.value = next.is_correct
   select = ansewer_id
   setTimeout(async () => {
      current.value = next

   }, 1000)
};

// const test = () => {
//   if(select)
// }
const checkAnswerAlert = ()=>{
  if(checkAnswer.value == 0){
return false
  } else if(checkAnswer.value == 1){
    return true
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/variables";

.image-single {
  border: 1px solid $border;
  border-radius: 12px;
  height: 200px;
}

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
.active{
  background-color: $color-error;
  color: white;
}
</style>
