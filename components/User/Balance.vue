<template>
  <ModalAlert
    :modalActive="isSuccess"
    title="Zapisano"
    status="success"
    :des="`Zlecono wypłatę ${pointToPaycheck} zł, środki niedługo pojawią się na Twoim koncie`"
    closeButton="Gotowe"
    @close="successShow()"
  />
  <ModalDown :modalActive="isOpen" title="Jak zdobyć punkty" @close="isClose">
    <template #content>
      <ModalContentHowToGetPoints />
    </template>
  </ModalDown>
  <ModalDown
    :modalActive="isOpenPayouts"
    title="Wypłata środków"
    @close="isClosePayouts()"
  >
    <template #content>
      <div class="my-14">
        <input
          type="number"
          placeholder="Kwota do wypłaty"
          v-model="threeDigitNumber"
          @input="limitNumberLength"
          inputmode="numeric"
          class="mb-4"
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
  </ModalDown>
  <div>
    <div class="retangle mb-[35px]">
      <div class="pt-2 border-b border-gray-200">
        <div class="padding-retangle">
          <h3 class="punkty">{{ point }} zł</h3>
          <p class="saldo-test mb-1 mt-[8px]">Twoje aktualne saldo</p>
          <button @click="isClose()">
            <p class="primary-color font-semibold w-[230px] ml-[-6px] pl-[6px] mt-[6px]">
              Jak zdobyć więcej punktów ?
            </p>
          </button>
        </div>
      </div>
      <div class="padding-retangle flex w-full justify-end">
        <button class="button-primary-disabled" v-if="point == 0">
          Zleć wypłatę <Icon name="carbon:chevron-right" class="-mr-2" size="24" />
        </button>
        <!-- <NuxtLink to="/wypłata" v-else> -->
        <button class="button-primary"  v-else @click="isClosePayouts()">
          Zleć wypłatę <Icon name="carbon:chevron-right" class="-mr-2" size="24" />
        </button>
        <!-- </NuxtLink> -->
      </div>
      <div class="bg-purple-own">
        <p class="leading-6">
          Aby móc wypłacić zgromadzone środki, najpierw musisz uzupełnić dane do przelewu
          w
          <NuxtLink to="/panel/ustawienia/edycja/wyplata"
            ><span class="navigate">ustawieniach</span></NuxtLink
          >
        </p>
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
const isOpenPayouts = ref(false);

const isClosePayouts = () => {
  isOpenPayouts.value = !isOpenPayouts.value;
};
const isSuccess = ref(false);
const successShow = () => {
  isSuccess.value = !isSuccess.value;
};
const user = useUser();
await user.getUser();
const { currentUser } = storeToRefs(user);
const point = ref();
const pointToPaycheck = ref(null);
// const point = currentUser.value.points;

const newPayout = async () => {
  pointToPaycheck.value = threeDigitNumber.value
  await user.newPayouts(threeDigitNumber.value);
  await user.getUser();
  point.value = currentUser.value.points;
  threeDigitNumber.value = null;
  isClosePayouts();
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

onMounted(() => {
  point.value = currentUser.value.points;
});
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
.retangle {
  background-color: $white;
  border-radius: 24px;
  height: 385px;
}
.padding-retangle {
  padding: 30px;
}
.saldo-test {
  font-weight: 400;
  font-size: 18px;
  color: #bebebe;
}

.punkty {
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
}
.border1 {
  border-bottom: 1px solid #ededed;
}
.bg-purple-own {
  background: #e9ebfd;
  border-radius: 0px 0px 24px 24px;
  padding: 30px;
}
</style>
