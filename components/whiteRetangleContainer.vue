<template>
  <div class="white-retangle1">
    <div
      v-for="(item, index) in newArray"
      :key="index"
      @click="rowClick(index)"
      :class="[
        newArray[index].link || newArray[index].template ? 'flex flex-col' : null,
        index !== newArray.length - 1 ? 'border-own' : null,
      ]"
    >
      <div class="row-table place-items-center">
        <Icon
          :name="item.firstIcon"
          size="26"
          class="primary-color mr-2"
          v-if="newArray[index].firstIcon"
        />
        <div class="flex flex-col w-full">
          <p class="text-des-mobile1">{{ item.des }}</p>
          <h2 class="title-menu-mobile1">{{ item.text }}</h2>
        </div>
        <div v-if="newArray[index].link" class="w-full flex justify-end">
          <Icon name="ph:caret-right-light" size="20" class="text-gray" />
        </div>
        <div v-if="newArray[index].template === 'question'" class="flex justify-end w-full">
          <Icon name="ph:caret-right-light" size="20" class="text-gray" />
        </div>
      </div>
      <div v-if="openIndex === index && item.template" class="flex flex-col">
        <div v-for="(single, index) in item.question" :key="index">
          {{ single.answer }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { whiteRetangle } from "@/types";
import { defineEmits, defineProps, ref } from 'vue';

const emit = defineEmits(['open']);
const props = defineProps({
  array: {
    type: Array as () => whiteRetangle[],
    required: true,
  },
});

const openIndex = ref(-1);
const newArray: whiteRetangle[] = props.array;

const rowClick = (index: number) => {
  openIndex.value = openIndex.value === index ? -1 : index;

  const filteredArray = newArray.filter((item: any, i: number) => i === openIndex.value);

  if (filteredArray.length > 0) {
    const item = filteredArray[0];
    if (item.link) {
      navigateTo(item.link);
    } else if (item.template === 'question') {
      emit('open');
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.border-own {
  border-bottom: 1px solid $border;
}
.row-table {
  padding: 10px 14px 10px 10px;
  display: flex;
}
.white-retangle1 {
  background-color: white;
  border-radius: 16px;
  padding-left: 21px;
  padding-bottom: 6px;
  padding-top: 6px;
}

.no-click {
  -webkit-tap-highlight-color: transparent;
  border-radius: 999px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.title-menu-mobile1 {
  font-family: $family;
  font-weight: 500;
  font-size: 16px;
  color: $text-black;
}
.text-des-mobile1 {
  font-size: 15px;
  font-weight: 300;
  color: $text-gray;
  margin-bottom: -3px;
}
</style>
