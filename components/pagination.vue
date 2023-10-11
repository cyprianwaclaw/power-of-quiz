<template>
  <div>
    <!-- {{ route.query.page ? route.query.page : 1}} -->
    <div class="flex justify-center mt-12" v-if="props.last_page != 1">
      <button v-if="currentPage != 1" @click="changePage(1)" class="mr-2">
        <Icon name="ph:caret-double-left" size="26" class="-mt-1" />
      </button>
      <div
        v-for="(page, index) in pageNumbers(props.last_page, currentPage)"
        :key="index"
      >
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
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const props = defineProps({
  last_page: {
    type: Object,
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
  // scrollToTop();
  // const routeParams = { ...router.currentRoute.value.query };
  // const updatedQueryParams = { ...routeParams, page: pageNumber };

  // const check1 = () => {
  //   if (routeParams) {
  //     return updatedQueryParams;
  //   } else {
  //     return { page: pageNumber };
  //   }
  // };

  const addParams = () => {
    return { ...router.currentRoute.value.query, page: pageNumber };
  };

  router.push({ query: addParams() });
  // currentPage.value = pageNumber;
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
.active {
  color: white;
  background-color: #618cfb;
  border-radius: 4px;
  margin-right: 7px;
  margin-left: 7px;
}
</style>
