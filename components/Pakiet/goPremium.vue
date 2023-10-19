<template>
    <Button @click="changePage" class="button-primary-small mt-4 mb-2 w-[189px] place-items-center">
        Dostępne pakiety <Icon name="carbon:chevron-right" class="-mr-2" size="24" />
    </Button>
</template>ee
<script setup lang="ts">

const router = useRouter()
const changePage = () => {
  if (window.screen.width <= 900) {
    router.push('/panel/pakiety')
  } else {
    router.push('/panel/konto')
  }
}
</script>
   