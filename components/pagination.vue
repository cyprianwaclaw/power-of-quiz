<template>
  <div class="flex justify-center mt-12" v-if="props.last_page != 1">
    <button v-if="currentPage != 1" @click="changePage(1)" class="mr-2">
      <Icon name="ph:caret-double-left" size="26" class="-mt-1" />
    </button>
    <div v-for="(page, index) in pageNumbers(props.last_page, currentPage)" :key="index">
      <p
        class="w-6 cursor-pointer text-center"
        @click="changePage(page)"
        :class="{ active: page == currentPage }"
      >
        {{ page }}
      </p>
    </div>
    <button
      v-if="currentPage != props.last_page"
      @click="changePage(props.last_page)"
      class="ml-2"
    >
      <Icon name="ph:caret-double-right" size="26" class="-mt-1" />
    </button>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const props = defineProps({
  last_page: {
    type: Number,
  },
});
const currentPage = ref(null) as any;
const pagesPerPage = 4; // Liczba stron na jednej stronie paginacji

const pageNumbers = (lastPage: number, currentPage: number) => {
  const pages = [];
  const half = Math.floor(pagesPerPage / 2);

  let startPage = currentPage - half;
  let endPage = currentPage + half;

  if (startPage < 1) {
    startPage = 1;
    endPage = pagesPerPage;
  }

  if (endPage > lastPage) {
    endPage = lastPage;
    startPage = lastPage - pagesPerPage + 1;
    if (startPage < 1) {
      startPage = 1;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
};

const changePage = (pageNumber: number) => {
  const addParams = () => {
    return { ...router.currentRoute.value.query, page: pageNumber };
  };
  router.push({ query: addParams() });
};

onMounted(() => {
  if (route.query.page) {
    currentPage.value = Number(route.query.page);
  } else {
    currentPage.value = 1;
  }
});
onBeforeRouteUpdate(async (to, from) => {
  const page = to.query.page;
  currentPage.value = Number(page);
});
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
.active {
  color: white;
  background-color: #618cfb;
  border-radius: 4px;
  margin-right: 7px;
  margin-left: 7px;
}
</style>
