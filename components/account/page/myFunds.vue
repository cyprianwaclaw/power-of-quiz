<template>
  <ModalAlert
    :modalActive="isSuccess"
    title="Zapisano"
    status="success"
    :des="`Zlecono wypłatę na kwotę ${pointToPaycheck} zł, środki niedługo pojawią się na Twoim koncie`"
    closeButton="Gotowe"
    @close="successShow()"
  />
  <ModalAlert
    :modalActive="isOpenPayouts"
    title="Wypłata środków"
    @close="isClosePayouts()"
  >
    <template #content>
      <div>
        <input
          placeholder="Kwota do wypłaty"
          type="number"
          v-model="threeDigitNumber"
          @input="limitNumberLength"
          inputmode="numeric"
          class="mb-6 mt-7"
        />
        <button
          class="button-primary w-full"
          v-if="threeDigitNumber"
          @click="newPayout()"
        >
          Zleć wypłatę
        </button>
        <button class="button-primary-disabled w-full" v-else disabled>
          Zleć wypłatę
        </button>
      </div>
    </template>
  </ModalAlert>
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
        <button class="button-primary" @click="isClosePayouts()">
          Zleć wypłatę <Icon name="carbon:chevron-right" class="-mr-2" size="24" />
        </button>
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
        v-for="(single, index) in allPayouts"
        :key="index"
        :class="{
          bgGray: index % 2 === 0,
        }"
        class="px-[24px] py-[21px] place-items-center flex justify-between border-own bordeer-transparent rounded-[12px]"
      >
        <div class="flex place-items-center w-[280px] justify-between">
          <p class="text-[15px] font-semibold">{{ single.amount }}</p>
        <p class="text-[15px]">{{ single.date }}</p>
        </div>
        <p :class="single.statusClass">{{ single.statusName }}</p>
      </div>
      <div class="flex justify-end">
        <Pagination v-if="payouts.last_page" :last_page="payouts.last_page" />
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
const isSuccess = ref(false);
const successShow = () => {
  isSuccess.value = !isSuccess.value;
};
const isOpenPayouts = ref(false);
const isClosePayouts = () => {
  isOpenPayouts.value = !isOpenPayouts.value;
};
const user = useUser();
await user.getUser();
const { currentUser, payouts } = storeToRefs(user);
const point = ref();
const pointToPaycheck = ref(null);
const userId = currentUser.value.id;

const router = useRouter();
const allPayouts = ref(null) as any;

onMounted(async () => {
  point.value = currentUser.value.points;
  let page = (router.currentRoute.value.query.page
    ? router.currentRoute.value.query.page
    : 1) as number;
  await user.getPayoutsObject(userId, page);
  allPayouts.value = test(payouts.value.data);
});

onBeforeRouteUpdate(async (to, from) => {
  let page = Number(to.query.page ? to.query.page : 1);
  await user.getPayoutsObject(userId, page);
  allPayouts.value = test(payouts.value.data);
});

const newPayout = async () => {
  pointToPaycheck.value = threeDigitNumber.value;
  await user.newPayouts(threeDigitNumber.value);
  await user.getUser();
  point.value = currentUser.value.points;
  threeDigitNumber.value = null;
  isClosePayouts();
   let page = (router.currentRoute.value.query.page
    ? router.currentRoute.value.query.page
    : 1) as number;
  await user.getPayoutsObject(userId, page);
  allPayouts.value = test(payouts.value.data);
  setTimeout(() => {
    successShow();
  }, 30);
};
const threeDigitNumber = ref(null) as any;

const limitNumberLength = () => {
  if (threeDigitNumber.value !== null) {
    threeDigitNumber.value = Math.min(point.value, Math.max(1, threeDigitNumber.value));
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

.invite-text {
  font-style: normal;
  font-weight: 800;
  font-size: 38px;
  color: #cfd8e0;
}
.empty {
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

.date-text {
  font-size: 14px;
  font-weight: 300;
  color: $text-gray;
  margin-bottom: -2px;
}
.bgGray {
  background-color: rgb(231, 231, 231);
}
</style>
