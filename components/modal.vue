<template>
    <div v-if="show" class="modal z-10" @click="closeModal" ref="background">
      <div ref="background" class="background"></div>
      <div ref="box" class="box z-20">
        <p ref="text" class="text-black">{{ content }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { gsap } from 'gsap';
  
  const props = defineProps({
    show: Boolean,
    content: String
  });
  
  const showModal = ref(props.show);
  const background = ref()

  onMounted(() => {
    if (showModal.value) {
      const timeline = gsap.timeline({paused:true});
  
      timeline.from(
        background.value,{
          opacity: 1, 
          duration: 1,
        }
      );
    }
  });
  
  function closeModal() {
    showModal.value = false;
    emit('closeModal');
  }
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }
  
  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .box {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
  }
  
  .text-black {
    color: black;
  }
  </style>
  