import { axiosInstance } from '~~/utils/axios.config'
import { defineStore } from 'pinia'

export const useAuth = defineStore('auth', {
    state: () => ({
        loggedIn: localStorage.getItem("access_token") ? true : false,
        user: [] as any,
        error: {} as any,
        access_token: [] as any
    }),

    actions: {
        async loginUser(email: string, password: string) {
            try {
                const res = await axiosInstance.post('/login', {email, password})
                this.access_token = await res.data.access_token
                localStorage.setItem("access_token", this.access_token)
                await useRouter().push('/panel')
                window.location.reload();
            } catch (error:any) {
                this.error = error.response.data.message
            }
        },
        async getUser() {
            try {
                const res = await axiosInstance.get('/users/current')
                this.user = await res.data.user
            } catch (error: any) {
                this.error = error.response.data.message
            }
        },
        async registerUser(name:any, invitation:any, email:any, password:any, password_confirmation:any) {
            try {
                // const res = await axiosInstance.post('/register', {values})
                const res = await axiosInstance.post('/register', {name, invitation, email, password, password_confirmation})

                this.access_token = await res.data.access_token
                localStorage.setItem("access_token", this.access_token)
                await useRouter().push('/panel')
                window.location.reload();
            } catch (error:any) {
                this.error = error.response.data.message
            }
        },
        async logout() {
            // localStorage.revomeItem("access_token", this.access_token)
            await useRouter().push('/logowanie')
            localStorage.clear()
            this.$reset();
            window.location.reload();
            this.loggedIn = false;
        },
    },
})