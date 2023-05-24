<template>
  <div>
    {{ selectedItems }}
    <div>
      <h2>Czas</h2>
      <div v-for="(option, index) in timeOptions" :key="index">
        <input type="checkbox" :checked="option.selected" @change="selectOption(index, 'time')">
        <label>{{ option.name }}</label>
      </div>
    </div>
    <div>
      <h2>Trudność</h2>
      <div v-for="(option, index) in difficultyOptions" :key="index">
        <input type="checkbox" :checked="option.selected" @change="selectOption(index, 'difficulty')">
        <label>{{ option.name }}</label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const data = ref([
  { name: "Czas rosnąco", value: "medium", selected: false, api: "sort[0]=time,desc", category: "time" },
  { name: "Czas malejąco", value: "medium", selected: false, api: "sort[0]=time,asc", category: "time" },
  { name: "Trudność łatwe", value: "easy", selected: false, des: "( łatwe, trudne )", category: "difficulty" },
  { name: "Trudność trudne", value: "hard", selected: false, des: "( trudne, łatwe )", category: "difficulty" },
]);

const timeOptions = computed(() => {
  return data.value.filter(option => option.category === 'time');
});

const difficultyOptions = computed(() => {
  return data.value.filter(option => option.category === 'difficulty');
});

onMounted(() => {
  const selectedOptions = JSON.parse(localStorage.getItem('selectedOptions'));
  if (selectedOptions) {
    data.value.forEach((option, index) => {
      option.selected = selectedOptions[index];
    });
  }
});

function selectOption(index, category) {
  const categoryOptions = category === 'time' ? timeOptions : difficultyOptions;
  const selectedOption = categoryOptions.value[index];
  selectedOption.selected = !selectedOption.selected;
  
  // unselect all other options in the same category
  categoryOptions.value.forEach((option, i) => {
    if (i !== index) {
      option.selected = false;
    }
  });
  
  const selectedOptions = data.value.map(option => option.selected);
  localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
}
const selectedItems = computed(() => {
  return data.value.filter(item => item.selected);
});

watch(selectedItems, (newValue, oldValue) => {
  console.log(newValue);
});
</script>

//! OPIS //
<!-- W kodzie, który podałeś, jest komponent Vue, który wyświetla listę opcji sortowania dla nieokreślonej listy elementów. Każda opcja ma nazwę, wartość, informacje o tym, czy jest zaznaczona, informacje o kategorii i opcjonalne informacje opisujące.

Wykorzystuje on bibliotekę Vue, a konkretnie funkcje ref, computed, onMounted i watch. Funkcja ref służy do tworzenia reaktywnych zmiennych, a computed służy do tworzenia zmiennych, które automatycznie obliczają swoją wartość na podstawie innych zmiennych.

Funkcja onMounted jest hookiem cyklu życia, który uruchamia kod, gdy komponent jest zamontowany na stronie, natomiast watch służy do obserwowania zmian w wartościach reaktywnych zmiennych.

Początkowo jest tworzona reaktywna zmienna "data", która zawiera tablicę z opcjami sortowania. Następnie, dzięki funkcji computed, tworzone są dwie zmienne - "timeOptions" i "difficultyOptions", które filtrują "data" na podstawie kategorii.

Funkcja onMounted jest wykorzystywana do pobrania wybranych opcji zapisanych w pamięci lokalnej i ustawienia ich jako zaznaczonych.

Funkcja "selectOption" jest wywoływana, gdy użytkownik zaznacza lub odznacza opcję. Funkcja ta zmienia stan wybranej opcji, odznacza pozostałe opcje w tej samej kategorii i zapisuje zmieniony stan do pamięci lokalnej.

Na końcu jest tworzona reaktywna zmienna "selectedItems", która używa funkcji filter do wybrania tylko zaznaczonych opcji. Ta zmienna jest obserwowana za pomocą funkcji watch, co oznacza, że kod wewnątrz funkcji watch zostanie wykonany, gdy zmieni się wartość tej zmiennej. W tym przypadku, kiedy użytkownik zaznacza lub odznacza opcje, wartość "selectedItems" się zmienia, a kod w funkcji watch wywołuje console.log z nową wartością "selectedItems". -->
