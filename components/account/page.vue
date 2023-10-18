<template>
  <div class="md:flex hidden md:justify-between">
    <div class="flex flex-col shrink-0 w-[220px] gap-[5px]">
      <div v-for="(single, index) in links" :key="index">
        <button
          @click="loadComponent(single?.component)"
          v-if="single?.component"
          class="hover: cursor-pointer"
        >
          <p
            :class="[
              active == single?.component
                ? 'primary-color title font-semibold'
                : 'title hover:text-gray-600',
            ]"
          >
            {{ single.title }}
          </p>
        </button>
        <p class="title cursor-default" v-else>{{ single.title }}</p>
        <div class="flex flex-col ml-[12px] gap-[4px] mt-[4px]">
          <div v-for="(page, index) in single?.pages" :key="index">
            <button @click="loadComponent(page?.component)" class="hover: cursor-pointer">
              <p
                :class="[
                  active == page?.component
                    ? 'primary-color font-semibold'
                    : 'text-black hover:text-gray-600',
                ]"
              >
                {{ page?.name }}
              </p>
            </button>
          </div>
        </div>
      </div>
      <button @click="$emit('logout')"><p class="text-start">Wyloguj się</p></button>
    </div>
    <div
      class="flex shrink mb-[150px]"
      :class="[active == 'settings' ? 'retangle' : 'retangle-white']"
    >
      <component :is="currentComponent" />
    </div>
  </div>
</template>
<script setup lang="ts">
const currentComponent = ref();
const active = ref();
const emit = defineEmits(["logout"]);
const links = [
  { title: "Pakiety", component: "package" },
  {
    title: "Quizy",
    pages: [
      { id: 1, name: "Wszystkie", component: "allQuiz" },
      { id: 2, name: "Do akceptacji", component: "toAccept" },
      { id: 3, name: "Zaakceptowane", component: "accepted" },
    ],
  },
  { title: "Moje środki", component: "myFunds" },

  {
    title: "Faktury i płatności",
    component: "futurePayments",
  },
  { title: "Ustawienia", component: "settings" },
];

const loadComponent = async (componentName: any) => {
  const component = await import(`@/components/account/page/${componentName}.vue`);
  currentComponent.value = markRaw(component.default || component);
};

watch(currentComponent, (newValue) => {
  const changeActive = () => {
    active.value = newValue.__name;
  };
  changeActive();
});

onMounted(() => {
  loadComponent("package");
});
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
.retangle {
  width: 76%;
}
.retangle-white {
  width: 76%;
  border-radius: 12px;
  padding: 46px 52px;
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
