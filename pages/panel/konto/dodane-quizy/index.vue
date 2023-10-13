<template>
  <!-- <ModalDown :modalActive="sorting" title="Sortowanie" @close="sortingShow()">
    <template #content>
      <ModalContentQuizSortingView @close="sortingClose" />
    </template>
  </ModalDown> -->
  <NuxtLayout name="my-account">
    <!-- in mobile view-->
    <h1 class="title-h1 mb-2">Twoje quizy</h1>
    <div
      class="overflow-x-scroll space-x-5 w-11/12 absolute right-0 flex py-4 whitespace-nowrap overflow-auto scrollbar-hide pr-10"
    >
      <button
        v-for="(single, index) in array"
        :key="index"
        :class="[
          router.currentRoute.value.query.p == single.params
            ? 'filter_button_active'
            : 'filter_button_disactive',
          router.currentRoute.value.query.p == null && index == 0
            ? 'filter_button_active'
            : 'filter_button_disactive',
        ]"
        @click="changePage(single.params)"
      >
        {{ single.name }}
      </button>
    </div>
    <div v-if="allQuiz.total == 0 ? false : true">
      <div v-if="isLoading">
        <p>Ładowanie...</p>
      </div>
      <div class="mt-24 mb-5" v-else>
        <div class="flex justify-between place-items-center mb-5">
          <div class="flex flex-row gap-2">
            <p class="text-[13px] text-gray-400">
              Strona {{router.currentRoute.value.query.page ? router.currentRoute.value.query.page : 1 }}/{{ allQuiz.last_page }}
            </p>
            <div class="vl"></div>
            <p class="text-[13px] text-gray-400">{{ allQuiz.total }} wyników</p>
          </div>
          <!-- <div class="flex">
            <button @click="sortingShow">Sortuj</button>
          </div> -->
        </div>
        <div class="grid grid-cols-2 gap-5 mt-4">
          <QuizMyQuizes v-for="quiz in allQuiz.data" :key="quiz" :quiz="quiz" />
        </div>
        <Pagination :last_page="allQuiz.last_page" />
      </div>
    </div>
    <div v-else class="grid place-items-center mt-24">
      <Icon name="ph:game-controller-light" size="166" color="#CFD8E0" />
      <p class="empty">Brak quizów</p>
      <NuxtLink to="/panel/quiz/dodaj-nowy">
        <p class="font-base font-semibold primary-color place-items-center">
          Dodaj nowy
          <Icon name="carbon:chevron-right" size="21" class="primary-color" />
        </p>
      </NuxtLink>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useQuiz } from "@/store/useQuiz";
import { useUser } from "@/store/useUser";
const user = useUser();
const quiz = useQuiz();
const { currentUser } = storeToRefs(user);
const { allQuiz } = storeToRefs(quiz);
await user.getUser();

const userQuiz = ref();
definePageMeta({
  middleware: "auth",
});

const router = useRouter();
const isLoading = ref(true);

const array = ref([
  { name: "Wszystkie", params: "wszystkie" },
  { name: "Do akceptacji", params: "do-akceptacji" },
  { name: "Zaakceptowane", params: "zaakceptowane" },
]);

// const sorting = ref(false);
// const sortingShow = () => {
//   sorting.value = !sorting.value;
// };
// const sortingClose = () => {
//   sorting.value = !sorting.value;
// };

const changePage = (value: string) => {
  router.push({ query: { p: value, page: 1 } });
};

onMounted(async () => {
  let page = router.currentRoute.value.query.page
    ? router.currentRoute.value.query.page
    : 1;
  if (!router.currentRoute.value.query.p) {
    await quiz.getAllQuiz1(
      15,
      `page=${page}&filters[user_id][$in][0]=${currentUser.value.id}`
    );
  } else if (router.currentRoute.value.query.p == "wszystkie") {
    await quiz.getAllQuiz1(
      15,
      `page=${page}&filters[user_id][$in][0]=${currentUser.value.id}`
    );
  } else if (router.currentRoute.value.query.p == "zaakceptowane") {
    await quiz.getAllQuiz1(
      15,
      `page=${page}&filters[user_id][$in][0]=${currentUser.value.id}&filters[is_active][$in][1]=1`
    );
  } else if (router.currentRoute.value.query.p == "do-akceptacji") {
    await quiz.getAllQuiz1(
      15,
      `page=${page}&filters[user_id][$in][0]=${currentUser.value.id}&filters[is_active][$in][1]=0`
    );
  }
  isLoading.value = false;
});

onBeforeRouteUpdate(async (to, from) => {
  let params = to.query.p;
  let page = Number(to.query.page ? to.query.page : 1);

  if (params == "wszystkie") {
    await quiz.getAllQuiz1(
      15,
      `page=${page}&filters[user_id][$in][0]=${currentUser.value.id}`
    );
  } else if (params == "zaakceptowane") {
    await quiz.getAllQuiz1(
      15,
      `page=${page}&filters[user_id][$in][0]=${currentUser.value.id}&filters[is_active][$in][1]=1`
    );
  } else if (params == "do-akceptacji") {
    await quiz.getAllQuiz1(
      15,
      `page=${page}&filters[user_id][$in][0]=${currentUser.value.id}&filters[is_active][$in][1]=0`
    );
  } else {
    await quiz.getAllQuiz1(
      15,
      `page=${page}&filters[user_id][$in][0]=${currentUser.value.id}`
    );
  }
});
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";

.invite-text {
  font-style: normal;
  font-weight: 800;
  font-size: 38px;
  color: #cfd8e0;
}
.empty{
  margin-top: 12px;
  margin-bottom: 12px;
  color: #cfd8e0;
  font-size: 38px;
  font-weight: 800;
}
.vl {
  border-left: 1px solid rgb(156 163 175);
  margin-top: 4px;
  margin-bottom: 4px;
}
</style>
