<template>
    <div>
        <div class="grid grid-cols-2 gap-1.5">
            <div class="w-[26px] border-color border-black h-[30px]"></div>
            <div class="w-[26px] border-color h-[30px]"></div>
        </div>
        <div class="grid grid-cols-2 gap-1.5 mt-1.5">
            <div class="w-[26px] border-color border-black h-[30px]"></div>
            <div class="w-[26px] border-color h-[30px]"></div>
        </div>
    </div>
  </template>
  
  <script setup lang="ts">

</script>
  
  <style scoped lang="scss">
  @import "@/assets/style/variables.scss";
  $hover: hsl(223, 100%, 93%);
  .border-color {
    border: solid 2px $hover;
    border-radius: 4px;
    background-color: $hover;
  }
  </style>
  