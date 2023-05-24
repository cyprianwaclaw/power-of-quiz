<template>
  <div>
    <Transition>
      <div v-if="modal" class="back absolute min-h-screen w-full top-0 left-0">df</div>
    </Transition>
    <Transition
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @leave="onLeave"
      :css="false"
    >
      <div
        v-if="modal"
        @click-outside="closeModal"
        class="absolute z-50 bg-white min-h-screen top-0 left-0 w-[300px]"
      >
        <div>sasasassdsdsds dsdsdsdsdsdsdsdsdsds</div>
      </div>
    </Transition>
    <button class="click hidden lg:flex p-2 hero-button" @click="modal = true">
      <Icon name="healthicons:ui-menu" size="25" class="" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import gsap from "gsap";
import { useUser } from "@/store/useUser";
import { vOnClickOutside } from "@vueuse/components";

const modal = ref(false);
function closeModal() {
  modal.value = false;
}

function onBeforeEnter(el: any) {
  gsap.set(el, {
    scaleX: 0.25,
    scaleY: 0.25,
    opacity: 1,
  });
}

function onEnter(el: any, done: any) {
  gsap.to(el, {
    duration: 1,
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    ease: "elastic.inOut(2.5, 1)",
    onComplete: done,
  });
}

function onLeave(el: any, done: any) {
  gsap.to(el, {
    duration: 0.7,
    scaleX: 1,
    scaleY: 1,
    x: 300,
    ease: "elastic.inOut(2.5, 1)",
  });
  gsap.to(el, {
    duration: 0.2,
    delay: 0.5,
    opacity: 0,
    onComplete: done,
  });
}
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.hero-button {
  border-radius: 24px;
  transition: 0.5s 0.01s;
}
.hero-button:hover {
  background-color: rgba(97, 140, 251, 0.1);
  transition: 0.1s;
}
.back {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(1px);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.3s;
}

.slide-fade-leave-active {
  transition: all 0.3s;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-200px);
}
</style>
