import Axios from 'axios'
import { baseURL } from '../env'
export const api = Axios.create({
  baseURL,
  timeout: 8000
})

export const blank = Axios.create({
  baseURL: '',
  timeout: 8000
})
