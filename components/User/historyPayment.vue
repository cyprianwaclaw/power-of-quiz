<template>
  <div>
    <div class="retangle mb-[35px]">
        <div v-if="!payouts">
<p>brak wypłat</p>
        </div>
      <div
      v-else
        v-for="(single, index) in ownPayouts"
        :key="index"
        :class="{ notBorder: index == ownPayouts.length - 1 ? true : false }"
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
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUser } from "@/store/useUser";

const user = useUser();
const { currentUser, payouts } = storeToRefs(user);
await user.getUser();
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
