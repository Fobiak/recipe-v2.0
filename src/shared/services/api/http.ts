import type { Request } from '../types'
import axios from 'axios'

function makeRequest({ url = '/', method = 'get', data, params, headers }: Request) {
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
