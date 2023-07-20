<template>
  <NuxtLayout name="panel">
    <h1 class="title-h1 pb-6">Twoje konto</h1>
    <div class="md:hidden flex flex-col">
      <div class="columns-2 flex gap-5">
        <NuxtLink to="/panel/konto/dodane-quizy"  class="retangle gold">
          <Icon name="ph:game-controller-fill" color="D19D38" size="34" />
          <p class="retangle-title family">Quizy</p>
      </NuxtLink>
        <NuxtLink to="/panel/konto/srodki" class="retangle blue">
          <Icon name="ph:wallet-fill" color="2B3BC7" size="34" />
          <p class="retangle-title family">Środki</p>
        </NuxtLink>
    </div>
    <NuxtLink to="/panel/konto/platnosci" class="retangle green flex flex-col" >
        <Icon name="ph:newspaper-fill" color="38D1AC" size="34" />
        <p class="retangle-title family mb-1">Faktury i płatności</p>
      </NuxtLink>
    <PakietHero 
    text="true"
    class="my-10"/>
    <userStatistics />
    <div class="white-retangle mt-12">
      <NuxtLink to="/panel/ustawienia">
        <div class="row-table-start -mt-4 flex place-items-center justify-between">
          <div class="flex place-items-center">
            <Icon name="ph:gear-light" size="26" class="primary-color" />
            <h2 class="title-menu-mobile ml-2">Ustawienia</h2>
          </div>
          <Icon name="ph:caret-right-light" size="20" class="text-gray" />
        </div>
      </NuxtLink>
      <NuxtLink to="/panel/wiadomosc">
        <div class="row-table-end flex place-items-center justify-between">
          <div class="flex place-items-center -ml-[6px]">
            <Icon name="ph:paper-plane-right-light" size="26" class="primary-color" />
            <h2 class="title-menu-mobile ml-2">Napisz do nas</h2>
          </div>
          <Icon name="ph:caret-right-light" size="20" class="text-gray" />
        </div>
      </NuxtLink>
    </div>
    <div class="flex justify-end mt-14 pb-20">
      <div class="flex" @click="logoutUser()">
        <p class="one primary-color">Wyloguj się</p>
        <Icon
          name="material-symbols:logout-rounded"
          size="18"
          class="primary-color margin-top"
          />
        </div>
      </div>
    </div>
<AccountPage
/>
    </NuxtLayout>
  </template>

<script setup lang="ts">
import { useAuth } from "@/store/useAuth";

definePageMeta({
  middleware: "auth",
});


async function logoutUser() {
  const authStore = useAuth();
  await authStore.logout();
}
</script>
<style scoped lang="scss">
.retangle {
  padding: 16px 16px 16px 23px;
  margin-bottom: 20px;
  border-radius: 8px;
  width: 100%;
}

.retangle-title {
  font-size: 16px;
  font-weight: 500;
  margin-top: 6px;
}
.green {
  background: rgba(56, 209, 172, 0.17);
}
.gold {
  background: rgba(209, 157, 56, 0.17);
}
.blue {
  background: rgba(43, 59, 199, 0.17);
}

.one {
  font-weight: 600;
  font-size: 12px;
  line-height: 22px;
  letter-spacing: 0.02em;
}
.margin-top {
  margin-top: 3px;
  margin-left: 4px;
}

</style>
