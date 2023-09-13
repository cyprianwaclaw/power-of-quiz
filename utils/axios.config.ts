import axios from 'axios'

// const API_URL = 'https://quiz.bojarm.pl/api';
const API_URL = 'https://powerofquizlogin.com.pl/api'

export const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        // "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':  '*',
        // 'Access-Control-Allow-Credentials': 'true',
        Accept: "application/json",
        credentials: false,
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        
}
})

export const axiosData = axios.create({
    baseURL: API_URL,
    headers: {
        // 'Access-Control-Allow-Origin': 'https://powerofquizlogin.com.pl/api',
         'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':  '*',
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'multipart/form-data',
        Accept: "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
})

// wszystko przechodujemy w lokal Storage, dodajemy 
// tylko flagę isLoggin, czy jest zalogowabny czy nie żebyć 
// mieć dostęp do tokenu, i po tym 
// tokonie pobieramy wszystko, bez useCookies
// wszystjko w lokalnej pamięci