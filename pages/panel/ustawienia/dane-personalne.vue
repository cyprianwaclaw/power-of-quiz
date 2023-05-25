<template>
  <div v-if="isOpen">
    <ModalDown :title="titleImage()" @close="isModal()">
      <template #content>
        <LazyModalContentCropAvatar @close="isModal()" />
      </template>
    </ModalDown>
  </div>
  <NuxtLayout name="edit-settings">
    <div class="grid place-items-center">
      <div v-if="user.avatar_path" class="relative">
        <img :src="user.avatar_path" class="avatar" />
        <div @click="isModal()">
          <div
            class="bg-gray-500 w-8 h-8 border-none rounded-full absolute bottom-2 right-0"
          >
            <Icon name="ph:camera" color="white" size="20" class="camera" />
          </div>
        </div>
      </div>
      <div class="relative" v-else>
        <Icon
          name="carbon:user-avatar-filled"
          color="#BFCBEE"
          class="w-36 h-36 relative"
        />
        <div @click="isModal()">
          <div
            class="bg-gray-500 w-8 h-8 border-none rounded-full absolute bottom-4 right-3"
          >
            <Icon name="ph:camera" color="white" size="20" class="camera" />
          </div>
        </div>
      </div>
    </div>
    <div class="grid place-items-center mb-12 mt-3">
      <div v-if="user.name">
        <!-- gdy nie ma nazwiska ? -->
        <h2 class="font-medium text-xl">{{ user.name }} {{ user.surname }}</h2>
      </div>
      <div v-else>
        <h2 class="font-medium text-xl">Imię Nazwisko</h2>
      </div>
      <div v-if="user.email">
        <h2 class="text-gray fontmedium text-sm mt-1">{{ user.email }}</h2>
      </div>
      <div v-else>
        <h2 class="text-gary text-sm font-thin mt-0.5">twój@email.pl</h2>
      </div>
    </div>
    <div class="white-retangle">
      <div class="row-table-start -mt-3 flex justify-between">
        <div class="flex gap-3">
          <p class="text-des-mobile">Imię</p>
          <div v-if="user.name">
            <h2 class="title-menu-mobile">{{ user.name }}</h2>
          </div>
          <div v-else>
            <h2 class="text-gary text-sm font-thin mt-0.5 primary-color">
              wprowadź imię
            </h2>
          </div>
        </div>
      </div>
      <div class="row-table-start flex justify-between">
        <div class="flex gap-3">
          <p class="text-des-mobile">Nazwisko</p>
          <div v-if="user.surname">
            <h2 class="title-menu-mobile">{{ user.surname }}</h2>
          </div>
          <div v-else>
            <h2 class="text-gary text-sm font-thin mt-0.5 primary-color">
              wprowadź nazwisko
            </h2>
          </div>
        </div>
      </div>
      <div class="row-table-start flex justify-between">
        <div class="flex gap-3">
          <p class="text-des-mobile">E-mail</p>
          <div v-if="user.email">
            <h2 class="title-menu-mobile">{{ user.email }}</h2>
          </div>
          <div v-else>
            <h2 class="text-gary text-sm font-thin mt-0.5 primary-color">
              wprowadź email
            </h2>
          </div>
        </div>
      </div>
      <div class="row-table-end flex justify-between">
        <div class="flex gap-3">
          <p class="text-des-mobile">Telefon</p>
          <!-- START gdy nie ma danych  -->
          <div v-if="user.phone">
            <h2 class="title-menu-mobile">{{ user.phone }}</h2>
          </div>
          <div v-else>
            <h2 class="text-gary text-sm font-thin mt-0.5 primary-color">
              wprowadź numer
            </h2>
          </div>
          <!-- FINISH gdy nie ma danych  -->
        </div>
      </div>
    </div>
    <div class="flex justify-end mt-4">
      <NuxtLink to="/panel/ustawienia/edycja/dane-personalne">
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

let isOpen = ref(false);
const isModal = () => {
  isOpen.value = !isOpen.value;
};

const userStore = useUser();
const { currentUser } = storeToRefs(userStore);
await userStore.getUser();
let user = currentUser.value;

const titleImage = () => {
  let results: string = "";
  if (user.avatar_path) {
    results = "Edytuj zdjęcie";
  } else {
    results = "Dodaj zdjęcie";
  }
  return results;
};
</script>

<style scoped lang="scss">
@import "@/assets/style/_variables.scss";
.avatar {
  border: 1px solid $border;
  border-radius: 2000px;
  height: 130px;
}
.camera {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
