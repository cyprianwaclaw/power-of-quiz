<template>
  <Transition name="slide-fade">
  <div class="fixed z-50 left-0 bottom-0 w-full">
    <div class="dark-blur-background"></div>
      <div class="modal-down">
        <div class="justify-center flex -mt-[17px]">
          <hr class="w-9 close border-[2px] rounded-2xl" />
        </div>
        <div
        class="flex columns-2 w-full justify-between mb-7 mt-[13px] place-items-center"
        >
        <p class="font-medium text-2xl">{{ title }}</p>
        <Icon
        name="carbon:close"
          size="30"
          class="close w-8 h-8 border-transparent rounded-[6px]"
          @click="$emit('close')"
          />
      </div>
      <div class="">
<slot name="content"/>
      </div>
    </div>
  </div>
  </Transition>
</template>
<script setup lang="ts">
const props = defineProps({
  title: {
    name: String,
    required: true,
  },
});
const emit = defineEmits<{
  (e: "close", value: any): void;
}>();

</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
.okej {
  letter-spacing: 0.05em;
  font-size: 15px;
  color: $primary;
  font-weight: 600;
  margin-left: 17px;
}
.edit-message-modal {
  margin-top: 10px;
  line-height: 24px;
  font-weight: 500;
  font-size: 15px;
  text-align: center;
}

.modal-down {
  background-color: white;
  border: solid transparent;
  border-radius: 16px 16px 0px 0px;
  padding: 24px 24px 12px 24px;
  position: relative;
  z-index: 100;
}
.close {
  color: rgb(209, 209, 209);
}
.button-remove {
  background-color: transparent;
  border: solid 1px $color-error;
  padding: 10px 23px;
  color: $color-error;
  font-family: $family;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  letter-spacing: 0.05em;
  display: block;
  border-radius: 8px;
  transition: color 0.3s ease-in-o;
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
