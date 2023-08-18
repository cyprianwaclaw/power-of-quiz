<template>
    <div class="flex w-full flex-col">
      <p class="text-3xl font-semibold mb-5">Dostępne pakiety</p>
    </div>
  </template>
  <script setup lang="ts">
  
  import { storeToRefs } from "pinia";
  import { useQuiz } from "@/store/useQuiz";
  import { useUser } from "@/store/useUser";
  
  definePageMeta({
  middleware: "auth",
  });

  </script>
  
  <style scoped lang="scss">
  @import "@/assets/style/variables.scss";
  
  </style>
  