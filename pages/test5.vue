<template>
    <div>
      <input type="file" ref="input" @change="handleFileInputChange" accept="image/*">
      <div v-if="selectedImage">
        <div class="cropper-container" ref="cropperContainer">
          <img :src="selectedImage" alt="Selected Image" @load="initializeCropper">
        </div>
        <button @click="cropImage">Crop Image</button>
      </div>
      <div v-if="croppedImage">
        <button @click="uploadCroppedImage">Upload Cropped Image</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import Cropper from 'cropperjs';
  import { axiosData } from '~~/utils/axios.config'
  import 'cropperjs/dist/cropper.css';

  const selectedImage = ref('');
  const croppedImage = ref('');
  const cropperInstance = ref(null);
  const cropperContainer = ref(null);
  
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = () => {
      selectedImage.value = reader.result;
    };
  
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  
  const initializeCropper = () => {
    const imgElement = cropperContainer.value.querySelector('img');
    cropperInstance.value = new Cropper(imgElement, {
      aspectRatio: 1, 
      //other
      crop: () => {
        const canvas = cropperInstance.value.getCroppedCanvas();
        croppedImage.value = canvas.toDataURL('image/jpeg');
      },
    });
  };
  
  const cropImage = () => {
    if (cropperInstance.value) {
    uploadCroppedImage()
      cropperInstance.value.destroy();
      cropperInstance.value = null;
    }
  };
  
  const uploadCroppedImage = () => {
  if (croppedImage.value) {
    const blob = dataURLtoBlob(croppedImage.value);
    const file = new File([blob], 'cropped_image.jpg', { type: blob.type });

    const formData = new FormData();
    formData.append('avatar', file);

    axiosData.post('/user/uploadAvatar', formData)
      .then(response => {
        console.log('Upload success', response.data);
      })
      .catch(error => {
        console.error('Upload error', error);
      });
  }
}
  
  const dataURLtoBlob = (dataURL) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
  
    return new Blob([u8arr], { type: mime });
  };
  
  onMounted(() => {
    if (selectedImage.value) {
      initializeCropper();
    }
  });
  </script>
  
  