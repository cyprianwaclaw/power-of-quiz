<template>
  <div class="md:flex hidden">
    <div class="flex flex-col shrink-0 w-[220px] gap-[12px]">
      <div v-for="(single, index) in links" :key="index">
        <NuxtLink :to="`/panel/konto${single.hash}`" v-if="single.hash" class="hover: cursor-pointer">
            <p :class="[single.hash === route.hash ? 'active-title': 'title' ]">{{ single.title }}</p>
        </NuxtLink>
        <p class="title cursor-default" v-else>{{ single.title }}</p>
        <div class="flex flex-col ml-[12px] gap-[4px] mt-[4px]">
          <div v-for="(page, index) in single?.pages" :key="index">
            <NuxtLink :to="`/panel/konto${page.hash}`" class="hover: cursor-pointer">
            <p :class="[page.hash === route.hash ? 'active-page': 'page' ]">{{ page?.name }}</p>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div class="flex shrink retangle">
      {{ newRoute }}
      <toggleComponent />
      <!-- <div>
        <component :is="AccountPageAllQuiz" />
      </div> -->
    </div>
  </div>
</template>
<script setup lang="ts">
let route = useRoute()
let router = useRouter()
const links = [
  {
    title: "Quizy",
    pages: [
      { id: 1, name: "Wszystkie", hash:"#wszystkie"},
      { id: 2, name: "Do akceptacji", hash:"#do-akceptacji"},
      { id: 3, name: "Zaakceptowane", hash:"#zaakceptowane"},
    ],
  },
  { title: "Moje środki", hash:"#moje-srodki" },
  {
    title: "Faktury i płatności ",
    pages: [
      { id: 1, name: "Nadchodzace platności", hash:"#nadchodzace-platnosci" },
      { id: 2, name: "Faktury", hash:"#faktury" },
    ],
  },
  { title: "Ustawienia", hash:"#ustawienia" },
];
const nullHash = ()=>{
    if(!route.hash){
       router.push('/panel/konto#wszystkie')
    } else{
        console.log(route.hash)
    }
}
onMounted (()=>{
    nullHash()
})

const newRoute = ref()
watch(route,(newValue:any)=>{
if(newValue.value == '#wszystkie'){
 return  newRoute.value = 'wszystkie'
} else{
 return  newRoute.value = 'test'
}
})
const all = 'wszystkie'
const toggleComponent =  defineAsyncComponent(() => 
import(`@/components/account/page/${route.hash}.vue`));


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
  color: #1f1818;
  font-size: 18px;
  font-weight: 500;
}
.page {
  color: #646464;
  font-size: 15px;
  font-weight: 400;
}
.page:hover {
    color: #1f1818;
    font-weight: 500;
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
