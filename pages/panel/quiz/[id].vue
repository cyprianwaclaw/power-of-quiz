<template>
  <div class="h-screen">
    <NavUser />
    <div class="pt-[95px] w-full h-4 bg-red-300">
      <div class="loading-bar" ref="loadingBar">
      </div>
    </div>
    <div class="pt-[95px] px-8 md:w-[500px] mx-auto">
      <!-- <div class="w-full flex flex-col items-center justify-center gap-2 mb-10">
        <p class="flex text-center">{{ isAnimating  }}</p>
        <div class="flex gap-5">
          <button @click="start" class="button-primary w-[100px]">Start</button>
          <button @click="stop" class="button-primary w-[100px]">Stop</button>
        </div>
<button @click="reserve" class=" text-semibold text-red-500 w-[220px]">Reserve</button>

      </div> -->
    <img :src="singleQuiz.image" class="image-single" />
    <div class="flex flex-col gap-2 mb-10">
      <p>Pytanie: {{ countQuestion }}/{{ singleQuiz.questions_count }}</p>
        <div class="flex gap-2">
          <p>Poprawne odpowiedzi:{{ countCorrect }}</p>
        </div>
        <div class="flex gap-2">
          <p>Błędne odpowiedzi{{ countInCorrect }}</p>
        </div>
      </div>
        <div v-if="isNextQuestion">
        <div v-for="(quiz, index) in current.data" :key="index">
          <div class="grid grid-cols-2 gap-4">
            <button
            :disabled="isLoading" 
            v-for="(answer, index) in quiz?.answers"
            :key="index"
            @click="postAnswer(quiz.id, answer.id)"
            :class="{
              questOK: answer.id === select && isCorrect,
              questERROR: answer.id === select && isInCorrect,
              quest: answer.id !== select || (!isCorrect && !isInCorrect),
            }"
            class="grid place-items-center h-[84px] border cursor-pointer"  
            >
            <p>{{ answer.answer }}</p>
          </button>
        </div>
      </div>
    </div>
    <div v-else class="w-full flex flex-col items-center justify-center bg-white py-10 border-transparent rounded-md">
      <p class="text-center">Czas rozwiązywania quizu: {{ current?.data?.quiz_time }}</p>
      <button class="button-primary w-[220px] mt-4" @click="replay">Zagraj ponownie</button>
    </div>
  </div>
  <NavBottom />
</div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useQuiz } from "@/store/useQuiz";
import gsap from 'gsap';

const loadingBar = ref(null);
const isAnimating = ref(false);
let animationTimeline = null as any;

const start = () => {
  animationTimeline = animateProgressBar();

  // Rozpocznij animację, jeśli nie jest już uruchomiona
  if (!isAnimating.value) {
    animationTimeline.play();
    isAnimating.value = true;
  }
};

const stop = () => {
  // Zatrzymaj animację
  if (isAnimating.value) {
    animationTimeline.pause();
    isAnimating.value = false;
  }
};

const reserve = () => {
  // Rezerwuj animację
  if (!isAnimating.value) {
    animationTimeline.restart();
    isAnimating.value = true;
  }
};

const cookie = useCookie('bar') as any
const animateProgressBar = () => {
  const tl = gsap.timeline({
    paused: true,
    onComplete: () => {
      // Ustaw flagę, gdy animacja zostanie zakończona
      isAnimating.value = false;
    },
    onUpdate: () => {
      // Funkcja wywoływana podczas każdego kroku animacji
      const progress = tl.progress() as any; // Pobierz postęp animacji (wartość od 0 do 1)
      cookie.value = progress
    },
  });

  tl.to(loadingBar.value, { x: '100%', duration: 20, ease: 'linear' });

  // Znajdź pozycję, od której chcesz zacząć animację (np. 0.5 to środek animacji)
  const startPosition = cookie.value;
  const startingTime = startPosition * tl.duration();

  // Ustaw animację na określonej pozycji
  tl.seek(startingTime);
  tl.pause();

  return tl;
};


const route = useRoute();
const quizState = useQuiz();
await quizState.getSingleQuiz(route.params.id);
const { singleQuiz, startQuiz, nextQuestion } = storeToRefs(quizState);
const isLoading = ref(false);

const question = useCookie("question") as any;
const submissionQuiz = useCookie("submissionQuiz") as any;
const current = ref() as any;
current.value = question.value;


const countCorrect = useCookie("countCorrect") as any;
const countInCorrect = useCookie("countInCorrect") as any;
const isNextQuestion = useCookie("isNextQuestion") as any;
const countQuestion = useCookie("countQuestion") as any;
await quizState.getSingleQuiz(route.params.id);
const isCorrect = ref(false) as any;
const isInCorrect = ref(false) as any;
const select = ref(null);

onBeforeUnmount(() => {

cookie.value = '0'
})

onMounted(async () => {
  countCorrect.value = countCorrect.value ? countCorrect.value : 0;
  countInCorrect.value = countInCorrect.value ? countInCorrect.value : 0;
  countQuestion.value = countQuestion.value ? countQuestion.value : 1;

  if (submissionQuiz.value == false) {
    countCorrect.value = 0;
    countInCorrect.value = 0;
    countQuestion.value = 1;
    isNextQuestion.value = true;
    console.log(singleQuiz.value.id);
    console.log("nie ma submission");
    await quizState.startingQuiz(singleQuiz.value.id);
    submissionQuiz.value = startQuiz.value.data.submission_id;
    question.value = startQuiz.value;
    current.value = question.value;

  } else if(submissionQuiz.value == true){
 
  } else {
    start()
    cookie.value = '0'
  }
});
const postAnswer = async (question_id: any, answer_id: any) => {
  stop()
  isLoading.value = true;
  await quizState.postAnswerNextQuestion(submissionQuiz.value, question_id, answer_id);
  let next = nextQuestion.value;
  select.value = answer_id;
  startQuiz.value = null;
  checkAnswerAlert(next.is_correct);
  setTimeout(async () => {
    current.value = next;
    isLoading.value = false;
  }, 400);

  question.value = next;
checkAnswerAlert(nextQuestion.value.data.is_correct)
  if (nextQuestion.value.data.is_correct == 1) {
    countCorrect.value = countCorrect.value + 1;
  } else {
    countInCorrect.value = countInCorrect.value + 1;
  }
  if (nextQuestion.value.data.next_question) {
    countQuestion.value = countQuestion.value + 1;
    let next = nextQuestion.value.data.next_question;
    reserve()
  } else {
    submissionQuiz.value = true;
    isNextQuestion.value = false;
    console.error("koniec_quizu");
     stop()
     reserve()
       stop()
  }
};

const replay = async () => {
  submissionQuiz.value = false;
  countCorrect.value = 0;
  countInCorrect.value = 0;
  countQuestion.value = 1;
  isNextQuestion.value = true;
  console.log(singleQuiz.value.id);
  console.log("nie ma submission");
  await quizState.startingQuiz(singleQuiz.value.id);
  submissionQuiz.value = startQuiz.value.data.submission_id;
  question.value = startQuiz.value;
  current.value = question.value;
  start()
};

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
onBeforeRouteUpdate(async (to) => {
  submissionQuiz.value = false;
  stop()
});
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
  height: 100px;
  position: relative;
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
    cursor: not-allowed;
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
  cursor: not-allowed;
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

  .loading-bar {
    height: 40px;
    width: 100%;
    margin-top: -40px;
    background-color: #3498db;
  }
</style>