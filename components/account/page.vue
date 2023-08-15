<template>
  <div class="md:flex hidden">
    <div class="flex flex-col shrink-0 w-[220px] gap-[12px]">
      <div v-for="(single, index) in links" :key="index">
        <button @click="loadComponent(single?.component)" v-if="single?.component" class="hover: cursor-pointer" >
            <p :class="[active==single?.component ?  'primary-color title font-semibold' : 'title hover:text-gray-600']">{{ single.title }}</p>
        </button>
        <p class="title cursor-default" v-else>{{ single.title }}</p>
        <div class="flex flex-col ml-[12px] gap-[4px] mt-[4px]">
          <div v-for="(page, index) in single?.pages" :key="index">
            <button @click="loadComponent(page?.component)" class="hover: cursor-pointer">
            <p :class="[active==page?.component ? 'primary-color font-semibold' : 'text-black hover:text-gray-600']">{{ page?.name }}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex shrink retangle">
      <component :is="currentComponent" />
    </div>
  </div>
</template>
<script setup lang="ts">
const currentComponent = ref()
const active = ref()
const links = [
  {
    title: "Quizy",
    pages: [
      { id: 1, name: "Wszystkie", component: "allQuiz"},
      { id: 2, name: "Do akceptacji",  component: "toAccept"},
      { id: 3, name: "Zaakceptowane",  component: "accepted"},
    ],
  },
  { title: "Moje środki", component: "myFunds" },
  {
    title: "Faktury i płatności ",
    pages: [
      { id: 1, name: "Nadchodzace platności", component: "futurePayments" },
      { id: 2, name: "Faktury",  component: "invoices" },
    ],
  },
  { title: "Ustawienia",  component: "settings" },
];

const loadComponent = async (componentName:any) => {
  const component = await import(`@/components/account/page/${componentName}.vue`);
  currentComponent.value =markRaw(component.default || component);
};

watch(currentComponent,(newValue)=>{
  const changeActive =()=>{
    active.value = newValue.__name
  }
    changeActive()
})

onMounted(() => {
  loadComponent('allQuiz');
});
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
.retangle {
  width: 100%;
  border-radius: 12px;
  padding: 34px;
  background-color: white;
  box-shadow: -6px 6px 7px 0px rgba(0, 0, 0, 0.05);
}
.title {
  font-size: 19px;
  font-weight: 500;
}
.page {
  color: #646464;
  font-size: 15px;
  font-weight: 400;
}
.active-title {
  color: $primary;
  font-size: 18px;
  font-weight: 700;
}
.active-page {
    color: $primary;
    font-size: 15px;
    font-weight: 700;
  }
</style>
