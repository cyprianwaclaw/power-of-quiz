<template>
  <div class="h-screen">
    <NavUser />
    <div class="w-full loading-bar-bg absolute top-[64px] h-[8px] md:h-[14px]">
      <div class="loading-bar absolute h-[8px] md:h-[14px]" ref="loadingBar"></div>
    </div>
    <div class="pt-[95px] px-8 md:w-[500px] mx-auto">
      <!-- <div v-if="!isNextQuestion">
  test
      </div> -->
      <!-- <div class="w-full flex flex-col items-center justify-center gap-2 mb-10">
        <p class="flex text-center">{{ isAnimating }}</p>
        <div class="flex gap-5">
          <button @click="start" class="button-primary w-[100px]">Start</button>
          <button @click="stop" class="button-primary w-[100px]">Stop</button>
        </div>
        <button @click="reserve" class="text-semibold text-red-500 w-[220px]">
          Reserve
        </button>
      </div> -->
      <!-- <div class="flex flex-col gap-2">
        <p>{{ countQuestion }}/{{ singleQuiz.questions_count }}</p>
        <div class="flex gap-2">
          <p>Poprawne odpowiedzi: {{ countCorrect }}</p>
        </div>
        <div class="flex gap-2">
          <p>Błędne odpowiedzi: {{ countInCorrect }}</p>
        </div>
      </div> -->
      <div v-if="isNextQuestion">
        <img :src="singleQuiz.image" class="image-single" />
        <div class="w-full flex flex-col items-center justify-center">
          <p class="text-[13px] text-gray-400">
            {{ countQuestion }}/{{ singleQuiz.questions_count }}
          </p>
          <p class="text-[20px] font-semibold mb-5">
            {{ current.data.next_question.question }}
          </p>
        </div>
        <div v-for="(quiz, index) in current.data" :key="index">
          <div class="grid grid-cols-2 gap-4">
            <button
              :disabled="isLoading"
              v-for="(answer, index) in quiz?.answers"
              :key="index"
              @click="postAnswer(quiz.id, answer.id)"
              :class="{
                questERROR: notAnswer || (answer.id === select && isInCorrect),
                questOK: answer.id === select && isCorrect,
                quest:
                  !notAnswer && (answer.id !== select || (!isCorrect && !isInCorrect)),
              }"
              class="grid place-items-center h-[84px] border cursor-pointer"
            >
              <p class="answer-text">{{ answer.answer }}</p>
            </button>
          </div>
        </div>
      </div>
       <div
        v-else>
      <div
        class="w-full flex flex-col items-center justify-center bg-white p-10 border-transparent rounded-[21px]"
      >
      <p class="text-center text-[14px] text-gray-400 mb-[4px]">
        Czas rozwiązywania
      </p>
      <p class="font-semibold text-[28px]">
        {{ current?.data?.quiz_time }}
      </p>
        <div class="flex w-full gap-14  mt-5 mb-8 items-center justify-center">
          <div class="flex flex-col">
            <p class="correct text-[18px] text-center">{{ countCorrect }}</p>
            <p class="correct text-[18px]">Poprawne</p>
          </div>
          <div class="flex flex-col">
            <p class="bad text-center">{{ countInCorrect }}</p>
            <p class="bad">Błędne</p>
          </div>
        </div>
        <button class="button-primary w-full" @click="replay">Zagraj ponownie</button>
      </div>
      Polecane quizu:

       </div>
    </div>
    <NavBottom />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useQuiz } from "@/store/useQuiz";
import gsap from "gsap";
import { set } from "nuxt/dist/app/compat/capi";

const loadingBar = ref(null);
const isAnimating = ref(false);
let animationTimeline = null as any;
const answerChecked = ref(false);
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

const cookie = useCookie("bar") as any;
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
      cookie.value = progress;
    },
  });

  tl.to(loadingBar.value, { x: "100%", duration: 10, ease: "linear" });

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
const { singleQuiz, startQuiz, nextQuestion, answerById } = storeToRefs(quizState);
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
const notAnswer = ref(false) as any;
const select = ref(null);

