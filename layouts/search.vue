<template>
    <div>
      <div class="">
        <NavSearch />
      </div>
      <div class="own-container pt-28 h-screen">
        <slot />
      </div>
      <div class="sm:hidden">
        <NavBottom />
      </div>
    </div>
  </template>
  
  <script setup lang="ts"></script>
  
  <style scoped>
  .own-container {
    margin-left: 30px;
    margin-right: 30px;
  }
  </style>
  