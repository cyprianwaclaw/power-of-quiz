<template>
  <ModalAlert :modalActive="isOpen" title="Jak zdobyć punkty" @close="isClose">
    <template #content>
      <ModalContentHowToGetPoints />
    </template>
  </ModalAlert>
  <div class="flex w-full flex-col">
    <p class="text-3xl font-semibold mb-5">Moje środki</p>
    <div class="grid grid-cols-2">

      <div>
        <h3 class="font-semibold text-[28px]">{{ point }} zł</h3>
        <p class="mt-[4px] text-gray-600 mb-[2px]">Twoje aktualne saldo</p>
        <button @click="isClose()">
          <p class="primary-color font-semibold text-[14px]">
            Jak zdobyć więcej punktów ?
          </p>
        </button>
      </div>

      <div class="grid place-items-center">
        <button class="button-primary-disabled" v-if="point == 0">
          Zleć wypłatę <Icon name="carbon:chevron-right" class="-mr-2" size="24" />
        </button>
        <NuxtLink to="/wypłata" v-else>
          <button class="button-primary">
            Zleć wypłatę <Icon name="carbon:chevron-right" class="-mr-2" size="24" />
          </button>
        </NuxtLink>
      </div>
    </div>
    <p class="text-3xl font-semibold mb-6 mt-10">Historia wypłat</p>
    <div class="flex flex-col">
      <div v-if="Object.keys(payouts).length > 0 ? false : true">
        <div class="grid place-items-center my-10">
          <Icon name="ph:hand-coins-light" size="166" color="#CFD8E0" />
          <p class="empty">Brak wypłat</p>
        </div>
      </div>
      <div
        v-else
        v-for="(single, index) in ownPayouts"
        :key="index"
        :class="[index % 2 === 0 ? 'bg-gray-50' : '']"
        class="py-[10px] my-[4px] px-[21px] grid grid-cols-2 justify-between"
      >
        <div>
          <p class="date-text">{{ single.date }}</p>
          <p class="text-xl font-semibold pt-[2px]">{{ single.amount }}</p>
        </div>
        <div class="grid justify-end content-center">
          <p :class="single.statusClass">{{ single.statusName }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUser } from "@/store/useUser";

const isOpen = ref(false);
const isClose = () => {
  isOpen.value = !isOpen.value;
};

const user = useUser();
await user.getUser();
const { currentUser, payouts } = storeToRefs(user);
const point = currentUser.value.points;
const userId = currentUser.value.id;
await user.getPayoutsObject(userId);

let ownPayouts = Object.values(payouts.value).map((single: any) => ({
  amount: single.points + " zł",
  date: new Date(single.created_at)
    .toISOString()
    .split("T")[0]
    .split("-")
    .reverse()
    .join("."),
  statusName: changePayoutsStatus(single.status).name,
  statusClass: changePayoutsStatus(single.status).class,
}));
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