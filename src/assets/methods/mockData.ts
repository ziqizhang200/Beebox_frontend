import type { DeviceData, DataPoint } from '@/types'

// 生成随机波动数据
const generateWaveData = (
  baseValue: number,
  amplitude: number,
  frequency: number,
  noise: number
): number => {
  const wave = Math.sin(frequency) * amplitude
  const randomNoise = (Math.random() - 0.5) * noise
  return baseValue + wave + randomNoise
}

// 生成随机数据点
const generateDataPoints = (
  baseValue: number,
  variance: number,
  count: number,
  timeOffset: number = 0
): DataPoint[] => {
  const points: DataPoint[] = []
  const now = new Date()

  // 每小时的数据点数
  const pointsPerHour = 6 // 10分钟一个点

  for (let i = 0; i < count * pointsPerHour; i++) {
    const time = new Date(now.getTime() - (count * pointsPerHour - 1 - i) * (3600000 / pointsPerHour))

    // 使用正弦波模拟数据波动
    const hour = time.getHours()
    const frequency = (hour / 24) * Math.PI * 2 // 24小时一个完整周期

    points.push({
      timestamp: time.toISOString(),
      value: Number(generateWaveData(baseValue, variance * 0.5, frequency, variance * 0.2).toFixed(1))
    })
  }

  return points
}

// 生成模拟数据
export const generateMockData = (deviceId: string, days: number = 1): DeviceData => {
  return {
    deviceId,
    // 温度：基准值25°C，波动±2°C
    temperature: generateDataPoints(25, 2, days * 24),
    // 湿度：基准值45%，波动±10%
    humidity: generateDataPoints(45, 10, days * 24),
    // 气压：基准值1013hPa，波动±2hPa
    pressure: generateDataPoints(1013, 2, days * 24)
  }
}