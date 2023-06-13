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
  <!-- <pre>
    {{ allArray }}
  </pre> -->
  <div v-for="(item, index) in allArray" :key="index" class="white-retangle1"
  :class="[index != 0 ? 'margin-top-owm' : null]"
  >
    <div class="flex flex-col pl-2.5 pr-5 border-own1">
        <div class="flex justify-between">
            <p class="font-semibold">Pytanie {{ index + 1 }}</p>
            <Icon v-if="index != 0" name="carbon:close" size="24" class="close" @click="isRemoveModal" />
        </div>
      <textarea
        type="text"
        class=" mt-3 mb-5"
        v-model="item.title"
        placeholder="Wpisz tytuł pytania"
        @input="handleInputOwn"
        wrap="soft"
        rows="1"
      />
    </div>
    <div v-for="(question, index) in item.questions" :key="index" 
    class="flex py-1 place-items-center pl-3"
    :class="[index==3 ? null : 'border-own1']"
    >
      <input
        type="checkbox"
        class="w-6 -ml-1"
        :checked="question.selected"
        @change="select(index, item.questions)"
      />
      <input
        type="text"
        class="pl-2.5"
        v-model="question.name"
        :placeholder="placeholderAnswer(index)"
      />
    </div>
  </div>
  <div class="flex justify-end -mr-3 mt-2">
      <button @click="checkQuestion" class="primary-color text-[17px] font-semibold px-4 py-2 border border-transparent rounded-xl">Następne pytanie</button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['array'])
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

const allArray = reactive([
  {
    title: "",
    questions: [
      { name: "", selected: false },
      { name: "", selected: false },
      { name: "", selected: false },
      { name: "", selected: false },
    ],
  },
]);
watch(allArray,(newValue)=>{
emit('array', newValue);
})
const select = (index: any, data: any) => {
  const selectedOption = data[index];
  selectedOption.selected = !selectedOption.selected;
  data.forEach((option: any, i: any) => {
    if (i !== index) {
      option.selected = false;
    }
  })
}
const removeQuestion = (index: any) => {
  isRemoveModal();
  allArray.splice(index, 1);
}

const checkQuestion=()=>{
    let lastQuestion = allArray[allArray.length - 1]
    if(
        lastQuestion.questions.every((single:any)=> single.selected == false)
        || lastQuestion.questions.some((single:any)=> single.name == '')
        || lastQuestion.title == ''
         ){
        // console.log('brakuje odpowiedzi')
        isOpen.value = !isOpen.value;
    } else{
        addQuestion(allArray)
        // console.log('jest poprawnie')
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
