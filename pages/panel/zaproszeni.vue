<template>
  <!-- <div v-if="isOpen"> -->
    <ModalDown
 :modalActive="isOpen"
    
    title="Zaproś znajomych"
    @close= "isClose" 
    >
    <template #content>
      <ModalContentInvitePeople
      
      />
    </template>
    </ModalDown>
  <!-- </div> -->
  <NuxtLayout name="panel">
    <div>
      <h1 class="title-h1">Zaproszone osoby</h1>
      <p class="text mt-3">
        Zaproś znajomych do wspólnej gry i zyskaj bonus za każdego poleconego, który
        wykupi pakiet PREMIUM
        <button @click="isClose()">
<Icon name="ph:info-bold" size="20" class="inline mb-1 ml-1.5" color="#618CFB" />
        </button>
      </p>
      <button class="button-primary mt-7 mb-1">
        <!-- Przejdź na PREMIUM <Icon name="carbon:chevron-right" class="-mr-2" size="24" /> -->
        <div class="tooltip" v-if="tooltip">
          <span ref="tooltip" class="tooltiptext family">
            Skopiowano kod polecający
          </span>
        </div>
        <div class="flex columns-2 place-items-center gap-1" @click="copyToken">
          <Icon name="ic:round-content-copy" size="20" class="white" />
          <p class="white">Skopiuj kod polecający</p>
        </div>
      </button>
    </div>
    <div v-if="!isUser">
      <!-- element na środku po x class="grid place-items-center"-->
      <div class="grid place-items-center mt-10">
        <Icon name="ph:users" size="166" color="#CFD8E0" />
        <p class="invite-text -mt-2 mb-5">Brak znajomych</p>
        <p class="font-base font-semibold primary-color place-items-center">
          Dlaczego warto polecać
          <Icon name="carbon:chevron-right" size="21" class="primary-color" />
        </p>
      </div>
    </div>
    <div v-else class="mt-3 grid grid-cols-2 -mx-3 pb-28">
      <SingleInvitedUser v-for="(user, index) in users" :key="index" class=""
      :user = user
      />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUser } from "@/store/useUser";

definePageMeta({
  middleware: "auth",
});
const isOpen = ref(false)
const isClose = ()=>{
    isOpen.value =! isOpen.value
}

const tooltip = ref<boolean>();
const userStore = useUser();
await userStore.getInvitationToken();
await userStore.getInvitedUser();

const { invitationToken, allUser, invitedUser } = storeToRefs(userStore);

let isUser = invitedUser.value;
let users = allUser.value;

function Modal() {}
function copyToken(token: any) {
  var token: any = invitationToken.value;
  navigator.clipboard.writeText(token);
  tooltip.value = !tooltip.value;
  setTimeout(() => (tooltip.value = false), 1700);
}
</script>
<style scoped>
.invite-text {
  font-style: normal;
  font-weight: 800;
  font-size: 38px;
  color: #cfd8e0;
}

.tooltip {
  position: absolute;
  display: inline-block;
}
.tooltip .tooltiptext {
  visibility: hidden;
  width: 165px;
  background-color: #433d3d;
  color: #fff;
  font-size: 14px;
  font-weight: 300;
  text-align: center;
  border-radius: 8px;
  padding-top: 8px;
  padding-bottom: 10px;
  position: absolute;
  z-index: 1;
  margin: 25px;
  bottom: 10%;
  right: -110px;
  margin-left: 18px;
  opacity: 0;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
  transition: opacity 0.4s;
}
.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 45%;
  margin-left: 0px;
  border-width: 6px;
  border-style: solid;
  border-color: #433d3d transparent transparent transparent;
}
.tooltip .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>
