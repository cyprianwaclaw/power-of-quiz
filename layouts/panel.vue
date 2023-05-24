<template>
  <div class="pb-5">
    <div class="">
      <NavUser />
    </div>
    <div class="own-container min-h-screen page-background ">
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
  padding-top: 100px
}
</style>
