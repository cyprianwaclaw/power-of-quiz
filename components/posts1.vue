<template>
    <div class="flex">
      posts1
{{ user }}
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
  