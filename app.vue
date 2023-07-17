<template>
  <Meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no" />
  <div class="family black-color page-background">

    <!-- <div class="click"> -->
      <NuxtLoadingIndicator

      />
      <NuxtPage />
  </div>
</template>

<script setup lang="ts">

//   const nuxtApp = useNuxtApp();
//   const loading = ref(false);
//   nuxtApp.hook("page:start", () => {
//     loading.value = true;
//   });
//   nuxtApp.hook("page:finish", () => {
//     loading.value = false;
//   });

//   const isLoading = ref(false);

//   onBeforeRouteLeave((to, from, next) => {
//   isLoading.value = true;
//   setTimeout(() => {
//     next();
//   }, 500); // Ustaw opóźnienie, które pozwoli na wyświetlenie animacji ładowania
// });
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>