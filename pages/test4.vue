<template>
  <div class="accordion">
    <div v-for="item in items" :key="item.id" class="accordion-item">
      <div class="accordion-header" @click="toggleAccordion(item.id)">
        <span class="accordion-icon" :class="{ 'accordion-icon-expanded': item.expanded }">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <!-- Ikona rozwinięcia -->
            <path v-if="item.expanded" d="M7 10l5 5 5-5z" />
            <!-- Ikona zwinięcia -->
            <path v-else d="M7 14l5-5 5 5z" />
          </svg>
        </span>
        <h2 class="accordion-title">{{ item.title }}</h2>
      </div>
      <div class="accordion-content" :class="{ 'accordion-content-expanded': item.expanded }">
        {{ item.content }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface AccordionItem {
  id: number;
  title: string;
  content: string;
  expanded: boolean;
}

const items: AccordionItem[] = ref([
  {
    id: 1,
    title: 'Pierwszy element',
    content: 'Zawartość pierwszego elementu akordeonu.',
    expanded: false,
  },
  {
    id: 2,
    title: 'Drugi element',
    content: 'Zawartość drugiego elementu akordeonu.',
    expanded: false,
  },
  // Dodaj więcej elementów według potrzeb
]);

const toggleAccordion = (itemId: number) => {
  items.value.forEach((item:any) => {
    if (item.id === itemId) {
      item.expanded = !item.expanded;
    } else {
      item.expanded = false;
    }
  });
};
</script>

<style scoped>
.accordion {
  width: 100%;
}

.accordion-item {
  margin-bottom: 1rem;
  background-color: #f0f0f0;
  border-radius: 0.5rem;
}

.accordion-header {
  display: flex;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
}

.accordion-icon {
  display: inline-flex;
  align-items: center;
  margin-right: 0.5rem;
  transition: transform 0.2s;
}

.accordion-icon-expanded {
  transform: rotate(180deg);
}

.accordion-title {
  margin: 0;
}

.accordion-content {
  padding: 1rem;
  display: none;
}

.accordion-content-expanded {
  display: block;
}
</style>
