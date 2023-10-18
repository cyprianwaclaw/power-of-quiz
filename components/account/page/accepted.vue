<template>
  <div class="flex w-full flex-col">
    <p class="text-3xl font-semibold mb-5">Aktywne quizy</p>
    <div v-if="allQuiz?.data?.length">
      <p class="text-[15px] text-gray-500 mb-2">
        Strona
        {{
          router.currentRoute.value.query.page ? router.currentRoute.value.query.page : 1
        }}/{{ allQuiz.last_page }}
      </p>
      <div class="grid grid-cols-3 gap-6 w-full">
        <QuizDesktopCard v-for="quiz in allQuiz.data" :key="quiz" :quiz="quiz" />
      </div>
      <div class="flex justify-end">
        <Pagination :last_page="allQuiz.last_page" />
      </div>
    </div>
    <div v-else class="grid place-items-center my-10">
      <Icon name="ph:game-controller-light" size="166" color="#CFD8E0" />
      <p class="empty">Brak quizów</p>
      <NuxtLink to="/panel/quiz/dodaj-nowy">
        <p class="font-base font-semibold primary-color place-items-center">
          Dodaj nowy
          <Icon name="carbon:chevron-right" size="21" class="primary-color" />
        </p>
      </NuxtLink>
    </div>
  </div>
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
const router = useRouter();

const userQuiz = ref();
definePageMeta({
  middleware: "auth",
});

onMounted(async () => {
  let page = router.currentRoute.value.query.page
    ? router.currentRoute.value.query.page
    : 1;
  await quiz.getAllQuiz1(
    15,
    `page=${page}&filters[user_id][$in][0]=${currentUser.value.id}&filters[is_active][$in][1]=1`
  );
});

onBeforeRouteUpdate(async (to, from) => {
  let page = Number(to.query.page ? to.query.page : 1);
  await quiz.getAllQuiz1(
    15,
    `page=${page}&filters[user_id][$in][0]=${currentUser.value.id}&filters[is_active][$in][1]=1`
  );
});
</script>

<style scoped lang="scss">
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
