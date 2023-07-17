<template>
    <div>
        <ModalDown
 :modalActive="isOpen"
        title="Czym są punkty ?"
        @close= "isClose" 
        >
        <template #content>
          <ModalContentPoints
          />
        </template>
        </ModalDown>
        <ModalAlert
        :modalActive="isOpenDesktop"
        title="Czym są punkty ?"
        closeButton="Zamknij"
        @close="isCloseDesktop()"
        >
      <template #content>
        <ModalContentPoints
        />
        </template>
      </ModalAlert>
    <div class="w-full">
        <h2 class="title-h2 mb-7 md:mt-3">Twoje statystyki</h2>
        <div class="white-retangle">
          <div class="row-table-start -mt-1">
            <h2 class="title">{{ current.points }}</h2>
            <div class="flex place-items-center gap-1.5">
              <p class="text-des-mobile">Ilość punktów</p>
              <button @click="isClose()" class="flex md:hidden">
                <Icon name="ph:info-bold" size="20" class="" color="#618CFB" @click="Modal" />
              </button>
              <button  class="hidden md:flex">
                <Icon name="ph:info-bold" size="20" class="" color="#618CFB" @click="isCloseDesktop()" />
              </button>
            </div>
          </div>
          <div class="row-table-start">
            <h2 class="title">{{ AddAnswer(correctAnswer, inCorrectAnswer) }}</h2>
            <p class="text-des-mobile">Liczba udzielonych odpowiedzi</p>
            <div class="flex columns-2 mt-5 mb-2">
              <div class="flex flex-col w-full">
                <p class="correct">{{ correctAnswer }}</p>
                <p class="correct">Poprawne</p>
              </div>
              <div class="flex flex-col w-full">
                <p class="bad">{{ inCorrectAnswer }}</p>
                <p class="bad">Błędne</p>
              </div>
            </div>
          </div>
          <div class="row-table-end md:mb-3">
            <h2 class="title">{{ users }}</h2>
            <p class="text-des-mobile">Liczba zaproszonych osób</p>
            <div class="flex columns-2 mt-4 mb-2 place-items-center gap-1 cursor-pointer md:hidden" @click="copyToken">
              <Icon name="ic:round-content-copy" size="20" class="primary-color" />
              <p class="primary-color font-semibold">Skopiuj kod polecający</p>
              <div class="tooltip" v-if="tooltip">
                <span ref="tooltip" class="tooltiptext family">
                  Skopiowano kod polecający
                </span>
              </div>
            </div>
          </div>
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
import { AddAnswer } from "@/utils/function";
import { storeToRefs } from "pinia";
import { useUser } from "@/store/useUser";

const isOpen = ref(false)
const isClose = ()=>{
    isOpen.value =! isOpen.value
}
const isOpenDesktop = ref(false)
const isCloseDesktop = ()=>{
    isOpenDesktop.value =! isOpenDesktop.value
}
const tooltip = ref<boolean>();
const userStore = useUser();
await userStore.getUser();
await userStore.getInvitationToken();
await userStore.getUserStats();
await userStore.getInvitedUser();

const {
  currentUser,
  invitationToken,
  correctAnswers,
  inCorrectAnswers,
  invitedCount,
} = storeToRefs(userStore);

let correctAnswer: number = correctAnswers.value;
let inCorrectAnswer: number = inCorrectAnswers.value;
let users: number = invitedCount.value;
let current = ref(currentUser.value)


function copyToken(token: any) {
  var token: any = invitationToken.value;
  navigator.clipboard.writeText(token);
  tooltip.value = !tooltip.value;
  setTimeout(() => (tooltip.value = false), 700);
}
</script>

<style scoped lang="scss">
@import '@/assets/style/variables.scss';

.test {
    color: $primary;
}

.bad {
    font-size: 16px;
    color: #f23648;
    font-weight: 500;
  }
  .correct {
    font-size: 16px;
    color: #21a67a;
    font-weight: 500;
  }
  .title {
    font-size: 24px;
    font-weight: 600;
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