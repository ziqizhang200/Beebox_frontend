<template>
  <div class="template-view">
    <!-- Header Section -->
    <header class="view-header">
      <h1>{{ state.title }}</h1>
      <div class="header-actions" v-if="isEditable">
        <button @click="loadData">Refresh</button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="view-content">
      <div v-if="state.loading" class="loading">
        Loading...
      </div>
      <div v-else-if="state.data.length === 0" class="empty-state">
        No data available
      </div>
      <div v-else class="data-container">
        <!-- Data display logic here -->
        <div v-for="item in state.data" 
             :key="item.id" 
             class="data-item">
          {{ item }}
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTemplate } from './index'

// Define props
const props = defineProps<{
  id?: string
  mode?: 'edit' | 'view'
}>()

// Initialize view logic
const { state, isEditable, loadData } = useTemplate(props)

// Lifecycle hooks
onMounted(() => {
  loadData()
})
</script>

<style scoped>
.template-view {
  padding: 20px;
}

.view-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.view-content {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  min-height: 200px;
}

.loading,
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #666;
}

.data-container {
  display: grid;
  gap: 20px;
}

.data-item {
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 4px;
}
</style>
