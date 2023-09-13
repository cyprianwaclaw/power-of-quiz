<template>
  <ModalDown :modalActive="filter" title="Filtruj quizy" @close="filterShow()">
    <template #content>
      <ModalContentQuizFilterView
        @state="quizView"
        @perPage="perPageChange"
        @close="filterShow"
      />
    </template>
  </ModalDown>
  <ModalDown :modalActive="sorting" title="Sortowanie" @close="sortingShow()">
    <template #content>
      <ModalContentQuizSortingView
        @state="quizView"
        @perPage="perPageChange"
        @close="sortingClose"
      />
    </template>
  </ModalDown>
  <!-- po zmiene czogoś current page musi powrócić do strony 1 -->
  <div class="fixed margin z-40 flex w-full justify-end">
    <div class="open-filter" @click="filterShow()">
      <Icon name="heroicons:adjustments-horizontal" size="32" color="white" />
    </div>
  </div>
  <NuxtLayout name="panel">
    <div class="pb-[90px]">
      <div class="flex justify-between place-items-center mb-4">
        <div class="flex flex-row gap-2">
          <p class="text-[13px] text-gray-400">
            Strona {{ currentPage }}/{{ allQuiz.last_page }}
          </p>
          <div class="vl"></div>
          <p class="text-[13px] text-gray-400">{{ allQuiz.total }} wyników</p>
        </div>
        <div class="flex">
          <button @click="sortingShow">Sortuj</button>
        </div>
      </div>
      <div v-if="view == 'two'">
        <QuizCard v-for="quiz in allQuiz.data" :key="quiz?.id" :quiz="quiz" />
      </div>
      <div v-if="view == 'three'">
        <QuizSearchCard v-for="quiz in allQuiz.data" :key="quiz?.id" :quiz="quiz" />
      </div>
      <div v-if="view == 'four'">
        <div class="grid grid-cols-2 gap-6">
          <QuizTwoQuiz v-for="quiz in allQuiz.data" :key="quiz?.id" :quiz="quiz" />
        </div>
      </div>
      <pre>
   <!-- {{ filters(2) }} -->
    <!-- {{ allQuiz }} -->
        </pre
      >
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useQuiz } from "@/store/useQuiz";

definePageMeta({
  middleware: "auth",
});
const router = useRouter();
const route = useRoute();
// const perPageStart = ref(parseInt(localStorage.getItem("perPage") as any));
const currentPage = ref(1);

const quiz = useQuiz();
const { allQuiz } = storeToRefs(quiz);
const f = async()=>{
  // filters(route.query.cat_id)
  // await quiz.getAllQuiz(15, 1, 'filters[category_id][$in][0]=3');
  if (route.query.cat_id) {
  await getQuizByCategory(route.query.cat_id, quiz.getAllQuiz);
} else{

  await quiz.getAllQuiz(15, 1, null);
}

  console.log(route.query.cat_id);
  
}
f()

// if (route.query.cat_id) {
//   let id = route.query.cat_id;
//   let paramsArray = [];

//   if (Array.isArray(id)) {
//     // Jeśli `cat_id` jest tablicą
//     id.forEach((el) => {
//       const data = `filters[category_id][$in][${el}]=${el}`;
//       paramsArray.push(data);
//     });
//   } else {
//     // Jeśli `cat_id` jest pojedynczym stringiem
//     const data = `filters[category_id][$in][${id}]=${id}`;
//     paramsArray.push(data);
//   }

//   const paramsCategory = paramsArray.join("&");
//   console.log(paramsCategory);

//   // Przekazujemy paramsCategory do quiz.getAllQuiz
//   await quiz.getAllQuiz(15, 1, paramsCategory);
//   console.log(route.query);
// } else {
//   // Brak `route.query.cat_id`, wykonaj to, co jest potrzebne, gdy go nie ma
//   await quiz.getAllQuiz(15, 1, null);
// }


// const getQuizByCategory = async(cat_id: any) => {
//   let paramsArray = [];

