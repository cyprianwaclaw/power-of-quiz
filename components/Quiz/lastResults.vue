<template>
    <div v-if="quiz.formattedCart.length" class="mb-4">
        <p class="font-semibold text-lg">Twoje ostatnie wyszukiwania</p>
        <div class="flex flex-col">
          <div v-for="single in items" :key="single.cost" class="flex">
{{ single.title }}
          </div>

          <!-- <p>{{ quiz.formattedCart[quiz.formattedCart.length - 1]?.title }}</p>
          <p>{{ quiz.formattedCart[quiz.formattedCart.length - 2]?.title }}</p>
          <p>{{ quiz.formattedCart[quiz.formattedCart.length - 3]?.title }}</p>
          <p>{{ quiz.formattedCart[quiz.formattedCart.length - 4]?.title }}</p>
          <p>{{ quiz.formattedCart[quiz.formattedCart.length - 5]?.title }}</p> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePersistCart } from "@/utils/hooks";
import { useQuiz } from "@/store/useQuiz";

const quiz = useQuiz();
usePersistCart();
const items = ref<any>(quiz.formattedCart.slice(-4).reverse())
</script>

<style lang="scss" scoped>

</style>