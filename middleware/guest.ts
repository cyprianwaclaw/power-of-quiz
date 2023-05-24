import { storeToRefs } from "pinia";
import { useAuth } from "@/store/useAuth";

export default defineNuxtRouteMiddleware((to, from) => {
  const authState = useAuth()
  const { loggedIn } = storeToRefs(authState)
  let user = loggedIn.value
  if (user) {
    return navigateTo('/panel')
  }

})
