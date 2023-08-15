<!-- <template>
  <div class="demo">
    <button
      v-for="(tab, index) in tabs"
      :key="index"
      :class="['tab-button', { active: currentIndex === index }]"
      @click="currentTab(index)"
    >
      {{ tab.toUpperCase() }}
    </button>
    <component :is="currentComponent" class="tab" v-if="!isLoading" />
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent, markRaw, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Tworzymy dynamiczne komponenty za pomocą defineAsyncComponent i ścieżek do komponentów
const dynamicComponents = [
  markRaw(defineAsyncComponent(() => import('@/components/home.vue'))),
  markRaw(defineAsyncComponent(() => import('@/components/posts.vue'))),
  markRaw(defineAsyncComponent(() => import('@/components/archive.vue'))),
];

// Obiekt z mapowaniem indeksów na odpowiadające komponenty
const tabs = ['home', 'posts', 'archive'];

const router = useRouter();
const route = useRoute();
const currentIndex = ref(getTabIndexFromParam(route.query.tab) || 0);

function getTabIndexFromParam(tabParam) {
  const index = tabs.indexOf(tabParam);
  return index !== -1 ? index : null;
}

function getTabParamFromIndex(index) {
  return index >= 0 && index < tabs.length ? tabs[index] : null;
}

// Reaktywne odniesienie do aktualnie wybranego komponentu
const currentComponent = ref(dynamicComponents[currentIndex.value]);

// Reaktywne odniesienie do stanu ładowania
const isLoading = ref(false);

const currentTab = (index) => {
  const tabParam = getTabParamFromIndex(index);
  if (tabParam) {
    router.push({ query: { tab: tabParam } });
  }
};




// Obserwujemy zmiany w route.query.tab i reagujemy na każdą zmianę
// Obserwujemy zmiany w route.query.tab i reagujemy na każdą zmianę
watch(route, (to, from) => {
  const newTabIndex = getTabIndexFromParam(to.query.tab);
  if (newTabIndex !== null && newTabIndex !== currentIndex.value) {
    isLoading.value = true;
    currentIndex.value = newTabIndex;
    // setTimeout(() => {
    //   currentIndex.value = newTabIndex;
    // }, 1000); // Opóźnienie ładowania komponentu (1 sekunda)
  }
});

// Obserwujemy zmiany w currentIndex i aktualizujemy currentComponent na podstawie wybranej wartości
watch(currentIndex, (newValue, oldValue) => {
  currentComponent.value = dynamicComponents[newValue];
  isLoading.value = false;
});
</script> -->
<template>
  <div class="demo">
    <button
      v-for="(tab, index) in tabs"
      :key="index"
      :class="['tab-button', { active: currentIndex === index }]"
      @click="currentTab(index)"
    >
      {{ tab.title.toUpperCase() }}
    </button>
    <div v-if="currentTabPages">
      <button
        v-for="(page, pageIndex) in currentTabPages.pages"
        :key="pageIndex"
        class="subtab-button"
        @click="currentSubTab(pageIndex)"
      >
        {{ page.name }}
      </button>
      <component :is="currentSubTabComponent" class="tab" v-if="!isLoading" />
    </div>
    <div v-else>
      Select a tab.
    </div>
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent, markRaw, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Tworzymy dynamiczne komponenty za pomocą defineAsyncComponent i ścieżek do komponentów
const dynamicComponents = [
  markRaw(defineAsyncComponent(() => import('@/components/home.vue'))),
  markRaw(defineAsyncComponent(() => import('@/components/posts.vue'))),
  markRaw(defineAsyncComponent(() => import('@/components/archive.vue'))),
  // Dodaj inne komponenty tutaj
];

const tabs = [
  {
    title: 'home',
    pages: [
      { id: 1, name: 'home1', component: dynamicComponents[0] },
      { id: 2, name: 'home2', component: dynamicComponents[1] },
    ],
  },
  {
    title: 'posts',
    pages: [
      { id: 1, name: 'posts1', component: dynamicComponents[2] },
      { id: 2, name: 'posts2', component: dynamicComponents[3] },
    ],
  },
  {
    title: 'archive',
    pages: [],
  },
  // Dodaj inne zakładki tutaj
];

const router = useRouter();
const route = useRoute();
const currentIndex = ref(getTabIndexFromParam(route.query.tab) || 0);
const currentSubTabIndex = ref(0);

function getTabIndexFromParam(tabParam) {
  const index = tabs.findIndex(tab => tab.title === tabParam);
  return index !== -1 ? index : null;
}

// Reaktywne odniesienie do aktualnie wybranego komponentu
const currentComponent = ref(dynamicComponents[currentIndex.value]);

// Reaktywne odniesienie do aktualnie wybranego podkomponentu
const currentSubTabComponent = ref(dynamicComponents[currentIndex.value]);

// Reaktywne odniesienie do aktualnych podstron wybranej zakładki
const currentTabPages = ref(tabs[currentIndex.value]);

// Reaktywne odniesienie do stanu ładowania
const isLoading = ref(false);

const currentTab = (index) => {
  currentIndex.value = index;
  currentSubTabIndex.value = 0;
  currentComponent.value = dynamicComponents[index];
  currentSubTabComponent.value = dynamicComponents[index];
  currentTabPages.value = tabs[index];
};

const currentSubTab = (subTabIndex) => {
  currentSubTabIndex.value = subTabIndex;
  currentSubTabComponent.value = currentTabPages.pages[subTabIndex].component;
};

// Obserwujemy zmiany w route.query.tab i reagujemy na każdą zmianę
watch(route, (to, from) => {
  const newTabIndex = getTabIndexFromParam(to.query.tab);
  if (newTabIndex !== null && newTabIndex !== currentIndex.value) {
    isLoading.value = true;
    currentTab(newTabIndex);
  }
});

// Obserwujemy zmiany w currentIndex i aktualizujemy currentComponent na podstawie wybranej wartości
watch(currentIndex, (newValue, oldValue) => {
  currentComponent.value = dynamicComponents[newValue];
  currentSubTabComponent.value = dynamicComponents[newValue];
  currentTabPages.value = tabs[newValue];
  isLoading.value = false;
});

// Obserwujemy zmiany w currentSubTabIndex i aktualizujemy currentSubTabComponent na podstawie wybranej wartości
watch(currentSubTabIndex, (newValue, oldValue) => {
  if (currentTabPages.pages && currentTabPages.pages.length > 0) {
    currentSubTabComponent.value = currentTabPages.pages[newValue].component;
  }
});
</script>

<style>
.tab-button {
  margin: 5px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  background-color: transparent;
  outline: none;
}

.active {
  background-color: lightgray;
}

.subtab-button {
  margin: 5px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  background-color: transparent;
  outline: none;
}

.tab {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid lightgray;
}
</style>
