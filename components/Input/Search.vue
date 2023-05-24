<template>
  <div class="mx-6 py-8 flex place-items-center gap-2">
    <input class="" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
    <div class="serach_color">
      <Icon
        name="ph:magnifying-glass"
        size="22"
        color="white"
        class="search_icon_color"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
.serach_color{
    background-color: $primary;
    border-radius: 8px;
    width: 50px;
    position: absolute;
    right: 20px;
height: 43px;
margin-top: 4px;
  }

  .search_icon_color{
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%, -50%);
  }
</style>