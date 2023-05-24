<template>
    <div >
<div v-if="modal" v-on-click-outside="closeModal" class="absolute bg-white top-20 right-12 w-[200px] h-44">
</div>
        <button class="click flex hero-button px-5 py-2" @click="openModal">
            <div v-if="user.avatar_path"></div>
            <div v-else class="mr-3">
                <Icon name="carbon:user-avatar-filled" color="#BFCBEE" class="w-10 h-10" />
            </div>
            <div class="flex flex-col">
                <p class="text-[14px]">{{ user.name }} {{ user?.surname }}</p>
                <div v-if="premium" class="flex">
                    <p class="text-[12px] primary-color font-semibold">PREMIUM</p>
                </div>
                <div v-else>
                    <p class="text-[12px] text-gray">Standard</p>
                </div>
            </div>
        </button>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUser } from "@/store/useUser";
import { vOnClickOutside } from '@vueuse/components'


const modal = ref(false)
function closeModal() {
  modal.value = false
}

const { currentUser, hasPremium } = storeToRefs(useUser());
await useUser().getUser();
await useUser().getUserPremium();
let user = currentUser.value;
let premium = hasPremium.value;
const open = ref(false)
function openModal (){
    modal.value = true
}
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.hero-button{
    border-radius: 24px;
    transition:0.5s 0.01s;
}
.hero-button:active{
    background-color: rgba(97, 140, 251, 0.06);
    transition:0.1s;
}
</style>
