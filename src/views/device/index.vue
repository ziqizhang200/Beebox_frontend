
<template>
  <div class="device-list-page">
    <div class="title-section">
      <router-link to="/Home" class="back-link">返回Homepage</router-link> 
      <h1>设备列表</h1>
    </div>
    <div class="device-grid"  >
      <router-link
        v-for="device in devices"
        :key="device.uid"
        :to="`/device/${device.uid}`"
        class="device-card"
      >
        <div class="device-status" :class="device.status"></div>
        <h2>{{ device.name }}</h2>
        <p class="location">{{ device.location }}</p>
        <p class="last-update">
          最后更新: {{ formatDate(device.lastUpdate) }}
        </p>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import devicesList from '@/assets/devices.json'
import type { Device } from '@/types/device'

const devices = ref<Device[]>([])

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  devices.value = devicesList.devices.map(device => ({
    ...device,
    status: device.status as 'online' | 'offline'
  }))
})
</script>

<style scoped>
.title-section {
  display: flex;
  align-items: center;
  gap: 20px;
}

.back-link{
  color: #666;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.back-link:hover {
  color: #333;
}

.back-link::before {
  content: "←";
  margin-right: 5px;
}
.device-list-page {
  padding: 20px;
}

.device-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.device-card {
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s;
}

.device-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.device-status {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.device-status.online {
  background-color: #4caf50;
}

.device-status.offline {
  background-color: #f44336;
}

.device-card h2 {
  margin: 0 0 10px;
  font-size: 1.2em;
  color: #333;
}

.location {
  color: #666;
  margin: 5px 0;
}

.last-update {
  color: #999;
  font-size: 0.9em;
  margin: 5px 0 0;
}
</style>