//   if (Array.isArray(cat_id)) {
//     // Jeśli `cat_id` jest tablicą
//     cat_id.forEach((el) => {
//       const data = `filters[category_id][$in][${el}]=${el}`;
//       paramsArray.push(data);
//     });
//   } else {
//     // Jeśli `cat_id` jest pojedynczym stringiem
//     const data = `filters[category_id][$in][${cat_id}]=${cat_id}`;
//     paramsArray.push(data);
//   }

//   const paramsCategory = paramsArray.join("&");
//   console.log(paramsCategory);

//   // Przekazujemy paramsCategory do quiz.getAllQuiz
//   await quiz.getAllQuiz(15, 1, paramsCategory);

// }

// if (route.query.cat_id) {
//   await getQuizByCategory(route.query.cat_id, quiz.getAllQuiz);
// }
// } else {
//   // Brak `route.query.cat_id`, wykonaj to, co jest potrzebne, gdy go nie ma
//   await quiz.getAllQuiz(15, 1, null);
// }
// getQuizByCategory(route.query.cat_id)
// Wywołanie funkcji z route.query.cat_id lub bez
// if (route.query.cat_id) {
//   await getQuizByCategory(route.query.cat_id);
// } else {
//   // Brak `route.query.cat_id`, wykonaj to, co jest potrzebne, gdy go nie ma
//   await quiz.getAllQuiz(15, 1, null);
// }



const sorting = ref(false);
const sortingShow = () => {
  sorting.value = !sorting.value;
};
const sortingClose = () => {
  sorting.value = !sorting.value;
  // firstPage()
};
const filter = ref(false);
const filterShow = () => {
  filter.value = !filter.value;
};

const paramsCategory = ref();

onBeforeRouteUpdate(async (to, from) => {

  // console.log(filters(to.query.cat_id))
  let id = to?.query.cat_id;
console.log(id)
  if (id) {
  await getQuizByCategory(id, quiz.getAllQuiz);
  }
  // if (id) {
  //   let paramsArray = [];

  //   if (Array.isArray(id)) {
  //     // Jeśli `cat_id` jest tablicą
  //     id.forEach((el) => {
  //       const data = `filters[category_id][$in][${el}]=${el}`;
  //       paramsArray.push(data);
  //     });
  //   } else {
  //     // Jeśli `cat_id` jest pojedynczym stringiem
  //     const data = `filters[category_id][$in][${id}]=${id}`;
  //     paramsArray.push(data);
  //   }

  //   paramsCategory.value = paramsArray.join("&");
  //   // console.log(paramsCategory.value);

  //   // Przekazujemy paramsCategory do quiz.getAllQuiz
  //   await quiz.getAllQuiz(13, 1, paramsCategory.value);
  // }
});




// const filters = async (params: any) => {
//   const test = ref(''); // Zainicjuj ref jako pusty ciąg znaków
//   if (params) {
//     let paramsArray: string[] = [];
//     if (Array.isArray(params)) {
//       params.forEach((el: any) => {
//         const dataString = `filters[category_id][$in][${el}]=${el}`;
//         paramsArray.push(dataString);
//       });
//     }
//     test.value = paramsArray.join("&");
 
//     // await quiz.getAllQuiz(12, 1, test.value );
//     await quiz.getAllQuiz(13, 1, params );

//   }
// };
// onMounted(() => {

//   filters(2)
// })

const view = ref();
onMounted(() => {
  const checkEmitsData = () => {
    view.value = view.value || localStorage.getItem("listView");
  };
  checkEmitsData();
});
const quizView = (value: string) => {
  view.value = value;
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
.margin {
  margin-top: 440px;
}
.open-filter {
  color: white;
  background-color: #618cfb;
  padding: 8px 6px 8px 9px;
  border: 1px solid transparent;
  border-radius: 14px 0px 0px 14px;
}

.vl {
  border-left: 1px solid rgb(156 163 175);
  margin-top: 4px;
  margin-bottom: 4px;
}
</style>
