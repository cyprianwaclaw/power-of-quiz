<template>
    <div v-if="!hasPremium">
        <div v-if="isOpen">
            <ModalPremiumPlan
            @close= "isClose" 
            />
        </div>
        <div class=""  @click="isClose()">           
            <img v-if="!quiz.image" src="@/assets/file/placeholder-image.webp" class="my-quiz-image"/>
            <img v-if="quiz.image" :src="quiz.image" class="my-quiz-image isLoading" />
            <p class="my-quiz-title">{{ quiz.title }}</p>
        </div>
      </div>
    <div v-else>
        <div v-if="isQuiz">
            <ModalDown
            title="Quiz"
            @close= "isQuizClose" 
            >
            <template #content>
              <ModalContentSingleQuiz
              :quiz="quiz"
              />
              </template>
              </ModalDown>
         </div>   
        <!-- <NuxtLink :to="`/panel/konto/dodane-quizy/${quiz.id}`"> -->
            <div class="" @click="isQuizClose()">           
                <img v-if="!quiz.image" src="@/assets/file/placeholder-image.webp" class="my-quiz-image"/>
                <img v-if="quiz.image" :src="quiz.image" class="my-quiz-image isLoading" />
                <p class="my-quiz-title">{{ quiz.title }}</p>
            </div>
        <!-- </NuxtLink> -->
    </div>
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
.my-quiz-image{
    width: 100%;
    height: 120px;
    border-radius: 12px;
}
.my-quiz-title{
font-size: 15px;
}
}


@media only screen and (min-width: 520px) {
    .card{
        border-radius: 24px;
        margin-top: 12px;
    }
    .bg-image{
        width: 100%;
        position: relative;
        border-radius: 24px;
        height: 270px;
        background: linear-gradient(27.47deg, rgba(0, 0, 0, 0.77) 31.09%, rgba(0, 0, 0, 0) 79.45%);
    }
    .details{
        position: absolute;
        bottom: 20px;
        margin-left: 12px;
        margin-right: 12px;
    }
    .title{
    color:white;
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



    .isLoading{
        height: 600px;
        background-color: gray;
    }
</style>