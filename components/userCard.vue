<template>
  <div>
    <div v-if="isOpen" class="dark-blur-background z-40"></div>
    <button class="click flex place-items-center hero-button" @click="openMenu()">
      <div v-if="user.avatar_path">
        <img :src="user.avatar_path" class="w-[37px] border-[#EDEDED] rounded-full" />
      </div>
      <div v-else>
        <Icon name="carbon:user-avatar-filled" color="#BFCBEE" class="w-10 h-10" />
      </div>
      <!-- {{ premium }} -->
      <div class="xl:flex xl:flex-col hidden ml-2">
        <p class="text-[14px]">{{ user.name }} {{ user?.surname }}</p>
        <div v-if="premium.has_premium" class="flex">
          <p class="text-[12px] primary-color font-semibold">PREMIUM</p>
        </div>
        <div v-else class="flex">
          <p class="text-[12px] text-gray">Standard</p>
        </div>
      </div>
    </button>
    <div
      v-if="isOpen"
      v-on-click-outside="openMenu"
      class="absolute bg-white top-20 right-12 w-[200px] z-50"
    >
    <div class="flex flex-col gap-5">
      <div v-for="(page, index) in links" :key="index">
        <NuxtLink :to="page.link">
          <p
            class="text-[#464646] font-semibold whitespace-nowrap hover:text-black"
          >
          {{ page.name }}
          </p>
        </NuxtLink>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUser } from "@/store/useUser";
import { vOnClickOutside } from "@vueuse/components";

const route = useRouter()
const isOpen = ref(false);
const openMenu = () => {

  if (window.screen.width <= 1024) {
    isOpen.value = !isOpen.value;
  } else {
    route.push('/panel/konto')
  }

};

const links = [
  { name: "Zaproś znajomych", link: "/panel/zaproszeni" },
  { name: "Twoje konto", link: "/panel/konto" },
  { name: "Moje quizy", link: "/panel/quiz/dodaj-nowy" },
  { name: "Ustawienia", link: "/panel/quiz/dodaj-nowy" },
  { name: "Dodaj nowy quiz", link: "/panel/quiz/dodaj-nowy" },
];

const { currentUser, hasPremium } = storeToRefs(useUser());
await useUser().getUser();
await useUser().getUserPremium();
let user = currentUser.value;
let premium = hasPremium.value;
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.hero-button {
  border-radius: 24px;
  transition: 0.5s 0.01s;
}
.hero-button:active {
  background-color: rgba(97, 140, 251, 0.06);
  transition: 0.1s;
}
</style>
