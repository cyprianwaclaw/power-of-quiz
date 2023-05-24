<template>
  <NuxtLayout name="panel">
    <!-- gdy nie ma jeszcze danych z api  -->
    <h1 class="title-h1">Ustawienia</h1>
    <div class="bg-white w-full border-tansparent pt-5 rounded-2xl mt-8">
      <div class="row-table-start">
        <NuxtLink to="/panel/ustawienia/dane-personalne">
          <div class="columns-2 flex -ml-1 mb-1 -mt-2 place-items-center justify-between">
            <div class="flex place-items-center gap-4">
              <div class="grid place-items-center">
                  <img :src="user.avatar_path" class="avatar" v-if="user.avatar_path"/>
                  <Icon name="carbon:user-avatar-filled" class="" color="#BFCBEE" size="55" v-else />
              </div>
              <div>
                <div v-if="personal.surname">
                  <h2 class="text-name">{{ personal.name }} {{ personal.surname }}</h2>
                </div>
                <div v-else>
                  <h2 class="text-name">{{ personal.name }}</h2>
                </div>
                <p class="text-email text-gray">{{ personal.email }}</p>
              </div>
            </div>
            <div>
              <Icon name="ph:caret-right-light" size="20" class="text-gray" />
            </div>
          </div>
        </NuxtLink>
      </div>
      <PakietHero

      />
    </div>
    <div class="mt-14">
      <h2 class="title-h2">Dane do faktury</h2>
      <p class="mb-8 text-sm font-medium primary-color mr-6 mt-2 line">
        Uzupełnij w przypadku chęci otrzymania faktury za zakupione pakiety
      </p>
      <div class="white-retangle">
          <div class="row-table-start -mt-4 flex place-items-center justify-between">
            <div class="">
              <p class="text-des-mobile">Nazwa działalności</p>
              <div v-if="company.name">
                <h2 class="title-menu-mobile">{{ company.name }}</h2>
              </div>
              <div v-else>
                <h2 class="text-gary text-sm font-thin primary-color">
                  wprowadź nazwę działalności
                </h2>
              </div>
            </div>
          </div>
          <div class="row-table-start flex place-items-center justify-between">
            <div class="">
              <p class="text-des-mobile">NIP</p>
              <div v-if="company.nip">
                <h2 class="title-menu-mobile">{{ company.nip }}</h2>
              </div>
              <div v-else>
                <h2 class="text-gary text-sm font-thin primary-color">
                  wprowadź numer nip
                </h2>
              </div>
            </div>
          </div>
        <NuxtLink to="/panel/ustawienia/dane-faktura">
          <div class="row-table-end flex place-items-center justify-between">
            <div class="flex place-items-center">
              <h2 class="title-menu-mobile">Zobacz pełne dane</h2>
            </div>
            <Icon name="ph:caret-right-light" size="20" class="text-gray" />
          </div>
        </NuxtLink>
      </div>
    </div>
    <div class="mt-14">
      <h2 class="title-h2 mb-7">Wypłata środków</h2>
      <div class="white-retangle">
          <div class="row-table-start -mt-4 flex place-items-center justify-between">
            <div class="">
              <p class="text-des-mobile">Numer IBAN</p>
              <!-- gdy nie ma numeru iban -->
              <div v-if="financial.iban">
                <h2 class="text-sm font-semibold">{{ financial.iban }}</h2>
              </div>
              <div v-else>
                <h2 class="text-gary text-sm font-thin primary-color">
                  wprowadź numer IBAN
                </h2>
              </div>
            </div>
          </div>
          <div class="row-table-start flex place-items-center justify-between">
            <div class="">
              <p class="text-des-mobile">Nazwa banku</p>
              <div v-if="financial.bank_name">
                <h2 class="title-menu-mobile">{{ financial.bank_name }}</h2>
              </div>
              <div v-else>
                <h2 class="text-gary text-sm font-thin primary-color">
                  wprowadź nazwę banku
                </h2>
              </div>
            </div>
          </div>
          <div class="row-table-start flex place-items-center justify-between">
            <div class="">
              <p class="text-des-mobile">Kod SWIFT</p>
              <div v-if="financial.swift">
                <h2 class="title-menu-mobile">{{ financial.swift }}</h2>
              </div>
              <div v-else>
                <h2 class="text-gary text-sm font-thin primary-color">
                  wprowadź kod swift
                </h2>
              </div>
            </div>
          </div>
          <NuxtLink to="/panel/ustawienia/edycja/wyplata">
            <div class="row-table-end flex place-items-center justify-between">
              <div class="flex place-items-center">
                <h2 class="title-menu-mobile">Edytuj dane</h2>
              </div>
              <Icon name="ph:caret-right-light" size="20" class="text-gray" />
            </div>
          </NuxtLink>
      </div>
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
import { storeToRefs } from "pinia"
import { useUser } from "@/store/useUser"

definePageMeta({
  middleware: "auth",
});

const userStore = useUser();
const { currentUser, getPersonal, getFinancial, getCompany } = storeToRefs(userStore)

await userStore.getSettingsUser();

let personal = getPersonal.value
let financial = getFinancial.value
let company = getCompany.value
let user = currentUser.value

</script>
<style lang="scss" scoped>
@import '@/assets/style/_variables.scss';

.image-hero {
  width: 55px;
  height: 55px;
  border: 1px solid #ededed;
  border-radius: 9999px;
}
.text-email {
  font-size: 14px;
  font-weight: 400;
  margin-top: -1px;
}
.text-name {
  font-size: 18px;
  font-weight: 500;
}
.one {
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.02em;
  border-right: 1px solid #618cfb;
  margin-right: 11px;
  padding-right: 11px;
}
.two {
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.02em;
}
.line {
  line-height: 24px;
  margin-top: 10px;
}
.avatar {
  border: 1px solid $border;
  border-radius: 2000px;
  height: 54px;
  }
</style>
