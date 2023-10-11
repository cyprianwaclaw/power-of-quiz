<template>
  <div class="card bg-size" :style="`background-image: url(${quiz.image})`">
    <div class="bg-image">
      <div class="details">
        <h3 class="title">{{ quiz.title }}</h3>
        <div class="float-left flex gap-3 text-white">
          <p class="des">{{ quiz.questions_count }} pytań</p>
          <div class="vl"></div>
          <p class="des">{{ quiz.time }} min</p>
          <div class="vl"></div>
          <p class="des">{{ quiz.difficulty }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Quiz } from "@/types";
// import { useUser } from "@/store/useUser";
// import { storeToRefs } from "pinia";

defineProps<{ quiz: Quiz }>();
// const isOpen = ref(false);
// const isClose = () => {
//   isOpen.value = !isOpen.value;
// };
// const isQuiz = ref(false);
// const isQuizClose = () => {
//   isQuiz.value = !isQuiz.value;
// };
</script>

<style scoped>
.card {
  border-radius: 10px;
  cursor: pointer;
}

.bg-image {
  width: 100%;
  position: relative;
  border-radius: 10px;
  height: 115px;
  background: linear-gradient(
    27.47deg,
    rgba(0, 0, 0, 0.77) 31.09%,
    rgba(0, 0, 0, 0) 79.45%
  );
}
.details {
  position: absolute;
  bottom: 16px;
  margin-left: 16px;
  margin-right: 16px;
}
.title {
  color: white;
  font-weight: 500;
  font-size: 16px;
  line-height: 27px;
}

.des {
  color: white;
  font-weight: 300;
  font-size: 12px;
  line-height: 22px;
}
.vl {
  border-left: 1px solid white;
  margin-top: 3px;
  margin-bottom: 3px;
}
</style>
