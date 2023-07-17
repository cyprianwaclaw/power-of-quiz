<template>
    <div class="grid grid-cols-2 grid-rows-1">
        <div class="start-cols-1">
            <!-- <div class="hero-image-alert"> -->
                <img :src="quiz.image" class="w-[400px] h-[450px] hero-image-alert"/>
                <!-- </div> -->
        </div>
        <div class="start-cols-2 ml-12 mr-9 min-h-full">
            <p class="text-[22px] font-semibold w-[300px] mt-[-4px]">{{ quiz.title }}</p>
            <div class="mt-4 mb-7 gap-[5px] flex flex-col">
                <div class="flex flex-row">
                  <p >Kategoria:</p>
                  <p class="text-base primary-color font-medium ml-[4px]">{{ quiz.category[0].name }}</p> 
                </div>
                <div class="flex flex-row">
                  <p>Liczba pytań:</p>
                <p class="text-base primary-color font-medium ml-[4px]">{{ quiz.questions_count }}</p> 
              </div>
              <div class="flex flex-row">
                <p>Poziom trudności:</p>
                <p class="text-base primary-color font-medium ml-[4px]">{{ quiz.difficulty }}</p> 
              </div>
              <div class="flex flex-row">
                <p>Szacunkowy czas trwania:</p>
                <p class="text-base primary-color font-medium ml-[4px]">{{ quiz.time }}</p> 
              </div>
            </div>
            <div v-if="quiz.description">
                <p class="text-lg font-semibold">Opis quizu</p>
                <p class="text mt-2 pr-6">{{ quiz.description }}</p>
              </div>
            <NuxtLink :to="`/panel/quiz/${quiz?.id}`" class="button-primary absolute bottom-[48px] w-[300px]">
                <p class="text-center">Zagraj w quiz</p>
              </NuxtLink>
        </div>
        </div>
    <!-- </div>
        <div class="content -mt-3 overflow-y-scroll scrollbar-hide">
    <div class="w-full flex justify-beetwen place-items-center">
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
  </div> -->
  </template>
  
  <script setup lang="ts">
import { Quiz } from "@/types";

defineProps<{ quiz: Quiz }>();
  </script>
  
  <style scoped lang="scss">
  @import "@/assets/style/_variables.scss";
  .hero-image-alert{
    position:absolute;
    width: 400px;
    height: 450px;
    top: 0;
    left: 0;
    margin: -3px 0px 0px -3px;
    border: transparent;
    border-radius: 24px 0px 0px 24px;
    object-fit: cover;
  }
  </style>
  