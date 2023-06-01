<template>
    <di class="py-1">
        <p v-if="selected" class="text-des-mobile-add">{{ header }}</p>
        <select v-model="selected" class="font-medium" required>
          <option value="" hidden invalid>{{ name }}</option>
          <option v-for="(single, index) in props.array" :key="index" :value="single.value">
            <p class="">{{ single.label }}</p>
        </option>         
        </select>
    </di>
</template>

<script setup lang="ts">
import {selectOption} from "@/types";

const selected = ref('')
const props = defineProps({
    array: {
    type: Array as () => selectOption[],
    required: true,
  },
header: {
    type: String,
    required: true,
},
name: {
    type: String,
    required: true,
},
})
const emit = defineEmits<{
    (e: 'select', arg:any): void
}>()

watch(selected,(newValue)=>{
    emit('select', newValue)
})
</script>

<style scoped>
select:invalid {
    color: #a7a2a2;
    font-size: 16px;
  }
  
  select::-ms-expand {
    display: none;
  }
  select {
    overflow: hidden !important;
    overflow: -moz-hidden-unscrollable !important;
    -webkit-appearance: none !important;
    -moz-appearance: none !important;
    appearance: none !important;
    font-size: 16px;
    font-weight: 500;
    box-shadow: none;
    outline: none;
    background: transparent;
    background-repeat: no-repeat;
  }

  .text-des-mobile-add {
    font-size: 14px;
    font-weight: 300;
    color: #a7a2a2;
    margin-top: 2px;
    margin-bottom: -2px;
  }
  .font1 {
    font-size: 16px;
    font-weight: 500;
  }
</style>