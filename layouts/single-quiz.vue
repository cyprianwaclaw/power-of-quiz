<template>
    <!-- <div class="pb-24"> -->
        <NavUser />
      <div class="own-container min-h-screen page-background">
        <div class="mb-[52px] flex justify-end -mr-3">
          <NuxtLink to="/panel/konto/dodane-quizy" class="md:hidden flex border-transparent rounded-lg py-2 px-3">
          <Icon name="ph:caret-right-bold" size="22" class="primary-color back-arrow" />
          <p class="go primary-color">Wszystkie quizy</p>
        </NuxtLink>
        <NuxtLink to="/panel/konto/" class="md:flex md:border-transparent md:rounded-lg md:py-2 md:px-3 hidden">
          <Icon name="ph:caret-right-bold" size="22" class="primary-color back-arrow" />
          <p class="go primary-color">Twoje konto</p>
        </NuxtLink>
        </div>
        <slot />
      </div>
      <div class="sm:hidden">
        <NavBottom />
      </div>
    <!-- </div> -->
  </template>
  
  <script setup lang="ts">
  // function Back(){useRouter().back()}
  </script>

  <style scoped>
  .own-container {
    margin-left: 30px;
    margin-right: 30px;
    padding-top: 100px
  }
  @media (min-width: 640px) { 
    .own-container {
      margin-left: 30px;
      margin-right: 30px;
      padding-top: 100px
    }
  }
  @media (min-width: 768px) { 
    .own-container {
      margin-left: 30px;
      margin-right: 30px;
      padding-top: 100px
    }
  }
  @media (min-width: 1024px) { 
    .own-container {
      margin-left: 100px;
      margin-right: 100px;
      padding-top: 100px
    }
  }
  @media (min-width: 1280px) { 
    .own-container {
      width: 1150px;
      margin: auto auto;
      padding-top: 100px
    }
  }
  @media (min-width: 1536px) {
    .own-container {
  width: 1280px;
  margin: auto auto;
      padding-top: 100px
    }
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
  