// Store entry point
import { createPinia } from 'pinia'

// Import all store modules
import { useCounterStore } from './modules/counter'

// Initialize pinia
const pinia = createPinia()

// Export store modules
export {
  useCounterStore,
}

export default pinia
