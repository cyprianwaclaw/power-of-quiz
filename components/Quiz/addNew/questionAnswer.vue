<template>
  <LazyModalAlert
    v-if="isOpen"
    title="Uzupełnij dane"
    des="Aby dodać kolejne pytanie, wpisz tytuł poprzedniego pytania oraz  podaj wszystkie jego  odpowiedzi i zaznacz tę, która jest poprawna"
    closeButton="Uzupełnij"
    @close="isOpen =! isOpen"
  />
  <LazyModalAlert
    v-if="isRemove"
    title="Usuń pytanie"
    des="Czy na pewno chcesz usunąć pytanie? Tej operacji nie będzie można cofnąć"
    closeButton="Anuluj"
    actionButton="Usuń"
    actionButtonClass="text-red-500"
    @close="isRemoveModal()"
    @action="removeQuestion"
  />
  <LazyModalAlert
    v-if="isRemoveSucessModal"
    title="Usunięto pytanie"
    des="Twoje pytanie zostało usunięte, teraz możesz teraz dodać kolejne"
    closeButton="Okej"
    @close="removeSuccess()"
  />
  <!-- <pre>
    {{ allArray }}
  </pre> -->
  <div v-for="(item, index) in allArray" :key="index" class="white-retangle1">
    <div class="flex justify-between">
      <p>Pytanie {{ index + 1 }}</p>
      <Icon v-if="index != 0" name="carbon:close" size="21" @click="isRemoveModal" />
    </div>
    <input
      type="text"
      class="-ml-4"
      v-model="item.title"
      placeholder="Wpisz tytuł pytania"
    />
    <div v-for="(question, index) in item.questions" :key="index" class="flex">
      <input
        type="checkbox"
        class="w-5"
        :checked="question.selected"
        @change="select(index, item.questions)"
      />
      <input
        type="text"
        v-model="question.name"
        :placeholder="placeholderAnswer(index)"
      />
    </div>
  </div>
  <button @click="checkQuestion()">Następne pytanie</button>
</template>

<script setup lang="ts">
const isOpen1 = ref(false);
const isOpen = ref(false);
const isRemove = ref(false);
const isRemoveSucessModal = ref(false);
;
const isRemoveModal = () => {
  isRemove.value = !isRemove.value;
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

<style scoped>
.white-retangle1 {
  background-color: white;
  margin-top: 28px;
  border-radius: 16px;
  padding: 24px;
}
input {
  border: 1px solid white !important;
  padding: 4px 4px 4px 13px;
}
input:focus {
  border-color: white;
}
</style>
