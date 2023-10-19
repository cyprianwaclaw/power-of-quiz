<template>
  <!-- {{ result }} -->
    <div class="mx-7 pt-12">
        <div class="flex flex-col">
            <p class="primary-color font-semibold text-[15px] md:text-[17px] mb-0 md:mb-1">{{ title }}</p>
            <p class="text-gray text-[14px] md:w-[320px]  xl:w-[420px]">{{ des }}</p>
        </div>
        <div class="flex justify-end gap-[60px] mr-5 mt-5 md:-mt-11">
            <div>
                <Icon name="material-symbols:check-circle-rounded" size="25" color="#33B970" v-if="props.checkPremium == 'true'"/>
                <Icon name="material-symbols:check-circle-rounded" size="25" color="#C6F3D2" v-if="props.checkPremium == 'false'"/>
            </div>
            <div>
                <Icon name="material-symbols:check-circle-rounded" size="25" color="#33B970" v-if="props.checkStandard == 'true'"/>
                <Icon name="material-symbols:check-circle-rounded" size="25" color="#C6F3D2" v-if="props.checkStandard == 'false'"/>
            </div>
        </div>
    </div>
  </template>
  <script setup lang="ts">
  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    des: {
      type: String,
      required: false,
    },
    checkPremium: {
        type: String,
      required: true,
    },
    checkStandard: {
      type: String,
      required: true,
    },
  });


  const sizeF = ()=>{
    if (window.innerWidth <= 900) {
    return 25
  } else {
    return 2
  }
  }



  const screenSize = ref(window.innerWidth)
const result = ref()


const checkScreenSize = () => {
  screenSize.value = window.innerWidth;
  result.value = screenSize.value < 1000 ? 28 : 24;
};
window.addEventListener('resize', checkScreenSize);

// onMounted(() => {
//   window.addEventListener('resize', checkScreenSize);
// });

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize);
});

  </script>
  <style scoped lang="scss">
  @import "@/assets/style/variables";
  .box-left {
    display: flex;
    flex-direction: column;
    border-radius: 8px 0px 0px 8px;
    background-color: white;
    width: 137px;
    padding-top: 14px;
    justify-content: center;
  }
  .box-right {
      display: flex;
      flex-direction: column;
    border-radius: 0px 8px 8px 0px;
    background-color: rgba(89, 131, 252, 1);
    background-image: linear-gradient(
      90deg,
      rgba(89, 131, 252, 1) 0%,
      rgba(41, 53, 86, 1) 94%
    );
    width: 137px;
    padding-top: 14px;
    justify-content: center;
  }
  .standard-title {
      text-align: center;
    font-weight: 700;
    font-size: 11px;
    line-height: 22px;
    color: #a7a7a7;
  }
  
  .premium-title {
      text-align: center;
    font-weight: 700;
    font-size: 11px;
    line-height: 22px;
    color: #ececec;
  }
  .text-inner {
      text-align: center;
      font-weight: 600;
      font-size: 16px;
      line-height: 21px;
      padding: 0px 16px; 
  }
  </style>
  