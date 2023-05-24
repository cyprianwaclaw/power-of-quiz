<!-- <template>
  <div>
    <h1>test</h1>
    <Crop
      v-if="selectedImage"
      :src="selectedImage"
      @result="resultImage = $event"
      :aspect-ratio="1 / 1"
      :maxHeight=124
    />
    <img v-if="resultImage" :src="resultImage" />
    <input ref="fileSelectorRef" type="file" accept="image/*" @change="onSelectedFile" />
    {{ file }}
    <p @click = "console1">console</p>
  </div>
</template>

<script setup lang="ts">
const resultImage = ref();
const selectedImage = ref();
let file = ref()

const onSelectedFile = (event: Event) => {
   file.value = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    selectedImage.value = URL.createObjectURL(file.value);
  }
};

function console1(){
    console.log(file.value)
    console.log(typeof(file.value))
    console.log(selectedImage)
    console.log(typeof(resultImage))

}
</script> -->

<template>
<div>
  <cropper
    ref="cropper"
    :src="uploadedImage"
    :stencil-props="{
      aspectRatio: 10/12
    }"
    @change="change"
  ></cropper>
  <input type="file" id="image" ref="fileInput" @change="getUploadedImage"/>

  </div>
</template>
<script setup lamg="ts">
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';


let fileInput = ref(null)
let cropper = ref(null)
let uploadedImage = ref(null)

const getUploadedImage =(e)=>{
  const file = e.target.files[0]
  uploadedImage.value = URL.createObjectURL(file)
  console.log(uploadedImage.value)

}
</script>
