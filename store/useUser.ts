import { defineStore } from 'pinia'
import { axiosInstance } from '~~/utils/axios.config'
import { Financial, Company, Personal, User } from '@/types'

export const useUser = defineStore('user', {
    state: () => ({
        currentUser: {} as User,
        invitationToken: [],
        correctAnswers: {} as number,
        inCorrectAnswers: {} as number,
        invitedUser: [],
        allUser: [],
        payouts: [] as any,
        invoices: [] as any,
        payments: [] as any,
        invitedCount: {} as number,
        getPersonal: {} as Personal,
        getCompany: {} as Company,
        getFinancial: {} as Financial,
        success: {} as boolean,
        errorMessage: {} as string,
        hasPremium: {} as boolean,
    }),

    actions: {
        async getUser() {
            try {
                const res = await axiosInstance.get('/users/current')
                this.currentUser = await res.data.user
            } catch { }
        },
        async getUserPremium() {
            try {
                // zwraca true jeśli ma lub false gdy nie ma Premium
                const res = await axiosInstance.get('/user/hasPremium')
                this.hasPremium = await res.data
            } catch { }
        },
        async getInvitationToken() {
            try {
                const res = await axiosInstance.get('/user/getInvitationToken')
                this.invitationToken = await res.data.invitationToken
            } catch { }
        },
        async getUserStats() {
            try {
                const res = await axiosInstance.get('/user/stats')
                this.inCorrectAnswers = await res.data.data.incorrect_answers
                this.correctAnswers = await res.data.data.correct_answers
            } catch { }
        },
        async getInvitedUser() {
            const res = await axiosInstance.get('/user/getInvitedUsers')
            try {
                this.allUser = await res.data.data
                this.invitedUser = await res.data.success
                this.invitedCount = await res.data.count
            } catch { }
        },
        async getSettingsUser() {
            try {
                const res = await axiosInstance.get('/user/settings')
                this.getPersonal = await res.data.personal
                this.getFinancial = await res.data.financial
                this.getCompany = await res.data.company
            } catch { }
        },
        async updateUserPersonal(name: string, surname: string, email: string, phone: any) {
            try {
                const res = await axiosInstance.post('/user/settings',{name, surname, email, phone})
                this.success = await res.data.success
                // this.success = await res.data
            }  catch(error:any) {
                this.errorMessage = error.response.data
            }
        }, 
        async updateUserFinancial(iban:string, bank_name:string, swift:string) {
            try {
                const res = await axiosInstance.post('/user/settings',{iban, bank_name, swift})
                this.success = await res.data.success
            }  catch(error:any) {
                this.errorMessage = error.response.data
            }
        }, 
        async updateUserCompany(company_name:any, nip:any, regon:any,  city: string, postcode: string, street: string, building_number: any, house_number:any) {
            try {
                const res = await axiosInstance.post('/user/settings',{company_name, nip, regon,city, postcode, street, building_number, house_number })
                this.success = await res.data.success
            }  catch (error:any) {
                this.errorMessage = error.response.data
            }
        },
        async getPayoutsObject(user_id:any) {
            try {
                const res = await axiosInstance.get(`/payouts/${user_id}`)
                this.payouts = await res.data.data
            }  catch (error:any) {
                this.errorMessage = error.response.data
            }
        },
        async getPaymentsObject() {
            try {
                const res = await axiosInstance.get('/payments')
                this.payments = await res.data
            }  catch (error:any) {
                this.errorMessage = error.response.data
            }
        },        
        async getUserInvoices() {
            try {
                const res = await axiosInstance.get('/plans')
                this.invoices = await res.data
            }  catch (error:any) {
                this.errorMessage = error.response.data
            }
        },
    }
})