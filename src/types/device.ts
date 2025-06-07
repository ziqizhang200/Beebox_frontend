
// 数据点接口定义
export interface DataPoint {
  timestamp: string
  value: number
}

// 图表数据接口定义
export interface ChartConfig {
  title: string
  unit: string
  color: string
  data: DataPoint[]
  key: 'temperature' | 'humidity' | 'pressure'
}

// 设备数据接口定义
export interface DeviceData {
  deviceId: string
  temperature: DataPoint[]
  humidity: DataPoint[]
  pressure: DataPoint[]
}

// 图表主题配置
export interface ChartTheme {
  temperature: {
    color: string
    title: string
    unit: string
  }
  humidity: {
    color: string
    title: string
    unit: string
  }
  pressure: {
    color: string
    title: string
    unit: string
  }
}

// 设备基础信息接口
export interface Device {
  uid: string
  name: string
  location: string
  status: 'online' | 'offline'
  lastUpdate: string
}