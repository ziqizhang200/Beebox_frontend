import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import * as echarts from 'echarts'

// 导入 ECharts 核心模块
import VChart from 'vue-echarts'

const app = createApp(App)

// 注册必要的组件
app.component('v-chart', VChart)

app.use(createPinia())
app.use(router)

app.mount('#app')