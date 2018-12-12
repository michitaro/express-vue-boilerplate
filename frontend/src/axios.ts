import Axios, { AxiosError } from "axios";
import { UNAUTHORIZED } from 'http-status-codes';
import * as spinner from './spinner'


const DONT_RELOAD_ON_UNAUTHORIZED = {
  './api/session': ['get'],
} as { [url: string]: string[] | undefined }


export function setup() {
  Axios.interceptors.request.use(config => {
    spinner.start()
    return config
  })

  Axios.interceptors.response.use(
    response => {
      spinner.stop()
      return response
    },
    (error: AxiosError) => {
      spinner.stop()
      if (error.response && error.response.status == UNAUTHORIZED) {
        const { url, method } = error.config
        const wh = DONT_RELOAD_ON_UNAUTHORIZED
        if (!(url && method && wh[url] && wh[url]!.indexOf(method) >= 0)) {
          location.reload()
        }
      }
      return Promise.reject(error)
    }
  )
}