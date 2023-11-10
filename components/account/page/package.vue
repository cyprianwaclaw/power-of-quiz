<template>
  <div class="flex w-full flex-col">
    <div v-if="premium">
      <p class="text-3xl font-semibold mb-5">Twój pakiet</p>
      {{ premium }}
    </div>
    <div v-else>
      <h1 class="title-h1">
        Odkryj pełnię<br />
        możliwości w pakiecie <span class="primary-color"> Premium</span>
      </h1>
      <div class="bg-white w-full border-transparent rounded-2xl">
        <div class="w-full flex justify-end pt-[28px] pr-[30px] gap-6">
          <p class="text-[14px] font-semibold">Standard</p>
          <p class="text-[14px] font-semibold primary-color">Premium</p>
        </div>
        <div class="pb-10 -mt-1">
          <PakietDesSingle
            title="Przeglądanie serwisu"
            des="Możesz przeglądać serwis oraz zapoznać się z  oferowanym produktem"
            checkStandard="true"
            checkPremium="true"
          />
          <PakietDesSingle
            title="Przeglądanie serwisu"
            des="Możesz przeglądać serwis oraz zapoznać się z  oferowanym produktem"
            checkStandard="false"
            checkPremium="true"
          />
          <PakietDesSingle
            title="Przeglądanie serwisu"
            des="Możesz przeglądać serwis oraz zapoznać się z  oferowanym produktem"
            checkStandard="false"
            checkPremium="true"
          />
          <PakietDesSingle
            title="Przeglądanie serwisu"
            des="Możesz przeglądać serwis oraz zapoznać się z  oferowanym produktem"
            checkStandard="false"
            checkPremium="true"
          />
        </div>
      </div>
      <div class="pb-[125px]">
        <p class="title-h1 pt-20">
          A teraz...<br />
          wybierz <span class="primary-color"> swój</span> pakiet
        </p>
        <div class="w-full rounded-2xl bg-white p-[24px] mt-[46px] border ">
          <div class="flex items-end justify-between">
            <div class="flex flex-col">
              <p class="text-[16px]">Pakiet tygodniowy</p>
              <p class="text-[32px] font-medium">{{ plansObject[0].price }} zł</p>
            </div>
            <button class="button-primary" @click="payToPlan(plansObject[0].id)">
              Zapłac
            </button>
          </div>
        </div>
        <!-- {{ plansObject }} -->
        <div class="w-full border rounded-2xl bg-white p-[24px] mt-[28px]">
          <div class="flex items-end justify-between">
            <div class="flex flex-col">
              <p class="text-[16px]">Pakiet miesięczny</p>
              <p class="text-[32px] font-medium">{{ plansObject[1].price }} zł</p>
              <p class="text-[13px] text-gray-500 -mt-1">Oszczedzasz 16 zł</p>
            </div>
            <button class="button-primary" @click="payToPlan(plansObject[1].id)">
              Zapłac
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import "swiper/css";
import { storeToRefs } from "pinia";
import { useUser } from "@/store/useUser";
const { plans, redirect, hasPremium } = storeToRefs(useUser());
await useUser().getPlans();
await useUser().getUserPremium();
let premium = hasPremium.value;
const plansObject = plans.value as any;

const payToPlan = async (planId: number) => {
  await useUser().postBuyPlan(planId);
  window.open(redirect.value);
};

// // const { currentUser, hasPremium } = storeToRefs(useUser());
// await useUser().getUser();
// let user = currentUser.value;
</script>
<style scoped lang="scss">
@import "@/assets/style/variables";
.radius-own {
  border-radius: 0px 0px 8px 8px;
}

.swiper-slide {
  background: transparent;
  height: 220px;
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-pagination {
  position: absolute;
  top: 10px;
  right: 10px;
  width: auto !important;
  left: auto !important;
  margin: 0;
}
.swiper-pagination-bullet,
swiper-pagination-bullet-active {
  padding: 5px 10px !important;
  border-radius: 0;
  width: auto;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 12px;
  color: #000;
  opacity: 1;
  background: rgba(0, 0, 0, 0.2);
}
.swiper-pagination-bullet-active {
  color: #fff;
  background: #007aff;
}

.swiper-pagination-bullet-active {
  background-color: #000 !important;
}
</style>
