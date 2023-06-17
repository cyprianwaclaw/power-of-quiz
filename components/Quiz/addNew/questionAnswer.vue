<template>
  <LazyModalAlert
  :modalActive="isOpen"
    title="Uzupełnij pytanie"
    des="Aby dodać kolejne pytanie, wpisz tytuł poprzedniego pytania oraz  podaj wszystkie jego  odpowiedzi i zaznacz tę, która jest poprawna"
    closeButton="Uzupełnij"
    @close="isOpenModal()"
  />
  <LazyModalAlert
    :modalActive="isRemove"
    title="Usuń pytanie"
    des="Czy na pewno chcesz usunąć pytanie? Tej operacji nie będzie można cofnąć"
    closeButton="Anuluj"
    actionButton="Usuń"
    actionButtonClass="text-red-500"
    @close="isRemoveModal()"
    @action="removeQuestion"
  />
  <LazyModalAlert
    :modalActive="isRemoveSucessModal"
    title="Usunięto pytanie"
    des="Twoje pytanie zostało usunięte, teraz możesz teraz dodać kolejne"
    closeButton="Okej"
    @close="removeSuccess()"
  />
<!-- <pre> -->
  <div v-if="propsArray === undefined?true:false">
test
  </div>
  <!-- {{propsArray === undefined ? 'true': 'false'}} -->
  <!-- {{ array }} -->
<!-- </pre> -->
<!-- {{ array.length }}
{{ propsArray?.length > 0  }} -->
<!-- {{ propsArray }} -->
  <div v-if="props.array">
    <div v-for="(item, index) in propsArray" :key="index" class="white-retangle1 mt-6"
    >
    <!-- :class="[index != 0 ? 'margin-top-owm' : null]" -->
      <div class="flex flex-col pl-2.5 pr-5 border-own1">
          <div class="flex justify-between">
            <!-- {{ showRemoveButton(index) }} -->
            <p class="font-semibold">Pytanie {{ index + 1 }}</p>
            <!-- <Icon v-if=" index > 0 || array.length === 0 && index >= 0" name="carbon:close" size="24" class="close" @click="removePropsArray(index)" /> -->
              <Icon v-if="showRemoveButton(index)" name="carbon:close" size="24" class="close" @click="removePropsArray(index)" />
            <!-- <div
v-if="index === 0 && array.length === 0"
>
  test
</div> -->
          </div>
        <textarea
          type="text"
          class=" mt-3 mb-5 pr-2"
          v-model="item.title"
          placeholder="Wpisz tytuł pytania"
          @input="handleInputOwn"
          wrap="soft"
          rows="1"
          :maxlength="maxLetter"
          />
        <p class="justify-end flex mb-3 mr-[10px] text-[12px] -mt-1"
        v-if="item.title.length"
        :class="[item.title.length === maxLetter ? 'text-red-500' : 'text-gray' ]"
        >{{ item.title.length }} / {{ maxLetter }} </p>
      </div>
      <div v-for="(answer, index) in item.answers" :key="index" 
      class="flex py-2 place-items-center pl-3"
      :class="[index==3 ? null : 'border-own1']"
      >
      <input
      type="checkbox"
      class="w-6 -ml-1"
      :checked="answer.correct"
      @change="select(index, item.answers)"
      />
      <textarea
      type="text"
      class="pl-2.5 pr-7"
      v-model="answer.answer"
      @input="handleInputOwn"
      wrap="soft"
      rows="1"
      :placeholder="placeholderAnswer(index)"
      />
    </div>
  </div>
  <div class="flex justify-end -mr-3 mt-2" v-if="!isArray">
    <!-- <p @click="addQuestion(array)" class="primary-color text-[17px] font-semibold px-4 py-2 border border-transparent rounded-xl">Dodaj pytanie</p> -->
    <p @click="isArray = true" class="primary-color text-[17px] font-semibold px-4 py-2 border border-transparent rounded-xl">Dodaj pytanie</p>
  </div>
  </div>
<div v-if="isArray">
  <div v-for="(item, index) in array" :key="index" class="white-retangle1 mt-6"
  >
    <div class="flex flex-col pl-2.5 pr-5 border-own1">
      <div class="flex justify-between" v-if="props?.array">
            <p class="font-semibold">Pytanie {{  props?.array?.length + 1 }}</p>
              <Icon v-if="showRemoveButtonArray(index)" name="carbon:close" size="24" class="close" @click="isRemoveModal" />
        </div>
        <div class="flex justify-between" v-else>
          <p class="font-semibold">Pytanie {{ index + 1 }}</p>
          <Icon v-if="array.length !== 1" name="carbon:close" size="24" class="close" @click="isRemoveModal" />
      </div>
      <textarea
        type="text"
        class=" mt-3 mb-5 pr-2"
        v-model="item.title"
        placeholder="Wpisz tytuł pytania"
        @input="handleInputOwn"
        wrap="soft"
        rows="1"
        :maxlength="maxLetter"
      />
      <p class="justify-end flex mb-3 mr-[10px] text-[12px] -mt-1"
      v-if="item.title.length"
      :class="[item.title.length === maxLetter ? 'text-red-500' : 'text-gray' ]"
      >{{ item.title.length }} / {{ maxLetter }} </p>
    </div>
    <div v-for="(answer, index) in item.answers" :key="index" 
    class="flex py-2 place-items-center pl-3"
    :class="[index==3 ? null : 'border-own1']"
    >
    <input
    type="checkbox"
    class="w-6 -ml-1"
    :checked="answer.correct"
    @change="select(index, item.answers)"
    />
    <textarea
    type="text"
    class="pl-2.5 pr-7"
    v-model="answer.answer"
    @input="handleInputOwn"
    wrap="soft"
    rows="1"
    :placeholder="placeholderAnswer(index)"
    />
  </div>
