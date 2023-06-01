<template>
  <div class="white-retangle1">
    <div
      v-for="(item, index) in newArray"
      :key="index"
      @click="rowClick(index)"
      :class="[
        newArray[index].link || newArray[index].template ? 'flex flex-col' : null,
        index !== newArray.length - 1 ? 'border-own1' : null,
      ]"
    >
      <div class="row-table1 place-items-center">
        <Icon
          size="26"
          class="primary-color mr-2"
          v-if="newArray[index].firstIcon"
        />
        <div class="flex flex-col w-full">
          <p class="text-des-mobile1">{{ item.des }}</p>
          <h2 class="title-menu-mobile1" v-if="item.text">
            {{ truncateText(item?.text, 25)?.name }}
            <span :class="[truncateText(item?.text, 25)?.class]">
              {{ truncateText(item?.text, 25)?.symbol }}
            </span>
          </h2>
          <div v-if="newArray[index].template == 'addNew'" class="flex w-full justify-start">
            <div v-if="item.type == 'input'" class="flex w-full pr-4 py-1">
            <textarea
            v-model="item.value"
            @input="handleInputOwn"
            :placeholder="item.placeholder"
            :wrap="item.wrap ? 'soft' : 'off'"
            rows="1"
          ></textarea>     
          </div>
          <!-- wszystkie sloty, które będziemy gdzieś wykorzystywać -->
          <slot  name="select" v-if="item.type == 'select'"/>
          <slot  name="select1" v-if="item.type == 'select1'"/>
          <slot  name="time" v-if="item.type == 'time'"/>
          </div>
        </div>
        <div v-if="newArray[index].link" class="w-full flex justify-end">
          <Icon name="ph:caret-right-light" size="20" class="text-gray" />
        </div>
        <div v-if="newArray[index].template === 'question'" class="flex justify-end w-full">
          <Icon name="ph:caret-down-light" size="20" class="text-gray rotate-icon"   :class="{'reversed': openIndex === index }"/>
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
const isTextareaFocused = ref(false);
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

const truncateText = (text:any, maxLength:number) => {
  let results:any={
      name: '',
      symbol: '',
      class:''
  }
  if (text.length > maxLength) {
    results = {
      name:text.slice(0, maxLength),
      symbol: '...',
      class:'text-gray'
    }
  } else{
    results = {
      name:text,
    }
  }
  return results;
};

</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.border-own1 {
  border-bottom: 1px solid $border;
}
.row-table1 {
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

.title-menu-mobile1 {
  font-family: $family;
  font-weight: 500;
  font-size: 16px;
  color: $text-black;
  display: flex;
}
.text-des-mobile1 {
  font-size: 15px;
  font-weight: 300;
  color: $text-gray;
  margin-bottom: -3px;
}

.rotate-icon {
  transition-duration: 0.2s;
  transform: rotate(0deg);
}
.rotate-icon.reversed {
  transform: rotate(-180deg);
}

textarea {
  border: none;
  width: 100%;
  overflow: auto;
  outline: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}
textarea::-webkit-resizer {
  background-color: white;
}
textarea:focus {
  border: none;
  overflow: auto;
  outline: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}
</style>
