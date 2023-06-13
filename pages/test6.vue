<template>
    <div>
      <button @click="showModal = true">Pokaż modal</button>
      <modal :showModal="showModal" :content="modalContent" @closeModal="closeModal" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const showModal = ref(false);
  const modalContent = ref('fghfdhtgfh');
  
  function closeModal() {
    showModal.value = false;
  }
  </script>