onBeforeUnmount(() => {
  cookie.value = "0";
});

watch(isAnimating, async (newValue: boolean) => {
  console.log(select.value);
  console.log(answerChecked.value);
  if (newValue === false && answerChecked.value === false) {
    // setTimeout(()=>{
    notAnswer.value = true;

    // }, 1000)
    //  select.value = null
    await quizState.getAnswerById(current.value.data.next_question.id);
    let currentQuestion = answerById.value;
    let inCorrectAnswer = currentQuestion.find(
      (answer: any) => answer.correct == 0
    ) as any;
    // console.log(inCorrectAnswer.id);
    // console.log(currentQuestion);
    // console.log(current.value.data.next_question.id);
    postAnswer(current.value.data.next_question.id, inCorrectAnswer.id);
  }
});

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
  } else if (submissionQuiz.value == true) {
  } else {
    start();
    cookie.value = "0";
  }
});
const postAnswer = async (question_id: any, answer_id: any) => {
  answerChecked.value = true;
  setTimeout(() => {
    notAnswer.value = false;
  }, 800);
  stop();
  isLoading.value = true;
  await quizState.postAnswerNextQuestion(submissionQuiz.value, question_id, answer_id);
  let next = nextQuestion.value;
  select.value = answer_id;
  startQuiz.value = null;
  checkAnswerAlert(next.is_correct);
  setTimeout(async () => {
    current.value = next;
    isLoading.value = false;
    // select.value = null
    // quizTime.value = true
  }, 400);
  answerChecked.value = false;

  // setTimeout(() => {
  // },4000)
  question.value = next;
  checkAnswerAlert(nextQuestion.value.data.is_correct);
  if (nextQuestion.value.data.is_correct == 1) {
    countCorrect.value = countCorrect.value + 1;
    // select.value = null
  } else {
    countInCorrect.value = countInCorrect.value + 1;
    // select.value = null
  }
  if (nextQuestion.value.data.next_question) {
    // answerChecked.value = false;
    countQuestion.value = countQuestion.value + 1;
    let next = nextQuestion.value.data.next_question;
    reserve();
  } else {
    answerChecked.value = false;
    submissionQuiz.value = true;
    setTimeout(async () => {
      isNextQuestion.value = false;
      console.error("koniec_quizu");
      cookie.value = "0";
      stop();
      reserve();
      stop();
    }, 600);
  }
};

const replay = async () => {
  start();
  cookie.value = "0";
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
};

const checkAnswerAlert = (check: any) => {
  if (check == 0) {
    isInCorrect.value = true;
    setTimeout(() => {
      isInCorrect.value = false;
    }, 550);
  } else if (check == 1) {
    isCorrect.value = true;
    setTimeout(() => {
      isCorrect.value = false;
    }, 550);
  }
};
onBeforeRouteUpdate(async (to) => {
  submissionQuiz.value = false;
  stop();
});
</script>

<style scoped lang="scss">
@import "@/assets/style/variables";
.answer-text {
  font-size: 15px !important;
  line-height: 22px !important;
  padding: 14px !important;
  word-break: break-all;
}
.image-single {
  border: 1px solid $border;
  border-radius: 12px;
  height: 214px;
  width: 100%;
  margin-bottom: 24px;
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
  border-radius: 12px;
  background: linear-gradient(
    103.38deg,
    #3961c9 -9.26%,
    #618cfb 119.62%,
    #497cff 119.62%
  );
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
  background-color: $color-success;
  cursor: not-allowed;
  border-radius: 12px;
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
  background-color: $color-error;
  cursor: not-allowed;
  border-radius: 12px;
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
  width: 100%;
  background: #d5e0fc;
  z-index: 10;
}
.loading-bar-bg {
  background: linear-gradient(
    103.38deg,
    #3961c9 -9.26%,
    #618cfb 119.62%,
    #497cff 119.62%
  );
}
</style>
