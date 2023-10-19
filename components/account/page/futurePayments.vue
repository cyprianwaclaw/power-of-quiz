<template>
  <div class="flex w-full flex-col">
    <p class="text-3xl font-semibold mb-5">Faktury i płatności</p>
    <p class="text-xl font-semibold mb-5">Historia płatności</p>
    <div class="grid place-items-center my-10">
      <Icon name="ph:clock-clockwise-light" size="166" color="#CFD8E0" />
      <p class="empty">Brak  płatności</p>
      <!-- <NuxtLink to="/panel/quiz/dodaj-nowy">
        <p class="font-base font-semibold primary-color place-items-center">
          Dodaj nowy
          <Icon name="carbon:chevron-right" size="21" class="primary-color" />
        </p>
      </NuxtLink> -->
    </div>
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

.invite-text {
  font-style: normal;
  font-weight: 800;
  font-size: 38px;
  color: #cfd8e0;
}
.empty{
  margin-top: 12px;
  margin-bottom: 12px;
  color: #cfd8e0;
  font-size: 38px;
  font-weight: 800;
}
.vl {
  border-left: 1px solid rgb(156 163 175);
  margin-top: 4px;
  margin-bottom: 4px;
}
</style>
