<template>
  <div class="device-page">
    <div class="page-header">
      <div class="title-section">
        <router-link to="/device" class="back-link">返回设备列表</router-link>
        <h1>设备监控 - {{ deviceName }}</h1>
      </div>
      <div class="header-actions">
        <div class="time-range">
          <button
            v-for="range in timeRanges"
            :key="range"
            :class="['range-btn', { active: timeRange === range }]"
            @click="handleSetTimeRange(range)"
          >
            {{ range === 'day' ? '日' : range === 'week' ? '周' : '月' }}
          </button>
        </div>
        <router-link to="/forum" class="forum-link">
          <button class="forum-btn">论坛讨论</button>
        </router-link>
      </div>
    </div>

    <div class="latest-values">
      <div v-for="value in latestValues" :key="value.title" class="value-card">
        <h3>{{ value.title }}</h3>
        <div class="value">{{ value.value }}{{ value.unit }}</div>
      </div>
    </div>

    <div v-if="loading" class="loading">
      加载中...
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else class="charts-container">
      <div v-for="chart in charts" :key="chart.title" class="chart-wrapper">
        <v-chart
          class="chart"
          :option="getChartOption(chart)"
          :autoresize="true"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useDeviceCharts } from './index'
import { generateMockData } from './mockData'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import devicesList from '@/assets/devices.json'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent
} from 'echarts/components'

// 注册必需的组件
use([
  CanvasRenderer,
  LineChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent
])

const props = defineProps<{
  deviceId: string
}>()

const deviceName = computed(() => {
  const device = devicesList.devices.find(d => d.uid === props.deviceId)
  return device ? device.name : props.deviceId
})

const {
  loading,
  error,
  timeRange,
  charts,
  latestValues,
  getChartOption,
  setTimeRange,
  updateChartData
} = useDeviceCharts()

const timeRanges = ['day', 'week', 'month'] as const
type TimeRange = typeof timeRanges[number]

// 根据时间范围加载数据
const loadData = (range: TimeRange) => {
  const days = range === 'day' ? 1 : range === 'week' ? 7 : 30
  const mockData = generateMockData(props.deviceId, days)
  updateChartData(mockData)
}

// 监听时间范围变化
const handleTimeRangeChange = (range: TimeRange) => {
  setTimeRange(range)
  loadData(range)
}

// 初始加载
onMounted(() => {
  loadData('day')
})

// 重写 setTimeRange 以包含数据加载
const handleSetTimeRange = (range: TimeRange) => {
  handleTimeRangeChange(range)
}
</script>

<style scoped>
.device-page {
  padding: 20px;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-header h1 {
  margin: 0;
  color: #303133;
}

.header-actions {
  display: flex;
  gap: 20px;
  align-items: center;
}

.time-range {
  display: flex;
  gap: 8px;
  border-radius: 4px;
  overflow: hidden;
}

.range-btn {
  padding: 6px 12px;
  border: 1px solid #dcdfe6;
  background: white;
  cursor: pointer;
  transition: all 0.3s;
}

.range-btn:hover {
  background-color: #f5f7fa;
}

.range-btn.active {
  background-color: #409eff;
  color: white;
  border-color: #409eff;
}

.forum-btn {
  background-color: #67c23a;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.forum-btn:hover {
  background-color: #85ce61;
}

.forum-link {
  text-decoration: none;
}

.latest-values {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.value-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
}

.value-card h3 {
  margin: 0;
  color: #909399;
  font-size: 14px;
}

.value {
  font-size: 24px;
  color: #303133;
  margin-top: 10px;
  font-weight: bold;
}

.charts-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
}

.chart-wrapper {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.chart-wrapper :deep(canvas) {
  width: 100% !important;
  height: 300px !important;
}

.loading, .error {
  text-align: center;
  padding: 40px;
  color: #909399;
}

.error {
  color: #f56c6c;
}
.title-section {
  display: flex;
  align-items: center;
  gap: 20px;
}

.back-link {
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

.chart-wrapper {
  width: 100%;
  height: 400px;
}

:deep(.echarts) {
  width: 100%;
  height: 100%;
}
</style>