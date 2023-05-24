<template>
  <NuxtLayout name="edit-settings">
    <div class="mb-7 mt-3">
      <h1 class="title-h1">Dane do faktury</h1>
    </div>
    <div class="white-retangle">
      <div class="row-table-start -mt-4">
        <p class="text-des-mobile">Nazwa działalności</p>
          <div v-if="company.name">
            <h2 class="title-menu-mobile -mb-1 mt-0.5">{{ company.name }}</h2>
          </div>
          <div v-else>
            <h2 class="text-gary text-sm font-thin primary-color">
              wprowadź nazwę działalności
            </h2>
          </div>
        <!-- Gdy nazwa jest zbyt długa co robimy? Może przenikamy do białego -->
      </div>
      <div class="row-table-start flex place-items-center gap-3">
        <p class="text-des-mobile">Numer NIP</p>
        <div v-if="company.nip">
          <h2 class="title-menu-mobile">{{ company.nip }}</h2>
        </div>
        <div v-else>
          <h2 class="text-gary text-sm font-thin primary-color">wprowadź numer nip</h2>
        </div>
      </div>
      <div class="row-table-end flex place-items-center gap-3">
        <p class="text-des-mobile">Numer REGON</p>
        <div v-if="company.regon">
          <h2 class="title-menu-mobile">{{ company.regon }}</h2>
        </div>
        <div v-else>
          <h2 class="text-gary text-sm font-thin primary-color">wprowadź numer REGON</h2>
        </div>
      </div>
    </div>
    <div class="mb-7 mt-14">
      <h1 class="title-h2">Siedziba działalności</h1>
    </div>
    <div class="white-retangle">
      <div class="row-table-start -mt-3 flex justify-between">
        <div class="flex gap-3">
          <p class="text-des-mobile">Kod</p>
          <div v-if="companyAddress.postcode">
            <h2 class="title-menu-mobile">{{ companyAddress.postcode }}</h2>
          </div>
          <div v-else>
            <h2 class="text-gary text-sm font-thin mt-0.5 primary-color">
              wprowadź kod miasta
            </h2>
          </div>
        </div>
      </div>
      <div class="row-table-start flex justify-between">
        <div class="flex gap-3">
          <p class="text-des-mobile">Miejscowość</p>
          <div v-if="companyAddress.city">
            <h2 class="title-menu-mobile">{{ companyAddress.city }}</h2>
          </div>
          <div v-else>
            <h2 class="text-gary text-sm font-thin mt-0.5 primary-color">
              wprowadź miejscowość
            </h2>
          </div>
        </div>
      </div>
      <div class="row-table-start flex justify-between">
        <div class="flex gap-3">
          <p class="text-des-mobile">Ulica</p>
          <div v-if="companyAddress.street">
            <h2 class="title-menu-mobile">{{ companyAddress.street }}</h2>
          </div>
          <div v-else>
            <h2 class="text-gary text-sm font-thin mt-0.5 primary-color">
              wprowadź nazwę ulicy
            </h2>
          </div>
        </div>
      </div>
      <div class="row-table-start flex justify-between">
        <div class="flex gap-3">
          <p class="text-des-mobile">Mieszkanie</p>
          <div v-if="companyAddress.building_number">
            <h2 class="title-menu-mobile">{{ companyAddress.building_number }}</h2>
          </div>
          <div v-else>
            <h2 class="text-gary text-sm font-thin mt-0.5 primary-color">
              wprowadź nazwę mieszkania
            </h2>
          </div>
        </div>
      </div>
      <div class="row-table-end flex justify-between">
        <div class="flex gap-3">
          <p class="text-des-mobile">Lokal</p>
          <div v-if="companyAddress.house_number">
            <h2 class="title-menu-mobile">{{ companyAddress.house_number }}</h2>
          </div>
          <div v-else>
            <h2 class="text-gary text-sm font-thin mt-0.5 primary-color">brak</h2>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-end mt-5">
      <NuxtLink to="/panel/ustawienia/edycja/dane-faktura">
        <p class="primary-color text-sm font-medium">Edytuj</p>
      </NuxtLink>
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
const { getCompany } = storeToRefs(userStore);
await userStore.getSettingsUser();
let company = getCompany.value;
let companyAddress = company.address;
</script>

<style scoped></style>
