<template>
  <div @click="buttonClick()">
    <div class="w-12 h-[30px]"
    :class="{border_active: first, border_hover: !first}"
    ></div>
    <div class="w-12 h-[31px] mt-1.5"
    :class="{border_active: first, border_hover: !first}"
    ></div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['action'])
const first = ref(true)
const buttonClick=()=> {
  first.value =! first.value
  emit('action', true)
}

</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
.border_active {
  border: solid 2px $primary;
  border-radius: 8px;
  background-color: $primary;
}

$hover: hsl(223, 100%, 93%);
.border_hover {
  border: solid 2px $hover;
  border-radius: 8px;
  background-color: $hover;
}
</style>
