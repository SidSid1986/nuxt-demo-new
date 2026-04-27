<template>
  <div ref="mapWrapper" class="map-wrapper">
    <!-- 加载中 -->
    <div v-if="mapStatus === 'loading'" class="map-overlay">
      <div class="loading-spinner"></div>
      <p>地图加载中...</p>
    </div>

    <!-- 加载失败 -->
    <div v-if="mapStatus === 'error'" class="map-overlay error-state">
      <div class="error-icon">⚠️</div>
      <p>地图加载失败</p>
      <p class="error-hint">请检查地图Key或网络</p>
      <button @click="retryMap" class="retry-btn">点击重试</button>
    </div>

    <!-- 地图容器 -->
    <div ref="mapContainer" class="map-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

// ==================== 腾讯地图 Key ====================
const TENCENT_MAP_KEY = '7QMBZ-M3CWZ-BYOXE-7IBPL-IXQWS-UFF6S'
// =================================================================

const MAX_RETRY_COUNT = 3
const RETRY_DELAY = 1000

const TARGET_LOCATION = {
  lng: 121.538158,
  lat: 37.429422,
  companyName: '烟台阜瑞智能装备有限公司',
  phone: '0535-6666657'
}

const mapWrapper = ref(null)
const mapContainer = ref(null)
const mapStatus = ref('loading')

let mapInstance = null
let retryCount = 0
let currentScript = null
let isUnmounted = false

// 清理脚本
function cleanup() {
  if (currentScript?.parentNode) currentScript.parentNode.removeChild(currentScript)
  delete window.initTencentMap
  currentScript = null
}

// 加载地图 SDK
function loadMapSDK() {
  return new Promise((resolve, reject) => {
    if (window.TMap) return resolve(window.TMap)
    cleanup()

    const script = document.createElement('script')
    currentScript = script
    script.src = `https://map.qq.com/api/gljs?v=1.exp&key=${TENCENT_MAP_KEY}&callback=initTencentMap`
    window.initTencentMap = () => resolve(window.TMap)
    script.onerror = () => reject(new Error('SDK加载失败'))
    document.head.appendChild(script)
  })
}

// 初始化地图
async function initMap() {
  await nextTick()
  if (!mapContainer.value) return

  try {
    // 强制容器尺寸，彻底解决 far <= 0
    mapContainer.value.style.width = '100%'
    mapContainer.value.style.height = '100%'

    const TMap = await loadMapSDK()
    mapInstance = new TMap.Map(mapContainer.value, {
      center: new TMap.LatLng(TARGET_LOCATION.lat, TARGET_LOCATION.lng),
      zoom: 15,
      scrollWheel: true
    })

    // 标记
    new TMap.MultiMarker({
      map: mapInstance,
      geometries: [{
        id: 'company',
        position: new TMap.LatLng(TARGET_LOCATION.lat, TARGET_LOCATION.lng)
      }]
    })

    // 信息窗
    const info = new TMap.InfoWindow({
      map: mapInstance,
      position: new TMap.LatLng(TARGET_LOCATION.lat, TARGET_LOCATION.lng),
      content: `
        <div style="padding:8px;">
          <h4 style="margin:0 0 6px;">${TARGET_LOCATION.companyName}</h4>
          <p style="margin:0;">📞 ${TARGET_LOCATION.phone}</p>
        </div>
      `,
      offset: { x: 0, y: -30 }
    })
    info.open()

    mapStatus.value = 'success'
  } catch (e) {
    console.error('地图初始化失败：', e)
    mapStatus.value = 'error'
  }
}

// 尝试加载
async function attemptLoad() {
  if (isUnmounted) return
  try {
    await initMap()
  } catch {
    if (retryCount++ < MAX_RETRY_COUNT) {
      setTimeout(attemptLoad, RETRY_DELAY * Math.pow(2, retryCount))
    } else {
      mapStatus.value = 'error'
    }
  }
}

// 重试
function retryMap() {
  if (mapStatus.value === 'loading') return
  mapStatus.value = 'loading'
  retryCount = 0
  if (mapInstance) mapInstance.destroy()
  attemptLoad()
}

onMounted(() => {
  isUnmounted = false
  attemptLoad()
})

onUnmounted(() => {
  isUnmounted = true
  if (mapInstance) mapInstance.destroy()
  cleanup()
})
</script>

<style scoped lang="scss">
.map-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  background: #f5f5f5;
}

/* 核心修复：写死高度，永远不出现 far <= 0 */
.map-container {
  width: 100%;
  height: 100% !important;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.map-overlay {
  position: absolute;
  inset: 0;
  z-index: 10;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #666;

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #eee;
    border-top: 4px solid #1969B4;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 12px;
  }

  &.error-state {
    .error-icon {
      font-size: 44px;
      margin-bottom: 10px;
    }

    .error-hint {
      font-size: 12px;
      color: #999;
      margin: 6px 0 16px;
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
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>