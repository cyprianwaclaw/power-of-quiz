<template>
  <div class="container">
    <div class="button" @click="toggleContent">
      {{ showContent ? 'Hide Content' : 'Show Content' }}
    </div>
    <div class="content" :class="{ 'content-visible': showContent }">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tristique urna vel ullamcorper porta. Donec tempor magna non aliquam tincidunt. Sed in facilisis tortor. Duis lobortis felis sed felis vestibulum pharetra. Suspendisse ut lorem nunc. Nunc a velit sed urna placerat laoreet. Donec nec est vitae ligula vehicula vulputate. Sed fermentum lectus ut ante vulputate, vitae convallis mauris congue. Aenean dignissim leo non leo bibendum, eget viverra urna vestibulum. Fusce varius elementum purus vel sollicitudin.
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const showContent = ref(false);

const toggleContent = () => {
  showContent.value = !showContent.value;
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 0 auto;
}

.button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  text-align: center;
  cursor: pointer;
}

.content {
  padding: 20px;
  background-color: #f0f0f0;
  display: none;
  transition: opacity 0.3s ease-in;
}

.content-visible {
  display: block;
}
</style>
