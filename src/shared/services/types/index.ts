export interface Request {
  url: string
  method?: string
  headers?: any
  params?: any
  data?: any
}

export interface PaginatedResponse<T> {
  offset: number
  number: number
  totalResults: number
  results: T[]
}
