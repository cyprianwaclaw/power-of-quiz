<template>
  <div class="py-1">
    <p v-if="selected" class="text-des-mobile-add">{{ header }}</p>
    <select v-model="selected" class="font-medium" required @change="handleSelection">
      <option value="" hidden invalid>{{ name }}</option>
      <option v-for="(single, index) in props.array" :key="index" :value="single.value">
        {{ single.label }}
      </option>
    </select>
  </div>
</template>
<script setup lang="ts">
import { ref, defineProps, defineEmits, watchEffect } from 'vue';
import { selectOption } from '@/types';

const selected = ref('');
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
  select: {
    type: Number,
  },
  defaultOption: {
    type: String,
    default: '',
  },
  reset:{
    type: String,
    required: false,
  }
});

const emit = defineEmits(['selected']);

watchEffect(() => {
  if (!selected.value && props.defaultOption) {
    selected.value = props.defaultOption;
  }
});

function handleSelection() {
  emit('selected', selected.value);
}
watch(() => props.reset,
  (newValue) => {
    if (newValue === 'true') {
      resetSelection();
    }
  }
);
function resetSelection() {
  selected.value = '';
}

</script>
<style scoped lang="scss">
@import "@/assets/style/variables.scss";
select:invalid {
  font-size: 16px;
  font-weight: 400;
  color:$icon;
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
  select::placeholder {
    font-size: 16px;
    font-weight: 400;
    color:$icon;
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