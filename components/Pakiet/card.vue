<template>
    <div class="flex  columns-2">
      <div class="box-left"
      :class="props.des ? 'border-none' : ''"
      >
        <p class="standard-title -mt-[30px]" v-if="props.des">PREMIUM 1</p>
        <p class="standard-title" v-else>STANDARD</p>
        <p class="text-inner" 
        :class="props.des ? 'mb-[18px] mt-[14px]' : 'mb-[32px] mt-[14px]'">{{ textStandard }}</p>
        <div v-if="props.des" class="">
          <div class="flex justify-center">
            <hr class="w-9 close border-[1px] rounded-2xl" />
          </div>
          <p class="text-3xl font-semibold text-center pt-6">{{ priceWeek }} zł </p>
        </div>
      </div>
      <div class="box-right"
      :class="props.des ? 'border-none1' : ''"
      >
        <p class="premium-title" v-if="props.des">PREMIUM 2</p>
        <p class="premium-title" v-else>PREMIUM</p>
        <p class="text-inner text-white" :class="props.des ? 'mb-[18px] mt-[14px]' : 'mb-[32px] mt-[14px]'">{{ textPremium }}</p>
        <div v-if="props.des" class="">
          <div class="flex justify-center">
            <hr class="w-9 close border-[1px] rounded-2xl" />
          </div>
          <p class="text-white  text-3xl font-semibold text-center mt-4">{{ priceMonth }} zł </p>
          <p class="text-white text-[12px] w-full text-center mb-5 mt-1">{{ des }}</p>
        </div>
      </div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
  textStandard: {
    type: String,
    required: true,
  },
  textPremium: {
    type: String,
    required: true,
  },
  des: {
    type: String,
    required: false,
  },
  priceMonth: {
    type: Number,
    required: false,
  },
  priceWeek: {
    type: Number,
    required: false,
    default: 21,
  },
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
background-image: linear-gradient(90deg, rgba(89, 131, 252, 1) 0%, rgba(47, 76, 148, 1) 100%);
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

.border-none{
  border-radius: 8px 0px 0px 0px;
}
.border-none1{
  border-radius: 0px 8px 0px 0px;
}
</style>
