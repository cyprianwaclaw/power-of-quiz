<template>
    <div>
      <div class="w-12 border-color h-[18px]"></div>
      <div class="w-12 border-color border-black h-[18px] mt-1.5"></div>
      <div class="w-12 border-color border-black h-[18px] mt-1.5"></div>
    </div>
  </template>
  
  <script setup lang="ts"></script>
  
  <style scoped lang="scss">
  @import "@/assets/style/variables.scss";
  $hover: hsl(223, 100%, 93%);
  .border-color {
    border: solid 2px $hover;
    border-radius: 4px;
    background-color: $hover;
  }
  </style>
  