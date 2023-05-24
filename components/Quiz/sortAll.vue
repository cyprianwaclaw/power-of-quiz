<template>
  <div class="w-full grid grid-cols-3 justify-items-center mt-[26px] mb-[30px]">
    <div @click="buttonClick1()" class="click-mobile-container">
      <div
        class="w-12 h-[30px]"
        :class="{ border_active: first, border_hover: !first }"
      ></div>
      <div
        class="w-12 h-[31px] mt-1.5"
        :class="{ border_active: first, border_hover: !first }"
      ></div>
    </div>
    <div @click="buttonClick2()" class="click-mobile-container">
      <div
        class="w-12 h-[18px]"
        :class="{ border_active1: second, border_hover1: !second }"
      ></div>
      <div
        class="w-12 h-[18px] mt-1.5"
        :class="{ border_active1: second, border_hover1: !second }"
      ></div>
      <div
        class="w-12 h-[18px] mt-1.5"
        :class="{ border_active1: second, border_hover1: !second }"
      ></div>
    </div>
    <div @click="buttonClick3()" class="click-mobile-container">
      <div class="grid grid-cols-2 gap-1.5">
        <div
          class="w-[26px] h-[30px]"
          :class="{ border_active1: third, border_hover1: !third }"
        ></div>
        <div
          class="w-[26px] h-[30px]"
          :class="{ border_active1: third, border_hover1: !third }"
        ></div>
      </div>
      <div class="grid grid-cols-2 gap-1.5 mt-1.5">
        <div
          class="w-[26px] h-[30px]"
          :class="{ border_active1: third, border_hover1: !third }"
        ></div>
        <div
          class="w-[26px] h-[30px]"
          :class="{ border_active1: third, border_hover1: !third }"
        ></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits<{
  (e: "two", value: any): void;
  (e: "three", value: any): void;
  (e: "four", value: any): void;
}>();

const first:any = ref(localStorage.getItem('listView') == 'two' ? true : false)
const second:any = ref(localStorage.getItem('listView') == 'three' ? true : false)
const third:any = ref(localStorage.getItem('listView') == 'four' ? true : false)

const buttonClick1 = () => {
  first.value = true;
  localStorage.setItem('listView', 'two')
  third.value = false;
  second.value = false;
  emit('two', true);
};

const buttonClick2 = () => {
  localStorage.setItem('listView', 'three')
  second.value = true;
  first.value = false;
  third.value = false;
  emit("three",  'three');
};

const buttonClick3 = () => {
  localStorage.setItem('listView', 'four')
  third.value = true;
  second.value = false;
  first.value = false;
  emit("four",  'four');
};

</script>
<style scoped lang="scss">
@import "@/assets/style/variables.scss";
.border_active {
  border: solid 2px $primary;
  border-radius: 8px;
  background-color: $primary;
}
.border_active1 {
  border: solid 2px $primary;
  border-radius: 4px;
  background-color: $primary;
}
$hover: hsl(223, 100%, 93%);
.border_hover {
  border: solid 2px $hover;
  border-radius: 8px;
  background-color: $hover;
}
.border_hover1 {
  border: solid 2px $hover;
  border-radius: 4px;
  background-color: $hover;
}
.click-mobile-container{
  padding: 2px;
  border: transparent;
border-radius: 8px;
// background-color: $color-error;
}
</style>
