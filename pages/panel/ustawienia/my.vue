
<!-- <template> -->
    <!-- <div>
      <input type="file" ref="fileInput" @change="fileChanged"/>
      <div v-if="selectedFile" class="my-2 align-baseline text-center">
        <span>Selected File: </span>
        <span>{{ selectedFile.name }}</span>
        <span>{{ selectedFile.name }}</span>
      </div>
      </div> -->
      <!-- <div v-show="imageSrc" class="my-2 w-64 h-64 object-fill mx-auto">
        <img class="block max-w-full" ref="img" :src="imageSrc" />
      </div>
      <div class="flex justify-center content-end mt-2">
        <button
          v-if="!imageSrc"
          class="btn btn-blue w-32 mx-2"
          @click="imageInput.click()"
        >
          New Image
        </button>
        <button v-else class="btn btn-blue w-32 mx-2" @click="handleImageCropped">
          Update
        </button>
        <button
          button
          v-if="imageSrc"
          class="btn btn-gray w-32 mx-2"
          @click="fileCleared"
        >
          Cancel
        </button>
        <input
          type="file"
          ref="imageInput"
          accept=".jpg,.jpeg,.png"
          @change="fileChanged"
          :style="{ display: 'none' }"
        />
      </div>
      <div v-if="selectedFile" class="my-2 align-baseline text-center">
        <span>Selected File: </span>
        <span>{{ selectedFile.name }}</span>
      </div>
    </template>
    <script setup lang="ts">
   import Cropper from 'cropperjs';
   import 'cropperjs/dist/cropper.css'
   import {
  ref,
  watchEffect,
  onMounted,
  onUnmounted,
  watch,
} from 'vue';

onMounted(() => {
  console.log(`the component is now mounted.`)
})

   const imageInput = ref(null); // template ref for file input
    const selectedFile = ref(null);
    const imageSrc = ref(null);
    const img = ref(null);
    const fileReader = new FileReader();
    let cropper = null;

    fileReader.onload = (event) => {
      imageSrc.value = event.target.result;
      console.log(imageSrc)
    };

    const handleImageCropped = () => {
      cropper
        .getCroppedCanvas({
          width: 256,
          height: 256,
        })
        .toBlob((blob) => {
          console.log(blob);
          emit('imageCropped', blob);
        }, 'image/jpeg');
      selectedFile.value = null;
    };
    const fileChanged = (e) => {
      const files = e.target.files || e.dataTransfer.files;
      if (files.length) {
        selectedFile.value = files[0];
        console.log(selectedFile.value)
      }
    };
    const fileCleared = (_) => {
      selectedFile.value = null;
    };


    onMounted(() => {
      cropper = new Cropper(img.value, {
        aspectRatio: 1,
        minCropBoxWidth: 256,
        minCropBoxHeight: 256,
        viewMode: 3,
        dragMode: 'move',
        background: false,
        cropBoxMovable: false,
        cropBoxResizable: false,
      });
    });
    
    </script> -->
    

    <template>
      <div>
        <input type="file" accept="image/*" @change="handleFileInput" />
        <img ref="image" src="@/assets/file/placeholder-image.webp"  alt="image" />
        <button @click="cropImage">Crop Image</button>
      </div>
    </template>
    
    <script setup>
    import Cropper from 'cropperjs';
    import axios from 'axios';
    
    let imageUrl = ref(null);
    let cropper = ref(null)
    
    const initCropper = () => {
      const image = ref(null);
      onUnmounted(() => {
        cropper = new Cropper(image.value, {
          aspectRatio: 1,
          viewMode: 2,
        });
      });
      return { image };
    };
    
    const handleFileInput = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    };
    
    const cropImage = () => {
      const canvas = cropper.getCroppedCanvas();
      canvas.toBlob((blob) => {
        const croppedImageFile = new File([blob], 'cropped-image.png', { type: 'image/png' });
        const formData = new FormData();
        formData.append('croppedImage', croppedImageFile);
    
        axios.post('/api/upload', formData)
          .then((response) => {
            console.log('Image uploaded successfully');
          })
          .catch((error) => {
            console.error('Image upload failed:', error);
          });
      });
    };
    </script>