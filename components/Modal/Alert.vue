<template>
  <Transition>
    <div class="fixed z-50 left-0 bottom-0 w-full">
      <div class="blur-background-update" v-if="props.modalActive"></div>
      <Transition 
      @before-enter="onBefore"
      >
        <div class="modal-view-update" v-if="props.modalActive">
          <div class="flex justify-end pr-3 pt-2">
            <Icon
              name="carbon:close"
              size="30"
              class="close w-8 h-8 border-transparent rounded-[6px]"
              @click="$emit('close')"
            />
          </div>
          <div class="px-5 pb-6 pt-1 grid">
            <div>
              <p class="text-[20px] text-center font-semibold">{{ props.title }}</p>
              <p class="edit-message-modal">{{ props.des }}</p>
            </div>
          </div>
          <div class="flex mx-5 mb-5 place-items-center justify-end">
            <NuxtLink :to="props.redirect" v-if="props.redirect">
              <div class="ml-[-8px]">
                <p class="action-button primary-color">{{ props.actionButton }}</p>
              </div>
            </NuxtLink>
            <div @click="$emit('action')" v-else class="action-button">
              <p :class="[props.actionButtonClass ? props.actionButtonClass : 'primary-color']">
                {{ props.actionButton }}
              </p>
            </div>
            <p class="button-primary-small" @click="$emit('close')">
              {{ props.closeButton }}
            </p>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import gsap from 'gsap'
const emit = defineEmits(['close', 'action']);
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  des: {
    type: String,
    required: true,
  },
  closeButton: {
    type: String,
    required: true,
  },
  closeButtonClick: {
    type: String,
    required: false,
  },
  modalActive: {
    type: Boolean,
    required: true,
  },
  actionButton: {
    type: String,
    required: false,
  },
  actionButtonClass: {
    type: String,
    required: false,
  },
  redirect: {
    type: String,
    required: false,
  },
});

const onBefore = (el:any)=>{
  gsap.to(el,{
    y: -20,
    duration: 0.2,
  })
}
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

/* tło do modala */
.v-enter-active,
.v-leave-active {
  transition: opacity 0s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>
