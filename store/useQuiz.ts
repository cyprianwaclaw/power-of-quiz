import { difficulty } from './../utils/filterSearch';
import { defineStore } from 'pinia'
import {STORAGE} from '@/utils/hooks'
import { Quiz } from '@/types'
import { axiosInstance, axiosData } from '~~/utils/axios.config'
import { v4 as uuidv4 } from 'uuid';

export type CartPreview = {
    id: number
    image: string
    title: string
    quantity: number
    cost: number
}

export type  SingleQuizQuestion = {
    id: number,
    quiz_id: number,
    question: string
}

export type  SingleAnswer = {
    id: number,
    quiz_id: number,
    question: string
    correct_answer_id: number
}

export const useQuiz = defineStore('quiz', {

    state: () => ({
        fastTwo: [],
        activeQuiz: [],
        allQuestion: [],
        answerById: [],
        allQuiz: [],
        allQuiz1: [],
        allQuizNew: [],
        notActiveQuiz: [] as any,
        categories: [],
        answerForSingleQuiz: [],
        singleQuiz: {} as Quiz,
        quizForYou: {} as any,
        quizLatest: {} as any,
        startQuiz: null,
        correctAnswer: [],
        answer: null,
        nextQuestion: {} as any,
        getNextQuestion1: [] as any,
        newQuizId:{} as number,
        newQuestionId:{} as any,
        new:{} as string,
        allQuizName:[],
        searchText: [] as any,
        popularQuiz: {} as any,
        test1: [] as any [],
        loadingQuiz: false as boolean,
        contents: JSON.parse(localStorage.getItem(STORAGE) as string) ?? {}

    }),
    getters: {
        count(): number {
            return Object.keys(this.contents).reduce((acc, id) => {
                return acc + this.contents[id].quantity
            }, 0)
        },

        formattedCart(): CartPreview[] {  
            return Object.keys(this.contents).map(productId => {
              const purchase = this.contents[productId]
              return {
                id: purchase.productId,
                image: 'test',
                title: purchase.productId,
                quantity: 1,
                cost: 1
              }
            })
        }
    },
    actions: {
        add(productId: any) {
                this.contents[uuidv4()] = {
                    productId,
            }
        },
        async getFastTwo() {
            try {
                const res = await axiosInstance.get('/quizzes/fast-two')
                this.fastTwo = await res.data
            } catch (e) {
                console.error(e)
            }
        },

        async getActiveQuiz() {
            try {
                this.loadingQuiz= true
                const res = await axiosInstance.get("/quizzes?per_page=9999999")
                this.activeQuiz = await res.data.data.data
                this.loadingQuiz= false
            } catch (e) {
                console.error(e)
            }
        },
        async getPopularQuiz() {
            try {
                this.loadingQuiz = true
                const res = await axiosInstance.get("/quizzes/popular?per_page=10")
                this.popularQuiz = await res.data.data.data
                this.loadingQuiz = false
            } catch (e) {
                console.error(e)
            }
        },
        async getLatestQuiz() {
            try {
                this.loadingQuiz = true
                const res = await axiosInstance.get("/quizzes/latest?per_page=10")
                this.quizLatest = await res.data.data.data
                this.loadingQuiz = false
            } catch (e) {
                console.error(e)
            }
        },
        async getNotActiveQuiz() {
            try {
                this.loadingQuiz= true
                const res = await axiosInstance.get('/quizzes/all?per_page=23')
                this.notActiveQuiz = await res.data.data.data
                this.loadingQuiz= false
            } catch (e) {
                console.error(e)
            }
        },
        async getAllQuiz(perPage:any, difficulty:any, time:any) {
            try {
                this.loadingQuiz= true
                const res = await axiosInstance.get(`/quizzes?${difficulty}&${time}`)
                // const res = await axiosInstance.get(`/quizzes?sort[0]=time,desc&sort[1]=difficulty,desc`)
                this.allQuiz = await res.data.data.data
                this.loadingQuiz= false
            } catch (e) {
                console.error(e)
            }
        },
        async getAllQuiz1() {
            try {
                this.loadingQuiz= true
                const res = await axiosInstance.get("/quizzes?sort[1]=difficulty,desc&time=34")
                // const res = await axiosInstance.get(`/quizzes?sort[0]=time,desc&sort[1]=difficulty,desc`)
                this.allQuiz1 = await res.data
                this.loadingQuiz= false
            } catch (e) {
                console.error(e)
            }
        },
        async getAllQuizNew(perPage:number, category:number, difficulty: string, ) {
            try {
                this.loadingQuiz= true
                const res = await axiosInstance.get(
                    '/quizzes?difficulty=easy'
                )
                this.allQuizNew = await res.data.data.data
                this.loadingQuiz= false
            } catch (e) {
                console.error(e)
            }
        },
        async  getQuizForYou() {
            try {
                this.loadingQuiz= true
                const res = await axiosInstance.get('/quizzes/for-you?per_page=23')
                this.quizForYou = await res.data.data.data
                this.loadingQuiz= false
            } catch (e) {
                console.error(e)
            }
        },
        async getAllName() {
            try {
                const res = await axiosInstance.get('/quizzes?per_page=9999999')
                this.allQuizName = await res.data.data.data
            } catch (e) {
                console.error(e)
            }
        },
        async getCategory() {
            const res = await axiosInstance.get('/categories')
            try {
                this.categories = await res.data.data
            } catch (e) {
                console.error(e)
            }
        },
        async getSingleQuiz(id: any) {
            try {
                const res = await axiosInstance.get(`/quizzes/${id}`)
                this.singleQuiz = await res.data.data
            } catch (e) {
                console.error(e)
            }
        },
        async deleteSingleQuiz(id: any) {
            try {
                const res = await axiosInstance.delete(`/quizzes/${id}`)
                // this.singleQuiz = await res.data.data
            } catch (e) {
                console.error(e)
            }
        },
        async getQuestion(id:any) {
            try {
                const res = await axiosInstance.get(`/quizzes/${id}/questions`)
                this.allQuestion = await res.data.data
            } catch (e) {
                console.error(e)
            }
        },
        async getAnswer(id:any) {
            try {
                const res = await axiosInstance.get(`/answers/${id}/question`)
                this.answerForSingleQuiz = await res.data.data
            } catch (e) {
                console.error(e)
            }
        },
        async getAnswerById(id:any) {
            try {
                const res = await axiosInstance.get(`/questions/${id}/answers`)
                this.answerById = await res.data.data
            } catch (e) {
                console.error(e)
            }
        },
        // async getDeactivateQuiz(){
        //     try{
        //         const res = await axiosInstance.get('/quiz/100/deactivate')
        //         this.deactivateQuiz = res.data
        //     }catch(e){
        //         console.log(e)
        //     }
        // },

        //! granie w quizy 
        async startingQuiz(id: any) {
            try {
                const res = await axiosInstance.get(`/quiz/${id}/start`)
                this.startQuiz = await res.data.data
            } catch (e) {
                console.error(e)
            }
        },
        async postAnswerNextQuestion(quiz_submission: any, question_id: any, answer_id: any) {
            try {
                const res = await axiosInstance.post(`/quiz/submission/${quiz_submission}/answerQuestion`, 
                { question_id, answer_id })
                this.nextQuestion = await res.data.data
            } catch (e) {
                console.error(e)
            }
        },
        async getNextQuestion(quiz_submission: any) {
            try {
                const res = await axiosInstance.get(`/quiz/submission/${quiz_submission}/getNextQuestion`)
                this.getNextQuestion1 = await res.data.data
            } catch (e) {
                console.error(e)
            }
        },

        //! odpowiedzi i pytanie do pojedyńczego quizu 
        async correctAnswerId(id_question: any) {
            try {
                const res = await axiosInstance.get(`/questions/${id_question}`)
                this.correctAnswer = await res.data.data
            } catch (e) {
                console.error(e)
            }
        },
        async cAnswer(question: any) {
            try {
                const res = await axiosInstance.get(`/questions/${question}/answers `)
                this.answer = await res.data.data
            } catch (e) {
                console.error(e)
            }
        },

        //! dodawanie nowego quizu 
        async postNewQuiz(title:string, time:number, category_id:any, difficulty:string,description: string, image:any) {
            try {
                const res = await axiosData.post('/quizzes',{title, time, category_id, difficulty,description, image})
                this.newQuizId = await res.data.data.id
            } catch (e) {
            }
        },
        async postNewQuestion(question:any, quiz_id:number) {
            try {
                const res = await axiosInstance.post('/questions',{question, quiz_id})
                this.newQuestionId = await res.data.data.id
            } catch (e) {
                console.error(e)
            }
        },
        async postNewAnswer(answer:any, question_id:any, correct:boolean) {
            try {
                const res = await axiosInstance.post('/answers',{answer, question_id, correct})
                this.new = await res.data
            } catch (e) {
                console.error(e)
            }
        },
         //! aktualizacja pojedyńczego quizu 
         async updateQuiz(id: any, title:string, category_id:number,description: string) {
            try {
                const res = await axiosInstance.patch(`/quizzes/${id}`,{title, category_id,description})
            } catch (e) {
            }
        },
        //  async updateQuiz(id:any, title:string, time:number, category_id:number, difficulty:string,description: string, image:any) {
        //     try {
        //         const res = await axiosData.patch(`/quizzes/${id}`,{title, time, category_id, difficulty,description, image})
        //         // this.newQuizId = await res.data.data.id
        //     } catch (e) {
        //     }
        // },
        async updateQuestion(id: any, question:any) {
            try {
                const res = await axiosInstance.put(`/questions/${id}`, {question})
            } catch (e) {
            }
        },
        async updateAnswer(id:any, question_id:any, answer:any, correct:any) {
            try {
                const res = await axiosInstance.put(`/answers/${id}`,{ question_id, answer, correct })
            } catch (e) {
            }
        },

        //!Usuwania pytania
        //usuwanie odpowiedzi do danego pytania
        async deleteQuestionAnswer(id:any){
            try{
                await axiosInstance.delete(`/questions/${id}/answers`)
            } catch (e) {
                console.log(e)
            }
        },
        async deleteQuestion(id:any){
            try{
                await axiosInstance.delete(`/questions/${id}`)
            } catch (e) {
                console.log(e)
            }
        }
    }

})