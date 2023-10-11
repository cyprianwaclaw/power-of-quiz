<template>
  <div class="grid place-items-center cursor-default">
    <div v-if="user.is_photo">
      <img :src="user.photo" class="avatar_photo" />
    </div>
    <div v-else>
      <Icon name="carbon:user-avatar-filled" class="" color="#BFCBEE" size="100" />
    </div>
    <p class="text-xl font-semibold mb-1 mt-2">{{ user.name }}</p>
    <div v-if="user.is_premium" class="">
      <div class="flex place-items-center gap-1.5">
        <Icon name="fa:diamond" class="primary-color" size="18" />
        <p class="premium primary-color text-[14px]">Premium</p>
      </div>
    </div>
    <div v-else>
      <p class="standard text-gray text-[14px]">Standard</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { InvitedUser } from "@/types";
defineProps<{ user: InvitedUser }>();
</script>

<style scoped lang="scss">
@import "@/assets/style/_variables.scss";

.premium {
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
}
.standard {
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
}

.avatar_photo {
  width: 94px;
  border: 1px solid #b4b4b491;
  border-radius: 100%;
}
</style>
