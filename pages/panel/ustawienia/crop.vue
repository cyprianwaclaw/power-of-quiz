<template>
  <div>
    <div class="test w-12 h-12"></div>
    <input type="file" ref="selectedImage" id="image" @change="getUploadedImage" />
    <div>
      <img :src="addImage" />
    </div>
    <div>
        <button >Crop</button>
    </div>
<Crop/>
  </div>
</template>

<script setup lang="ts">
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import { onMounted } from "vue";

const selectedImage = ref();
const addImage = ref();
const cropper = ref();

const getUploadedImage = (e) => {
  const file = e.target.files[0];
  console.log(file);
  addImage.value = URL.createObjectURL(file);
  console.log(addImage.value);
};

const getRoundedCanvas = (sourceCanvas: HTMLCanvasElement) => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const width = sourceCanvas.width
    const height = sourceCanvas.height
  
    canvas.width = width
    canvas.height = height
  
    if (context) {
      context.imageSmoothingEnabled = true
      context.drawImage(sourceCanvas, 0, 0, width, height)
      context.globalCompositeOperation = 'destination-in'
      context.beginPath()
      context.arc(width / 2, height / 2, width / 2, 0, Math.PI * 2)
      context.fill()
    }
  
    return canvas
  }


onUnmounted(() => {
  cropper.value = new Cropper(addImage.value, {
    aspectRatio: 1,
        minCropBoxWidth: 256,
        minCropBoxHeight: 256,
        viewMode: 3,
        dragMode: 'move',
        background: false,
        cropBoxMovable: false,
        cropBoxResizable: false,
    // crop(event) {
    //   console.log(event.detail.x);
    //   console.log(event.detail.y);
    //   console.log(event.detail.width);
    //   console.log(event.detail.height);
    //   console.log(event.detail.rotate);
    //   console.log(event.detail.scaleX);
    //   console.log(event.detail.scaleY);
    // },
  });

  console.log(cropper);
});
</script>

<style scoped lang="scss">
@import "@/assets/style/_variables.scss";

.test {
  background-color: $primary;
}
</style>
