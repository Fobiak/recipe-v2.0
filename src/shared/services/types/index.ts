export interface Request {
  url: string
  method?: string
  headers?: any
  params?: any
  data?: any
}

export interface PaginatedResponse<T> {
  count: number
  page: number
  total_pages: number
  results: T[]
}
