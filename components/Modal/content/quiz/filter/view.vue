<template>
  <div class="overflow-y-scroll h-[275px] right-8 left-8 pr-4">
    <p class="mb-2 text-lg font-bold">Poziom trudności</p>
    <div v-for="(level, index) in difficulty" :key="index">
      <label class="flex w-full mt-2">
        <input
          class="w-5 flex mb-[4px]"
          type="checkbox"
          v-model="level.selected"
          @change="handleChangeLevel(difficulty)"
        />
        <p class="w-full flex ml-2">{{ level.name }}</p>
      </label>
    </div>
    <p class="mb-2 text-lg font-bold mt-9">Kategoria</p>
    <div v-for="(category, index) in allCategories" :key="index">
        <label class="flex w-full mt-2">
          <input
            class="w-5 flex mb-[4px]"
            type="checkbox"
            v-model="category.selected"
            @change="handleChange(mapCategory)"
          />
          <p class="w-full flex ml-2">{{ category.name }}</p>
        </label>
      </div>
    <p class="mb-6 text-lg font-bold mt-9">Liczba pytań</p>
    <InputRange
    :min="1"
      :max="60"
      v-model:max-value="maxAnswersRange"
      v-model:min-value="minAnswersRange"
    />
    <p class="mb-6 text-lg font-bold mt-9">
      Czas trwania<span class="text-gray text-xs font-normal ml-[5px]">( minuty )</span>
    </p>
    <InputRange
    :min="1"
      :max="60"
      v-model:min-value="minTimeRange"
      v-model:max-value="maxTimeRange"
    />
    <div class="flex columns-2 gap-4 mt-10 mb-5">
      <button class="button-remove w-full" @click="saveChanges">Wyczyść</button>
      <button class="button-primary w-full" @click="saveChanges">Zapisz</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuiz } from "@/store/useQuiz";
import { storeToRefs } from "pinia";
const quiz = useQuiz();
const router = useRouter();
const { categories } = storeToRefs(quiz);
let category = categories.value;
const allCategories: any = ref();

const emit = defineEmits<{
  (e: "state", value: string): void;
  (e: "perPage", value: number): void;
  (e: "close"): void;
}>();


const minAnswersRange = ref(4);
const maxAnswersRange = ref(56);
const minTimeRange = ref(4);
const maxTimeRange = ref(56);
const mapCategory = ref([]) as any;





mapCategory.value = (allCategories.value = category.map((single: any) => ({
  id: single.id,
  name: single.name,
  selected: false,
})));

const params = router.currentRoute.value.query.cat_id as any;

// const selectCategoriesByParams = (params: any, mapCategory: any) => {
//   if (params) {
//     if (Array.isArray(params)) {
//       // Jeśli `cat_id` jest tablicą
//       params.forEach((param) => {
//         const test1 = Number(param);

//         mapCategory.value.forEach((single: any) => {
//           if (single.id === test1) {
//             single.selected = true;
//           }
//         });
//       });
//     } else {
//       // Jeśli `cat_id` jest pojedynczym stringiem
//       const test1 = Number(params);

//       mapCategory.value.forEach((single: any) => {
//         if (single.id === test1) {
//           single.selected = true;
//         }
//       });
//     }
//   }
// }

const toParams = ref()
  
watch(mapCategory.value, (newValue)=>{
  let selected = newValue.filter((single: any) => single.selected === true)
    toParams.value = selected.map((single: any) => single.id);
  
})







const difficulty = ref([
  { name: "Łatwy", value: "easy", selected: false },
  { name: "Średni", value: "medium", selected: false },
  { name: "Trudny", value: "hard", selected: false },
]);



const paramsDifficulty = router.currentRoute.value.query.difficulty as any;
// console.log(paramsDifficulty)

