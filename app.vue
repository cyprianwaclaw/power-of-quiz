<template>
  <Meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no" />
  <div class="family black-color page-background">
      <NuxtLoadingIndicator

      />
     <div v-if="isLoading">
      test
     </div>
      <NuxtPage v-else/>
  </div>
</template>

<script setup lang="ts">
const isLoading = ref(false)
onBeforeMount(()=>{
  isLoading.value = true
  setTimeout(()=>{
    isLoading.value = false
  }, 100)
})
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