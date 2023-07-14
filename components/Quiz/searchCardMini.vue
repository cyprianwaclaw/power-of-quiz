<template>
    <div v-if="!hasPremium">
        <div v-if="isOpen">
            <ModalPremiumPlan
            @close= "isClose" 
            />
        </div>
        <!-- <div class="card w-[260px] bg-size" :style="`background-image: url(${quiz.image})`"  @click="isClose()">
            <div class="bg-image">
                <div class="details">
                    <h3 class="title">{{ quiz.title }}</h3>
                    <div class="float-left flex mt-3 gap-3">
                        <p class="des">{{ quiz.questions_count }} pytań</p>
                        <div class="vl"></div>
                        <p class="des">{{ quiz.time }} min</p>
                        <div class="vl"></div>
                        <p class="des">{{ quiz.difficulty }}</p>
                    </div>
                </div>
            </div>
        </div> -->
        <div class="flex place-items-center w-[250px]">
            <img :src="quiz.image" class="w-14 h-14 border-slate-300 border rounded-[4px]"/>
            <div class="flex flex-col">
              <p> {{ truncateText(quiz.title, 18).name }}{{ truncateText(quiz.title, 10)?.symbol }}</p>
                <div class="flex gap-2">
                <!-- <p class="des">   {{ quiz.questions_count }} pytania</p>
                 <div class="vl"></div>  -->
                <p class="des">   {{ quiz.category[0].name }} </p>
                  <div class="vl"></div> 
                <p class="des">   {{ changeDifficult(quiz.difficulty) }} </p>
                </div>
            </div>
        </div>
      </div>
      <div v-else>
            <ModalDown
 :modalActive="isQuiz"
            title="Quiz"
            @close= "isQuizClose" 
            >
            <template #content>
              <ModalContentSingleQuiz
              :quiz="quiz"
              />
              </template>
              </ModalDown>
              <!-- <div class="card w-[140px] bg-size" :style="`background-image: url(${quiz.image})`" @click="isQuizClose()">
                  <div class="bg-image">
                      <div class="details">
                          <h3 class="title">{{ quiz.title }}</h3>
                          <div class="float-left flex mt-3 gap-3">
                              <p class="des">{{ quiz.questions_count }} pytań</p>
                              <div class="vl"></div>
                              <p class="des">{{ quiz.time }} min</p>
                              <div class="vl"></div>
                              <p class="des">{{ quiz.difficulty }}</p>
                              <div class="vl"></div>
                              <p class="des">{{ quiz?.category[0].name }}</p>
                            </div>
                        </div>
                    </div>
                </div> -->
                <div>
                    {{ quiz.title }}
                </div>
        </div>
</template>

<script setup lang="ts">
import { Quiz } from "@/types";
import { useUser } from "@/store/useUser";
import { storeToRefs } from "pinia";

defineProps<{ quiz: Quiz }>();

const { hasPremium } = storeToRefs(useUser());
const isOpen = ref(false)
const isClose = ()=>{
    isOpen.value =! isOpen.value
}

const isQuiz = ref(false)
const isQuizClose = ()=>{
    isQuiz.value =! isQuiz.value
}
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
.card{
    border-radius: 24px;
}
.bg-image{
    width: 100%;
    position: relative;
    border-radius: 24px;
    height: 120px;
    background: linear-gradient(27.47deg, rgba(0, 0, 0, 0.77) 31.09%, rgba(0, 0, 0, 0) 79.45%);
}
.details{
    position: absolute;
    bottom: 24px;
    margin-left: 24px;
    margin-right: 24px;
}
.title{
color:white;
font-weight: 500;
font-size: 18px;
line-height: 27px;
}

.des {
  color:$text-gray;
  font-weight: 400;
font-size: 14px;
line-height: 22px;
}
.vl {
  border-left: 1px solid $text-gray;
  margin-top: 4px;
  margin-bottom: 4px;
}

</style>