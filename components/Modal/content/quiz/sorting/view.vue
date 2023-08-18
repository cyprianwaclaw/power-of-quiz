<template>
     <div class="overflow-y-scroll h-[255px] right-8 left-8 pr-4">
        <p class="mb-4 text-lg font-bold">Wybierz układ</p>
    <QuizSortAll @stateView="view" />
    <div class="mb-8">
      <p class="mb-2.5 text-lg font-bold">Liczba na stronie</p>
      <InputSingleRange :max="60" v-model="perPage" />
    </div>
    <p class="mb-4 text-lg font-bold">Inne opcje sortowania</p>
    <CHOOSE_TEST 
    
    />
    <button class="button-primary w-full mt-9 mb-5" @click="saveChanges">Zapisz zmiany</button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "state", value: string): void;
  (e: "perPage", value: number): void;
  (e: "close"): void;
}>();
const sliderValue = ref(50);
const currentView = ref();
const currentPerPage = ref();

const view = (value: string) => {
  currentView.value = value;
};
const perPage = ref(parseInt(localStorage.getItem("perPage") as any));

watch(perPage, (newVal: any) => {
  currentPerPage.value = newVal
});

const saveChanges = ()=>{
    if (currentView.value) {
    emit("state", currentView.value);
    localStorage.setItem('listView', currentView.value)
  } 
  if (currentPerPage.value) {
  localStorage.setItem("perPage", currentPerPage.value);
  emit("perPage", currentPerPage.value);
  }
  emit("close");


}
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
</style>
