<template>
  <NuxtLayout name="my-account">
    <div class="pb-[-30px]">

      <h1 class="title-h1 mb-5">Faktury i płatności</h1>
      <button
      class="filter_button_disactive"
      :class="{ filter_button_active: balance }"
      @click="allButton"
    >
      Nadchodzące płatności
    </button>
    <button
      class="filter_button_disactive"
      :class="{ filter_button_active: history }"
      @click="acceptButton"
    >
      Faktury
    </button>
    <div class="mt-11" v-if="balance">
      <UserFuturePayments />
    </div>
    <div class="mt-11" v-if="history">
      <UserInvoices />
    </div>
  </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const balance = ref(true);
const history = ref();

const acceptButton = () => {
  balance.value = false;
  history.value = true;
}

const allButton = () => {
  balance.value = true;
  history.value = false;
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.invite-text {
  font-style: normal;
  font-weight: 800;
  font-size: 38px;
  color: #cfd8e0;
}
</style>
