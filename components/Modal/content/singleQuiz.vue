<template>
  <div class="content -mt-3 overflow-y-scroll scrollbar-hide">
    <img :src="quiz.image" class="image"/>
    <div class="w-full flex justify-beetwen place-items-center">
        <p class="text-[22px] font-semibold w-full mt-[-4px]">{{ quiz.title }}</p>
      <div class="send-link" @click="copyLink(quiz?.id)">
        <div class="tooltip" v-if="tooltip">
          <span ref="tooltip" class="tooltiptext family"> Skopiowano link </span>
        </div>
        <Icon name="mdi:link-variant" size="26" color="#618cfb" class="copy" />
      </div>
    </div>
    <div class="mt-4 mb-7 gap-[5px] flex flex-col">
      <div class="flex flex-row">
        <p class="text-base text-[#a7a2a2] font-thin">Kategoria:</p>
        <p class="text-base primary-color font-medium ml-[4px]">{{ quiz.category[0].name }}</p> 
      </div>
      <div class="flex flex-row">
        <p class="text-base text-[#a7a2a2] font-thin">Liczba pytań:</p>
      <p class="text-base primary-color font-medium ml-[4px]">{{ quiz.questions_count }}</p> 
    </div>
    <div class="flex flex-row">
      <p class="text-base text-[#a7a2a2] font-thin">Poziom trudności:</p>
      <p class="text-base primary-color font-medium ml-[4px]">{{ quiz.difficulty }}</p> 
    </div>
    <div class="flex flex-row">
      <p class="text-base text-[#a7a2a2] font-thin">Szacunkowy czas trwania:</p>
      <p class="text-base primary-color font-medium ml-[4px]">{{ quiz.time }}</p> 
    </div>
  </div>
    <div v-if="quiz.description">
      <p class="text-lg font-semibold">Opis quizu</p>
      <p class="text mt-2 pr-6">{{ quiz.description }}</p>
    </div>
    <NuxtLink :to="`/panel/quiz/${quiz?.id}`" class="button-primary mb-[21px] mt-[42px]">
      <p class="text-center">Zagraj w quiz</p>
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">
import { Quiz } from "@/types";

defineProps<{ quiz: Quiz }>();

const emit = defineEmits<{
  (e: "close", value: any): void;
}>();

// TODO: Dodać domene do linku
const tooltip = ref<boolean>();
const copyLink = (quizId: any) => {
  let token: any = `/panel/quiz/${quizId}`;
  navigator.clipboard.writeText(token);
  tooltip.value = !tooltip.value;
  setTimeout(() => (tooltip.value = false), 1700);
};
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.close {
  color: rgb(134, 134, 134);
  position: absolute;
  background-color: rgba(0, 0, 0, 0.521);
}
.content {
  height: 411px;
}
.send-link {
  background-color: #618dfb49;
  border-radius: 8px;
  height: 38px;
  width: 38px;
}

.tooltip {
  position: absolute;
  display: inline-block;
}
.tooltip .tooltiptext {
  visibility: hidden;
  width: 165px;
  background-color: #433d3d;
  color: #fff;
  font-size: 14px;
  font-weight: 300;
  text-align: center;
  border-radius: 8px;
  padding-top: 8px;
  padding-bottom: 10px;
  position: absolute;
  z-index: 1;
  margin: 25px;
  bottom: -7px;
  right: -70px;

  opacity: 0;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
  transition: opacity 0.4s;
}
.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 80%;
  margin-left: 0px;
  border-width: 6px;
  border-style: solid;
  border-color: #433d3d transparent transparent transparent;
}
.tooltip .tooltiptext {
  visibility: visible;
  opacity: 1;
}

.copy {
  margin: 5px;
}

.image{
  border: 1px solid $border;
border-radius: 12px;
margin-bottom: 16px;
height: 240px;

}
</style>
