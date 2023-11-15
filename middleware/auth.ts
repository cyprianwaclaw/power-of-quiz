import { storeToRefs } from "pinia";
import { useAuth } from "@/store/useAuth";

export default defineNuxtRouteMiddleware(async(to, from) => {
    const authState = useAuth()
    const { loggedIn, user, error } = storeToRefs(authState)
    await authState.getUser()
    let userLogin = loggedIn.value
    let someError = error.value
    if (!userLogin) {
        return navigateTo('/logowanie')
    }
    if (someError.length>0) {
        return navigateTo('/potwierdz-email')
    }

})