// // const selectCategoriesByParams1 = (params1: any, arry: any) => {
//   if (paramsDifficulty) {
// console.log(paramsDifficulty)
//     if (Array.isArray(paramsDifficulty)) {
//       // Jeśli `cat_id` jest tablicą
//       paramsDifficulty.forEach((param) => {
//         const test1 = param;
//         console.log(test1)
//         difficulty.value.forEach((single: any) => {
//           if (single.value === test1) {
//             single.selected = true;
//           }
//         });
//       });
//     } else {
//       // Jeśli `cat_id` jest pojedynczym stringiem
//       const test1 = paramsDifficulty;
//       console.log(test1)
      
//       difficulty.value.forEach((single: any) => {
//         if (single.value === test1) {
//           single.selected = true;
//         }
//       });
//     }
//   }
// // }

//  function selectDifficulty(difficultyList:any, paramsDifficulty:any) {
//   if (paramsDifficulty) {
//     console.log(paramsDifficulty);
//     if (Array.isArray(paramsDifficulty)) {
//       // Jeśli `paramsDifficulty` jest tablicą
//       paramsDifficulty.forEach((param) => {
//         const test1 = param;
//         console.log(test1);
//         difficultyList.value.forEach((single:any) => {
//           if (single.value === test1) {
//             single.selected = true;
//           }
//         });
//       });
//     } else {
//       // Jeśli `paramsDifficulty` jest pojedynczym stringiem
//       const test1 = paramsDifficulty;
//       console.log(test1);

//       difficultyList.value.forEach((single:any) => {
//         if (single.value === test1) {
//           single.selected = true;
//         }
//       });
//     }
//   }
// }


const toParamsDifficulty = ref()

watch(difficulty.value, (newValue)=>{
let selected = newValue.filter((single: any) => single.selected === true)
toParamsDifficulty.value = selected.map((single: any) => single.value);
// console.log(toParamsDifficulty.value)
})




function selectItemsByParams(itemsList: any, params: any) {
  if (params) {
    if (Array.isArray(params)) {
      params.forEach((param) => {
        itemsList.value.forEach((item: any) => {
          if (item.value === param || item.id === Number(param)) {
            item.selected = true;
          }
        });
      });
    } else {
      const paramValue = Array.isArray(params) ? params[0] : params;

      itemsList.value.forEach((item: any) => {
        if (item.value === paramValue || item.id === Number(paramValue)) {
          item.selected = true;
        }
      });
    }
  }
}




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

// console.log(toParams.value)
// data.push(toParamsDifficulty.value )
// console.log(data)

  const check1 = () => {
  if (toParams.value && toParamsDifficulty.value) {
    return { cat_id: toParams.value, difficulty: toParamsDifficulty.value };
  } else if (toParams.value) {
    return { cat_id: toParams.value };
  } else if (toParamsDifficulty.value) {
    return { difficulty: toParamsDifficulty.value };
  } else {
    return {};
  }
};
// Use the check function to determine the query parameters
router.push({ query: check1() });

 emit("close");

}


onMounted(() => {

  selectItemsByParams(mapCategory, params)
  selectItemsByParams(difficulty, paramsDifficulty)


  // selectCategoriesByParams(params, mapCategory);
  // selectCategoriesByParams1(paramsDifficulty, difficulty) 

  // selectDifficulty(difficulty, paramsDifficulty);

  // !to działa okej
//   if (paramsDifficulty) {
// console.log(paramsDifficulty)
//     if (Array.isArray(paramsDifficulty)) {
//       // Jeśli `cat_id` jest tablicą
//       paramsDifficulty.forEach((param) => {
//         const test1 = param;
//         console.log(test1)
//         difficulty.value.forEach((single: any) => {
//           if (single.value === test1) {
//             single.selected = true;
//           }
//         });
//       });
//     } else {
//       // Jeśli `cat_id` jest pojedynczym stringiem
//       const test1 = paramsDifficulty;
//       console.log(test1)
      
//       difficulty.value.forEach((single: any) => {
//         if (single.value === test1) {
//           single.selected = true;
//         }
//       });
//     }
//   }

})
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
.button-remove {
  padding: 10px 23px;
  border: 1px solid $color-error;
  font-family: "Manrope", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  color: $color-error;
  line-height: 22px;
  letter-spacing: 0.05em;
  display: block;
  border-radius: 8px;
}
</style>
