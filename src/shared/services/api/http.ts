import type { AxiosResponse } from 'axios'
import type { Request } from '../types'
import axios from 'axios'

function makeRequest<T = any>({ url = '/', method = 'get', data, params, headers }: Request): Promise<AxiosResponse<T>> {
  return axios({
    url,
    method,
    responseType: 'json',
    headers,
    params,
    data,
  })
}

export default makeRequest
