<template>
    <NuxtLink :to="`/panel/konto/dodane-quizy/${quiz.id}`">
        <div class="card bg-size" :style="`background-image: url(${quiz.image})`" @click="isClose()">
            <div class="bg-image">
          <div class="details">
              <h3 class="title">{{ quiz.title }}</h3>
          </div>
      </div>
      </div>
      </NuxtLink>
</template>

<script setup lang="ts">
import { Quiz } from "@/types";
import { useUser } from "@/store/useUser";
import { storeToRefs } from "pinia";

defineProps<{ quiz: Quiz }>();

const { hasPremium } = storeToRefs(useUser());
const userPlan = hasPremium;
const isOpen = ref(false)
const isClose = ()=>{
    isOpen.value =! isOpen.value
}
const isQuiz = ref(false)
const isQuizClose = ()=>{
    isQuiz.value =! isQuiz.value
}
</script>

<style scoped>

@media only screen and (max-width: 520px) {
.card{
    border-radius: 24px;
    margin-bottom: 24px;
}
.bg-image{
    width: 100%;
    position: relative;
    border-radius: 24px;
    height: 150px;
    background: linear-gradient(27.47deg, rgba(0, 0, 0, 0.77) 31.09%, rgba(0, 0, 0, 0) 79.45%);
}
.details{
    position: absolute;
    bottom: 16px;
    margin-left: 16px;
    margin-right: 16px;
}
.title{
color:white;
font-weight: 500;
font-size: 16px;
line-height: 27px;
}

.des {
  color:white;
  font-weight: 300;
font-size: 12px;
line-height: 22px;
}
.vl {
  border-left: 1px solid white;
  margin-top: 3px;
  margin-bottom: 3px;
}
}


@media only screen and (min-width: 520px) {
    .card{
        border-radius: 14px;
        margin-top: 12px;
    }
    .bg-image{
        width: 100%;
        position: relative;
        border-radius: 14px;
        height: 220px;
        background: linear-gradient(27.47deg, rgba(0, 0, 0, 0.77) 31.09%, rgba(0, 0, 0, 0) 79.45%);
    }
    .details{
        position: absolute;
        bottom: 20px;
        margin-left: 20px;
        margin-right: 20px;
    }
    .title{
    color:white;
    font-size: 18px;
    }
    
    .des {
      font-weight: 500;
      font-size: 12px;
    }
    .vl {
      border-left: 1px solid whitey;
      margin-top: 3px;
      margin-bottom: 3px;
    }
    }


    .bg-size{
        background-size: cover;

    }
</style>