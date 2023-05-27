<template>
  <div class="fixed z-50 left-0 bottom-0 w-full">
    <div class="blur-background-update"></div>
    <div class="modal-view-update">
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
        :class="[actionButton ? 'justify-is-two' : null]"
      >
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
  </div>
</template>
<script setup lang="ts">
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
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.action-button {
  letter-spacing: 0.05em;
  font-size: 15px;
  font-weight: 600;
  margin-left: 8px;
}
.edit-message-modal {
  margin: 10px 8px 0px 8px;
  line-height: 24px;
  font-weight: 500;
  font-size: 15px;
  text-align: center;
}

.justify-is-two {
  justify-content: space-between;
}

.close {
  color: rgb(209, 209, 209);
}
</style>
