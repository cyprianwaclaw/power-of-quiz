<template>
  <div class="mb-[25px]">
    <div class="retangle">
      <div v-if="!allPayouts">
        <p>brak wypłat</p>
      </div>
      <div
        v-else
        v-for="(single, index) in allPayouts"
        :key="index"
        :class="{ notBorder: index == allPayouts.length - 1 ? true : false }"
        class="px-[28px] py-[18px] grid grid-cols-2 justify-between border-own"
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
    <Pagination v-if="payouts.last_page" :last_page="payouts.last_page" />
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUser } from "@/store/useUser";

const user = useUser();
const { currentUser, payouts } = storeToRefs(user);
await user.getUser();
const userId = currentUser.value.id;
const router = useRouter();
const allPayouts = ref(null) as any;

onMounted(async () => {
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
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
.retangle {
  background-color: $white;
  border-radius: 24px;
}
.border-own {
  border-bottom: 1px solid $border;
}
.notBorder {
  border-bottom: transparent;
}
.date-text {
  font-size: 14px;
  font-weight: 300;
  color: $text-gray;
  margin-bottom: -2px;
}
</style>
