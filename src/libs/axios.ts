import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  params: {
    apikey: process.env.NEXT_PUBLIC_API_KEY,
  },
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})
