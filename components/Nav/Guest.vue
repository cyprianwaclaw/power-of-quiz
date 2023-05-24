<template>
  <div class=" nav-border py-4 px-6 sm:py-4 fixed w-full flex bg-white z-10">
    <div class="flex justify-beetwen w-full">
      <div class="flex w-full"><img src="@/assets/file/logo.png" class="size-logo" /></div>
      <div><Icon name="ph:magnifying-glass-light" size="30" class="nav-icon"/></div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
@media only screen and (max-width: 520px) {
  .size-logo {
    width: 175px;
  }
}

@media only screen and (min-width: 520px) {
  .size-logo {
    width: 175px;
  }
}
</style>
