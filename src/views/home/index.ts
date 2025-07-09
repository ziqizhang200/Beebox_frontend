// Home view logic and types
import { ref } from 'vue'

export interface HomeState {
  title: string
  description: string  
}

export const useHome = () => {
  const state = ref<HomeState>({
    title: 'Welcome to BeeBox',
    description: 'Your Smart Home Management System'
  })

  const updateTitle = (newTitle: string) => {
    state.value.title = newTitle
  }

  return {
    state,
    updateTitle
  }
}