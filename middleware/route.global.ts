export default defineNuxtRouteMiddleware((to, from) => {
  useNuxtApp().hook("page:finish", () => {
    if (history.state.scroll) {
      setTimeout(() => window.scrollTo(history.state.scroll), 0);
    } else {
      setTimeout(() => window.scrollTo(0, 0), 0);
    }
  });

  let storge: any = ref(localStorage.getItem('listView'))
  const checkListView = () => {
    storge = localStorage.getItem('listView')
    if (!storge) {
      localStorage.setItem('listView', 'two')
    }
  }
  checkListView()

  let storge1: any = ref(localStorage.getItem("perPage"))
  const checkListView1 = () => {
    storge1 =localStorage.getItem("perPage")
    if (!storge1) {
      localStorage.setItem('perPage', '24')
    }
  }
  checkListView1()

  let storge2: any = ref(localStorage.getItem("optionSort"))
  let sorting = [ { name: "Czas rosnąco", value: "medium", selected: false},
  { name: "Czas malejąco", value: "medium", selected: false },
  { name: "Trudność", value: "easy", selected: false, des: "( łatwe, trudne )" },
  { name: "Trudność", value: "easy", selected: false, des: "( trudne, łatwe )" }
]
  const checkListView2 = () => {
    storge2 =localStorage.getItem("optionSort")
    if (!storge2) {
      localStorage.setItem('optionSort', JSON.stringify(sorting))
    }
  }
  checkListView2()

})