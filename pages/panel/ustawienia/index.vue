<template>
  <NuxtLayout name="panel">
    <h1 class="title-h1">Ustawienia</h1>
    <div class="bg-white w-full border-tansparent pt-5 rounded-2xl mt-8">
      <div class="row-table-start">
        <NuxtLink to="/panel/ustawienia/dane-personalne">
          <div class="columns-2 flex -ml-1 mb-1 -mt-2 place-items-center justify-between">
            <div class="flex place-items-center gap-4">
              <div class="grid place-items-center">
                <img :src="user?.avatar_path" class="avatar" v-if="user?.avatar_path" />
                <Icon
                  name="carbon:user-avatar-filled"
                  class=""
                  color="#BFCBEE"
                  size="55"
                  v-else
                />
              </div>
              <div>
                <div v-if="personal.surname">
                  <h2 class="text-name">{{ personal?.name }} {{ personal?.surname }}</h2>
                </div>
                <div v-else>
                  <h2 class="text-name">{{ personal?.name }}</h2>
                </div>
                <p class="text-email text-gray">{{ personal?.email }}</p>
              </div>
            </div>
            <div>
              <Icon name="ph:caret-right-light" size="20" class="text-gray" />
            </div>
          </div>
        </NuxtLink>
      </div>
      <PakietHero />
    </div>
    <div class="mt-14">
      <h2 class="title-h2">Dane do faktury</h2>
      <p class="mb-8 text-sm font-medium primary-color mr-6 mt-2 line">
        Uzupełnij w przypadku chęci otrzymania faktury za zakupione pakiety
      </p>
      <WhiteRetangleContainer :array="[...mappedData.company]" />
    </div>
    <div class="mt-14">
      <h2 class="title-h2 mb-7">Wypłata środków</h2>
      <WhiteRetangleContainer :array="[...mappedData.financial]" />
    </div>
    <div class="flex justify-end mt-14 pb-20">
      <p class="one primary-color">
        <NuxtLink to="/panel/ustawienia"> Regulamin </NuxtLink>
      </p>
      <p class="two primary-color">
        <NuxtLink to="/panel/ustawienia"> Polityka prywatności </NuxtLink>
      </p>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUser } from "@/store/useUser";

definePageMeta({
  middleware: "auth",
});

const userStore = useUser();
const { settings } = storeToRefs(userStore);
await userStore.getSettingsUser();

let personal = settings.value?.personal;

// Funkcja do mapowania i dodawania nowych wartości
const mapAndAddValues = (data: any) => {
  return {
    company: [
      {
        text1: data?.company?.name, // Zmiana klucza "0" na "text1"
        des: "Nazwa działalności",
        noText: "Brak",
        istextNo: true,
      },
      {
        text1: data?.company?.nip,
        des: "NIP",
        noText: "Brak",
        istextNo: true,
      },
      { text: "Zobacz więcej", link: "/panel/ustawienia/edycja/dane-faktura" },
    ],
    financial: [
      {
        text1: data?.financial?.iban,
        des: "Numer IBAN",
        noText: "Brak",
        istextNo: true,
      },
      {
        text1: data?.financial?.bank_name,
        des: "Nazwa banku",
        noText: "Brak",
        istextNo: true,
      },
      {
        text1: data?.financial?.swift,
        des: "Numer SWIFT",
        noText: "Brak",
        istextNo: true,
      },
      { text: "Edytuj dane", link: "/panel/ustawienia/edycja/wyplata" },
    ],
  };
};
const mappedData = mapAndAddValues(settings.value);
</script>
<style lang="scss" scoped>
@import "@/assets/style/_variables.scss";

.avatar {
  border: 1px solid $border;
  border-radius: 2000px;
  height: 54px;
}
</style>
