<template>
  <div class="pb-32">
      <NavUser />
    <div class="own-container min-h-screen page-background">
      <div class="mb-14 flex justify-end  -mr-3">
        <NuxtLink to="/panel/ustawienia" class="flex border-transparent rounded-lg py-2 px-3">
        <Icon name="ph:caret-right-bold" size="22" class="primary-color back-arrow" />
        <p class="go primary-color">Powrót do Ustawień</p>
      </NuxtLink>
      </div>
      <div class="mt-10">
      <slot />
    </div>
    </div>
    <!-- <div class="sm:hidden"> -->
      <NavBottom />
    <!-- </div> -->
  </div>
</template>

<script setup lang="ts">
// function Back(){useRouter().back()}
</script>

<style scoped>
.own-container {
  margin-left: 30px;
  margin-right: 30px;
  padding-top: 95px;
}
.go {
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  margin-left: 4px;
}
.back-arrow {
  transform: rotate(180deg);
  margin-left: -4px;
}
</style>
