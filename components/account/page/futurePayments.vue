<template>
  <div class="flex w-full flex-col">
    <p class="text-3xl font-semibold mb-5">Faktury i płatności</p>
    <p class="text-xl font-semibold mb-5">Historia płatności</p>
  </div>
  </template>
  <script setup lang="ts">
import { storeToRefs } from "pinia";
import { useQuiz } from "@/store/useQuiz";
import { useUser } from "@/store/useUser";

const userStore = useUser();
const { currentUser } = storeToRefs(userStore);
await userStore.getUser();
let user = currentUser.value;
</script>
  
  <style scoped lang="scss">
  @import "@/assets/style/variables.scss";

  </style>
  