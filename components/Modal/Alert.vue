<template>
  <!-- <div v-if="props.modalActive"> -->
    <div class="fixed z-50 left-0 bottom-0 w-full" v-show="is_active">
      <div class="blur-background-update" ref="background"></div>
    <!-- <transition> -->
    <div class="modal-view-update" ref="modal">
      <div class="flex justify-end pr-4 pt-3">
        <Icon
          name="carbon:close"
          size="30"
          class="close w-8 h-8 border-transparent rounded-[6px]"
          @click="$emit('close')"
        />
      </div>
      <div class="px-5 pb-7 pt-1 grid">
        <div>
          <p class="text-[22px] text-center font-semibold">{{ title }}</p>
          <p class="edit-message-modal">{{ des }}</p>
        </div>
      </div>
      <div
        class="flex mx-5 mb-7 place-items-center justify-end"
        >
        <!-- :class="[actionButton ? 'justify-is-two' : null]" -->
        <NuxtLink :to="`${redirect}`" v-if="redirect">
          <button class="ml-[-8px]">
            <p class="action-button primary-color">{{ actionButton }}</p>
          </button>
        </NuxtLink>
        <button @click="$emit('action')" v-else class="action-button">
          <p :class="[actionButtonClass ? actionButtonClass : 'primary-color']">
            {{ actionButton }}
          </p>
        </button>
        <button class="button-primary-small" @click="$emit('close')">
          {{ closeButton }}
        </button>
      </div>
    </div>
    <!-- </transition> -->
  </div>
<!-- </div> -->
</template>
<script setup lang="ts">
import gsap from 'gsap'
const emit = defineEmits<{
  (e: "close", value: any): void;
  (e: "action", value: any): void;
}>();

const props = defineProps({
  title: {
    name: String,
    required: true,
  },
  des: {
    name: String,
    required: true,
  },
  closeButton: {
    name: String,
    required: true,
  },
  modalActive: {
    name: String,
    required: true,
  },
  actionButton: {
    name: String,
    required: false,
  },
  actionButtonClass: {
    name: String,
    required: false,
  },
  redirect: {
    name: String,
    required: false,
  },
});
const is_active = ref(false)
const open = ()=>{
  is_active.value =! is_active.value
}
const background = ref()
const modal = ref()
// let animation = gsap.timeline({paused: true, onReverseComplete: open}) 
// onMounted(()=>{
// animation.from(background.value,{
//   opacity: 0,
//   duration: 0.1,
// })
// .to(background.value,{
//   y: 200,
//   duration: 0.5,
// })
// .from(modal.value,{
//   opacity: 0,
//   y: 20,
//   duration: 0.5,
// })
// })

let animation = gsap.timeline({ paused: true, onReverseComplete: open });
onMounted(() => {
    animation
      .from(background.value, {
        opacity: 0,
        duration: 0.1,
      })
      .to(background.value, {
        y: 200,
        duration: 0.5,
      })
      .from(modal.value, {
        opacity: 0,
        y: 20,
        duration: 0.5,
      });
});

watch(props,(newValue) =>{
  if(newValue.modalActive == true){
    open()
    animation.play()
  } else{
    animation.reverse()
  }
})
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.action-button {
  letter-spacing: 0.05em;
  font-size: 15px;
  font-weight: 600;
  margin-right: 24px;
}
.edit-message-modal {
  margin: 10px 8px 0px 8px;
  line-height: 24px;
  font-weight: 500;
  font-size: 15px;
  text-align: center;
}


.close {
  color: rgb(209, 209, 209);
}

</style>
