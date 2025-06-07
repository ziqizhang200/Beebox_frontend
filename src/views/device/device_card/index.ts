import { ref, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import type { EChartsOption } from 'echarts'
import type { ChartConfig, DeviceData, ChartTheme } from '@/types'

// 图表主题配置
const chartTheme: ChartTheme = {
  temperature: {
    color: '#f56c6c',
    title: '温度',
    unit: '°C'
  },
  humidity: {
    color: '#409eff',
    title: '湿度',
    unit: '%'
  },
  pressure: {
    color: '#67c23a',
    title: '气压',
    unit: 'hPa'
  }
}

export const useDeviceCharts = () => {
  const route = useRoute()
  const deviceId = route.params.device_uid as string

  // 响应式状态
  const loading = ref(true)
  const error = ref<string | null>(null)
  const timeRange = ref<'day' | 'week' | 'month'>('day')

  // 图表配置
  const charts = reactive<ChartConfig[]>([
    {
      ...chartTheme.temperature,
      key: 'temperature',
      data: []
    },
    {
      ...chartTheme.humidity,
      key: 'humidity',
      data: []
    },
    {
      ...chartTheme.pressure,
      key: 'pressure',
      data: []
    }
  ])

  // 计算属性：根据时间范围过滤数据
  const filteredCharts = computed(() => {
    return charts.map(chart => ({
      ...chart,
      data: filterDataByTimeRange(chart.data, timeRange.value)
    }))
  })

  // 根据时间范围过滤数据
  const filterDataByTimeRange = (data: any[], range: string) => {
    const now = new Date()
    const startDate = new Date()

    switch (range) {
      case 'week':
        startDate.setDate(now.getDate() - 7)
        break
      case 'month':
        startDate.setMonth(now.getMonth() - 1)
        break
      default:
        startDate.setDate(now.getDate() - 1)
    }

    return data.filter(point => new Date(point.timestamp) >= startDate)
  }

  // 生成ECharts配置
  const getChartOption = (chart: ChartConfig): EChartsOption => ({
    title: {
      text: `${chart.title} (${chart.unit})`,
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const data = params[0]
        return `${data.name}<br/>${data.value} ${chart.unit}`
      }
    },
    grid: {
      top: 50,
      left: 30,
      right: 30,
      bottom: 30,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: chart.data.map(point => point.timestamp),
      boundaryGap: false,
      axisLabel: {
        rotate: 45
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: `{value} ${chart.unit}`
      }
    },
    series: [{
      name: chart.title,
      type: 'line',
      data: chart.data.map(point => point.value),
      smooth: true,
      showSymbol: false,
      itemStyle: {
        color: chart.color
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: chart.color
          }, {
            offset: 1,
            color: 'rgba(255, 255, 255, 0)'
          }]
        }
      }
    }]
  })

  // 更新图表数据
  const updateChartData = (data: DeviceData) => {
    charts[0].data = data.temperature
    charts[1].data = data.humidity
    charts[2].data = data.pressure
    loading.value = false
  }

  // 设置时间范围
  const setTimeRange = (range: 'day' | 'week' | 'month') => {
    timeRange.value = range
  }

  // 获取每个图表的最新数据
  const getLatestValues = computed(() => {
    return charts.map(chart => ({
      title: chart.title,
      value: chart.data[chart.data.length - 1]?.value ?? 0,
      unit: chart.unit
    }))
  })

  return {
    deviceId,
    loading,
    error,
    timeRange,
    charts: filteredCharts,
    latestValues: getLatestValues,
    getChartOption,
    updateChartData,
    setTimeRange
  }
}