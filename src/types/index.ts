// Type definitions entry point

// Export device related types
export * from './device'

// Export forum related types
export * from './forum'

// Common types
export interface BaseResponse<T> {
  code: number
  data: T
  message: string
}

export interface PaginationParams {
  page: number
  pageSize: number
  total?: number
}