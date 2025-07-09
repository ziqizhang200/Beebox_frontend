// Utils entry point
export * from './mockData'

// Common utility functions
export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0]
}

// Add more utility functions as needed
export const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim().length === 0
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}
