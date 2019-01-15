import Axios, { AxiosError, AxiosInstance } from "axios";
import { UNAUTHORIZED } from 'http-status-codes';
import * as spinner from './spinner'


export function setup() {
  spinnerize(Axios)

  Axios.interceptors.response.use(
    undefined,
    (error: AxiosError) => {
      if (error.response && error.response.status == UNAUTHORIZED) {
        location.reload()
      }
      return Promise.reject(error)
    }
  )
}


export function spinnerize(axios: AxiosInstance) {
  axios.interceptors.request.use(config => {
    spinner.start()
    return config
  })

  axios.interceptors.response.use(
    response => {
      spinner.stop()
      return response
    },
    (error: AxiosError) => {
      spinner.stop()
      return Promise.reject(error)
    }
  )

  return axios
}