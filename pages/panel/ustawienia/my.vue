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