<template>
  <div class="demo">
    <button
      v-for="(tab, index) in tabs"
      :key="index"
      :class="['tab-button', { active: currentIndex === index }]"
      @click="currentTab(index)"
    >
      {{ tab }}
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
watch(route, (to, from) => {
  const newTabIndex = getTabIndexFromParam(to.query.tab);
  if (newTabIndex !== null && newTabIndex !== currentIndex.value) {
    currentIndex.value = newTabIndex;
    isLoading.value = true;
  }
});

// Obserwujemy zmiany w currentIndex i aktualizujemy currentComponent na podstawie wybranej wartości
watch(currentIndex, (newValue, oldValue) => {
  currentComponent.value = dynamicComponents[newValue];
  isLoading.value = false;
});
</script>
