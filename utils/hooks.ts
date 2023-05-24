import { onUnmounted } from 'vue'
import { useQuiz } from '@/store/useQuiz'

export const STORAGE = 'STORAGE'

export const usePersistCart = () => {
   const quizStore = useQuiz()
   
   const unsub = quizStore.$subscribe(() => {
      localStorage.setItem(STORAGE, JSON.stringify(quizStore.contents))
   })

   onUnmounted(() => {
      unsub()
   })
}