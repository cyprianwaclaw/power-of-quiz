<template>
    <div class="bg-white py-5 px-8 rounded-3xl relative">
          <h3 class="font-medium text-2xl mb-2.5 mt-1 tracking-wide">Zaproś znajomych</h3>
      <p class="text">{{ props.text }}</p>
      <div class="flex columns-2 mt-4 mb-2 place-items-center gap-1 cursor-pointer" @click="copyToken">
        <Icon name="ic:round-content-copy" size="20" class="primary-color" />
        <p class="primary-color font-semibold">Skopiuj kod polecający</p>
        <div class="tooltip" v-if="tooltip">
          <span ref="tooltip" class="tooltiptext family">
            Skopiowano kod polecający
          </span>
        </div>
      </div>
    </div>
  </template>
  <script setup lang="ts">
  import { useUser } from "@/store/useUser";
import { storeToRefs } from "pinia";
const userStore = useUser();
  
  const props = defineProps({
    text: {
      type: String,
      required: false,
    },
  });
  const {invitationToken} = storeToRefs(userStore);

const tooltip = ref<boolean>();

await userStore.getInvitationToken();

function copyToken(token: any) {
  var token: any = invitationToken.value;
  navigator.clipboard.writeText(token);
  tooltip.value = !tooltip.value;
  setTimeout(() => (tooltip.value = false), 700);
}
  </script>
<style scoped lang="scss">
@import "@/assets/style/variables.scss";
.text {
    font-size: 15px;
    font-family: "Manrope", sans-serif;
    color: #212427;
    font-weight: 400;
    line-height: 25px;
    letter-spacing: 0.02em;
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
    margin: 21px;
    bottom: 10%;
    left: 50%;
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