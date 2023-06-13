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

  const nuxtApp = useNuxtApp();
  const loading = ref(false);
  nuxtApp.hook("page:start", () => {
    loading.value = true;
  });
  nuxtApp.hook("page:finish", () => {
    loading.value = false;
  });
</script>