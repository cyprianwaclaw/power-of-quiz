<template>
  <div class="flex w-full flex-col gap-y-14">
    <p class="text-3xl font-semibold -mb-5">Ustawienia konta</p>
    <AccountPageContentPersonal/>
  <AccountPageContentCompany/>
  <AccountPageContentFinancial/>
</div>
  </template>
  <script setup lang="ts">
import { storeToRefs } from "pinia";
import { useQuiz } from "@/store/useQuiz";
import { useUser } from "@/store/useUser";
const test = ref()
const userStore = useUser();
const { currentUser } = storeToRefs(userStore);
await userStore.getUser();
let user = currentUser.value;

const { getFinancial, all } = storeToRefs(userStore);
await userStore.getSettingsUser();
let financial = getFinancial.value;

</script>
  
  <style scoped lang="scss">
  @import "@/assets/style/variables.scss";

  </style>
  