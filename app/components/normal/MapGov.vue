<template>
  <div ref="mapWrapper" class="tdt-map-wrapper">
    <div v-if="mapStatus === 'loading'" class="map-overlay">
      <div class="loading-spinner"></div>
      <p>地图加载中...</p>
    </div>

    <div v-if="mapStatus === 'error'" class="map-overlay error-state">
      <div class="error-icon">⚠️</div>
      <p>地图加载失败</p>
      <p class="error-hint">请检查网络或密钥配置</p>
      <button @click="retryMap" class="retry-btn">重试</button>
    </div>

    <div ref="mapInnerContainer" class="map-inner-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const TIANDITU_KEY = '1a3268252e0b8d241fdc0ffb8a8ee9e8'

const TARGET_LOCATION = {
  lng: 121.532650,
  lat: 37.429840,
  companyName: '烟台阜瑞智能装备有限公司',
  phone: '0535-6666657'
}

const mapWrapper = ref(null)
const mapInnerContainer = ref(null)
const mapStatus = ref('loading')

let mapInstance = null
let marker = null
let infoWin = null
let isUnmounted = false

// 加载天地图脚本
function loadScript() {
  return new Promise((resolve, reject) => {
    if (window.T) return resolve(window.T)

    const script = document.createElement('script')
    script.src = `https://api.tianditu.gov.cn/api?v=4.0&tk=${TIANDITU_KEY}`
    script.onload = () => {
      setTimeout(() => resolve(window.T), 100)
    }
    script.onerror = reject
    document.head.appendChild(script)
  })
}

// 初始化地图
async function initMap() {
  await nextTick()
  if (!mapInnerContainer.value) return

  try {
    const T = await loadScript()

    // 强制容器尺寸
    const el = mapInnerContainer.value
    el.style.width = '100%'
    el.style.height = '100%'

    // 创建地图
    mapInstance = new T.Map(el)
    const point = new T.LngLat(TARGET_LOCATION.lng, TARGET_LOCATION.lat)
    mapInstance.centerAndZoom(point, 15)
    mapInstance.enableScrollWheelZoom()

    // 添加标注
    marker = new T.Marker(point)
    mapInstance.addOverLay(marker)

    // 信息窗口
    const content = `
      <div style="padding:6px;">
        <h4 style="margin:0 0 6px;">${TARGET_LOCATION.companyName}</h4>
        <p style="margin:0;">📞 ${TARGET_LOCATION.phone}</p>
      </div>
    `
    infoWin = new T.InfoWindow(content, { width: 260, height: 110 })
    marker.openInfoWindow(infoWin)

    mapStatus.value = 'success'
  } catch (err) {
    console.error('地图失败:', err)
    mapStatus.value = 'error'
  }
}

// 重试
function retryMap() {
  mapStatus.value = 'loading'
  if (mapInstance) mapInstance.destroy()
  initMap()
}

onMounted(() => {
  isUnmounted = false
  initMap()
})

onUnmounted(() => {
  isUnmounted = true
  if (mapInstance) mapInstance.destroy()
})
</script>

<style scoped lang="scss">
.tdt-map-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  background: #f5f5f5;
}

/* 核心修复：必须给明确高度 */
.map-inner-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100% !important;
  z-index: 1;
}

.map-overlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #666;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #eee;
  border-top: 4px solid #1969B4;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 12px;
}

.error-state {
  .error-icon {
    font-size: 44px;
    margin-bottom: 10px;
  }

  .retry-btn {
    padding: 8px 18px;
    background: #1969B4;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>