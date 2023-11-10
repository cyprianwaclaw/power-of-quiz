<template>
  <div class="h-screen">
    <NavUser />
    <div class="pt-[95px] px-8">
      <pre>
        <!-- {{  singleQuiz }} -->
        <!-- {{ startQuiz }} -->
        {{ submission  }}
        {{ nextQuestion }}
        <!-- {{ startQuiz }} -->
      </pre>
    </div>
    <!--  {{ current.submission_id }}
      <img :src="singleQuiz.image" class="image-single" />
      <p class="text-[20px] font-medium tracking-wider text-center mt-[24px] mb-[12px]">{{ current.next_question.question }}</p>
      <div v-for="(quiz, index) in current" :key="index">
        <div class="grid grid-cols-2 gap-4">
          <div
            v-for="(answer, index) in quiz?.answers"
            :key="index"
            @click="postAnswer(quiz.id, answer.id)"
            :class="{
              'questOK': answer.id === select && isCorrect,
              'questERROR': answer.id === select && isInCorrect,
              'quest': answer.id !== select || (!isCorrect && !isInCorrect)
            }"
              class="grid place-items-center h-[84px] border cursor-pointer"
              >
            <p>{{ answer.answer }}</p>
          </div>
        </div>
      </div>
    </div> -->
    <NavBottom />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useQuiz } from "@/store/useQuiz";
const route = useRoute();
const quizState = useQuiz();
// await quizState.getSingleQuiz(route.params.id);
// await quizState.startingQuiz(route.params.id);
const { singleQuiz, startQuiz, nextQuestion} = storeToRefs(quizState);
// let start: any = startQuiz.value;
await quizState.getSingleQuiz(route.params.id)
// const current = ref(startQuiz.value);
const isCorrect = ref(false) as any;
const isInCorrect = ref(false) as any;
// getNextQuestion
await quizState.getNextQuestion(12)

const submission = ref() as any;
// await quizState.getNextQuestion()

// await quizState.startingQuiz(route.params.id);


const checkSubmission = async () => {
  if(submission){
  return submission
} else{
// await quizState.startingQuiz(route.params.id);
// submission.value = startQuiz.value.data.submission_id
}
}
onMounted( async ()=>{
// await quizState.startingQuiz(route.params.id);
// submission.value = startQuiz.value.data.submission_id

  // checkSubmission ()
})
const select = ref(null);
// const postAnswer = async (question_id: any, ansewer_id: any) => {
//   await quizState.postAnswerNextQuestion(start.submission_id, question_id, ansewer_id);
//   let next = nextQuestion.value;
//   select.value = ansewer_id;
//   startQuiz.value = null;
//   checkAnswerAlert(next.is_correct);
//   console.log(next.is_correct);
//   setTimeout(async () => {
//     current.value = next;
//   }, 400);
// };

const checkAnswerAlert = (check: any) => {
  if (check == 0) {
    isInCorrect.value = true;
    setTimeout(() => {
      isInCorrect.value = false;
    }, 360);
  } else if (check == 1) {
    isCorrect.value = true;
    setTimeout(() => {
      isCorrect.value = false;
    }, 360);
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/style/variables";

.image-single {
  border: 1px solid $border;
  border-radius: 12px;
  height: 200px;
  width: 100%;
  margin-bottom: 14px;
}

.single-answer:focus {
  display: flex;
  place-items: center;
  margin-top: 16px;
  border: 1px solid $secondary;
  border-radius: 12px;
  background-color: #dee7ff;
}

.quest {
  // margin: 33px 27px;
  height: 100px;
  position: relative;
  //padding-top: 11%;
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
    font-weight: 500;
    font-size: 14px;
    line-height: 15px;
    text-align: center;
    color: #dbdbdb;
    letter-spacing: 1.12px;
  }
}
.questOK {
  height: 100px;
  position: relative;
  background-color: $color-success;
  // background: linear-gradient(
  //   103.38deg,
  //   #3961c9 -9.26%,
  //   #618cfb 119.62%,
  //   #497cff 119.62%
  // );
  border-radius: 16px;
  p {
    font-family: "Manrope";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 15px;
    text-align: center;
    color: #dbdbdb;
    letter-spacing: 1.12px;
  }
}
.questERROR {
  height: 100px;
  position: relative;
  background-color: $color-error;
  // background: linear-gradient(
  //   103.38deg,
  //   #3961c9 -9.26%,
  //   #618cfb 119.62%,
  //   #497cff 119.62%
  // );
  border-radius: 16px;
  p {
    font-family: "Manrope";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 15px;
    text-align: center;
    color: #dbdbdb;
    letter-spacing: 1.12px;
  }
}
</style>