</div>
  <div class="flex justify-end -mr-3 mt-2">
    <p @click="checkQuestion" class="primary-color text-[17px] font-semibold px-4 py-2 border border-transparent rounded-xl">Następne pytanie</p>
  </div>
</div>

</template>

<script setup lang="ts">
const emit = defineEmits(['array', 'newArray'])
const route = useRoute()
type questionAnswerArray= {
  title: string,
   answers: [ 
      { answer: string | number, 
      correct: boolean | number,
    },
]
}
const props = defineProps({
  array: {
    type: Array as () => questionAnswerArray[],
    required: false,
  },
});
const isOpen = ref(false);
const isRemove = ref(false);
const isRemoveSucessModal = ref(false);
;
const isRemoveModal = () => {
  isRemove.value = !isRemove.value;
};
const isOpenModal = () => {
  isOpen.value = !isOpen.value;
};
const removeSuccess = () => {
  isRemoveSucessModal.value = !isRemoveSucessModal.value;
};

const maxLetter = ref(50)



const array = reactive([
  {
  title: "",
  answers: [
      { answer: "", correct: false },
      { answer: "", correct: false },
      { answer: "", correct: false },
      { answer: "", correct: false },
    ],
  },
])

const isArray = ref();
const allArray = ()=>{
  if(props.array){
   isArray.value = false
  } else {
    isArray.value = true
  }
}
allArray()

const propsArray = ref()
propsArray.value = props.array

watch(array,(newValue)=>{
  emit('array', newValue);
  console.log(newValue)

})
// watch(propsArray,(newValue)=>{
//   console.log(newValue)
//   emit('array', newValue);
// })
const select = (index: any, data: any) => {
  const correctOption = data[index];
  correctOption.correct = !correctOption.correct;
  data.forEach((option: any, i: any) => {
    if (i !== index) {
      option.correct = false;
    }
  })
}
const removeQuestion = (index: any) => {
  isRemoveModal();
  array.splice(index, 1);
  removeSuccess()
}
const removePropsArray = (index: any) => {
  // isRemoveModal();
  propsArray.value.splice(index, 1);
  // console.log(propsArray.value)
  emit('newArray', propsArray.value);
  // removeSuccess()
}
const checkQuestion=()=>{
  let lastQuestion = array[array.length - 1]
    // let arrayProps = props?.array
    if(
      // arrayProps ||
        lastQuestion?.answers.every((single:any)=> single.correct == false)
        || lastQuestion?.answers.some((single:any)=> single.name == '')
        || lastQuestion?.title == ''
        ){
          // console.log('brakuje odpowiedzi')
       isOpen.value = !isOpen.value;
    } else {
      // addQuestion(allArray())
      addQuestion(array)
      // console.log('jest poprawnie')
    }
}

const showRemoveButton =(index:number) =>{
  let propsArray:any = props?.array
if(propsArray?.length === 1 && !isArray.value){
  return false
}
if(array.length && index === 0){
  return true
}
if(index >= 0 ){
    return true
  }
}
const showRemoveButtonArray =(index:number) =>{
  let propsArray:any = props?.array
if(array.length === 1 && !propsArray?.length ){
  return false
}
if(propsArray?.length && index === 0){
  return true
}
if(index >= 0 ){
    return true
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
.white-retangle1 {
  background-color: white;
  border-radius: 16px;
  padding: 21px 0px 11px 24px;
}
.margin-top-owm{
    margin-top: 28px;
}
.border-own1 {
    border-bottom: 1px solid $border;
  }
input {
  border: 1px solid white !important;
  font-size: 16px;
  font-weight: 500;
}
input:focus {
  border-color: white;
  font-size: 16px;
  font-weight: 500;
}
input::placeholder {
    font-size: 16px;
    font-weight: 400;
    color:$icon;
  }
  textarea {
  font-size: 16px;
  font-weight: 500;
    border: none;
    width: 100%;
    overflow: auto;
    outline: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }
  textarea::placeholder {
    font-size: 16px;
    font-weight: 400;
    color:$icon;
  }
  textarea::-webkit-resizer {
    background-color: white;
  }
  textarea:focus {
    border: none;
    font-size: 16px;
    font-weight: 500;
    overflow: auto;
    outline: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }
input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: none;
    width: 27px;
    height: 27px;
    background-color: #fff;
    background-image: url('@/assets/file/check.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
}

  input[type="checkbox"]:checked {
      background-image: url('@/assets/file/check1.svg');
    }
  
.close {
    color: rgb(209, 209, 209);
  }
</style>
