<template>
 <div class="white-retangle1">
    <div  v-for="(item, index) in newArray" :key="index">
        <!-- <div @click="rowClick()"> -->
            <div class="row-table" @click="rowClick(index)"
            :class="[index == 0 ? 'click-border-top': null, index != (newArray.length - 1) ? null : 'click-border-bottom', noClick ? 'no-click':null ]"
        >
            <p class="text-des-mobile1">{{ item.des }}</p>
            <h2 class="title-menu-mobile1">{{ item.text }}</h2>
        </div>
    <!-- </div> -->
    <hr  v-if="index != (newArray.length - 1) "/>
    </div>
    <!-- <NuxtLink to="/panel/ustawienia/dane-faktura">
        <div class="row-table-end flex place-items-center justify-between">
            <div class="flex place-items-center">
                <h2 class="title-menu-mobile">Zobacz pełne dane</h2>
            </div>
          <Icon name="ph:caret-right-light" size="20" class="text-gray" />
        </div>
    </NuxtLink> -->
</div>
    <!-- <ul>
      <li v-for="item in newArray" :key="item.text">
        <p>{{ item.text }}</p>
        <p>{{ item.des }}</p>
        <p>{{ item.link }}</p>
        <p>{{ item.des }}</p>
        <p>{{ item.template }}</p>
      </li>
    </ul> -->
    {{ newArray }}
</template>

<script setup lang="ts">
import {whiteRetangle} from "@/types";

const props = defineProps({
  array: {
    type: Array as ()=> whiteRetangle[],
    required: true
  }
})

let noClick=ref<boolean>(false)
const newArray:whiteRetangle[] = props.array

const rowClick=(index: number)=>{
    const indexProps = index
    
const filteredArray= newArray.filter((item:any, index:number)=>{
return index == indexProps
})
if(filteredArray[0].link){
    navigateTo(filteredArray[0].link)
console.log(filteredArray[0].link)
} else{
noClick.value=true
}
console.log(filteredArray)

}
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

hr {
    border-color: $border;
    margin-left: 21px;
}
.row-table{
    padding: 10px 14px 10px 28px;
}
.white-retangle1 {
    background-color: white;
    border-radius: 16px;

}
.click-border-top{
    border-radius: 16px 16px 0px 0px;
}
.click-border-bottom{
    border-radius: 0px 0px 16px 16px;
}
.no-click{
    -webkit-tap-highlight-color: transparent;
    border-radius: 999px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.click:active{
   background-color: red;
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
    margin-bottom: -5px;
}
</style>