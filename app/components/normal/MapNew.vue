<template>
  <div ref="mapWrapper" class="baidu-map-wrapper">
    <!--  状态覆盖层   -->
    <div v-if="mapStatus === 'loading'" class="map-overlay">
      <div class="loading-spinner"></div>
      <p>地图加载中...</p>
    </div>

    <div v-if="mapStatus === 'error'" class="map-overlay error-state">
      <div class="error-icon">⚠️</div>
      <p>地图加载失败</p>
      <p class="error-hint">可能由于网络波动，请尝试刷新</p>
      <button @click="retryMap" class="retry-btn">点击重试</button>
    </div>

    <!--  地图 容器  -->

    <div ref="mapInnerContainer" class="map-inner-container" v-show="mapStatus === 'success'"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const BAIDU_MAP_AK = 'j0sj2LjOtWfnr5TphkQuTnNQYS5NAZTK';
const MAX_RETRY_COUNT = 3;
const RETRY_DELAY_BASE = 1000;

const TARGET_LOCATION = {
  lng: 121.544602,
  lat: 37.435541,
  companyName: '烟台阜瑞智能装备有限公司',
  phone: '0535-6666657'
};

// 外层包装器  
const mapWrapper = ref(null);
// 内层地图容器  
const mapInnerContainer = ref(null);

const mapStatus = ref('loading');

let mapInstance = null;
let markerInstance = null;
let infoWindowInstance = null;

let retryCount = 0;
let currentScript = null;
let isUnmounted = ref(false);

// 清理旧的脚本和回调
const cleanupPreviousLoad = () => {
  if (currentScript && currentScript.parentNode) {
    try {
      currentScript.parentNode.removeChild(currentScript);
    } catch (e) { }
    currentScript = null;
  }
  if (window.initBMapGLCallback) {
    delete window.initBMapGLCallback;
  }
};


//  动态加载百度地图 GL 版脚本

const loadBMapGL = () => {
  return new Promise((resolve, reject) => {
    if (isUnmounted.value) {
      reject(new Error('Component unmounted'));
      return;
    }

    if (window.BMapGL) {
      resolve(window.BMapGL);
      return;
    }

    cleanupPreviousLoad();

    const script = document.createElement('script');
    currentScript = script;
    script.src = `https://api.map.baidu.com/api?v=1.0&type=webgl&ak=${BAIDU_MAP_AK}&callback=initBMapGLCallback`;
    script.type = 'text/javascript';

    window.initBMapGLCallback = () => {
      if (isUnmounted.value || !mapInnerContainer.value) {
        reject(new Error('Component unmounted during callback'));
        return;
      }

      setTimeout(() => {
        if (isUnmounted.value || !mapInnerContainer.value) {
          reject(new Error('Component unmounted during init timeout'));
          return;
        }
        if (window.BMapGL) {
          resolve(window.BMapGL);
        } else {
          reject(new Error('百度地图 API 回调执行但对象未初始化'));
        }
      }, 200);
    };

    script.onerror = () => {
      if (!isUnmounted.value) {
        reject(new Error('网络请求失败：无法加载百度地图脚本'));
      }
    };

    if (!isUnmounted.value && document.head) {
      document.head.appendChild(script);
    } else {
      reject(new Error('Component unmounted before script append'));
    }
  });
};

//  初始化地图逻辑
const initMapLogic = (BMapGL) => {
  if (isUnmounted.value || !mapInnerContainer.value) {
    console.warn('地图初始化被取消：组件已卸载或容器不存在');
    return;
  }

  // 确保容器是空的  
  mapInnerContainer.value.innerHTML = '';

  try {
    // 将地图实例化指向内部 
    mapInstance = new BMapGL.Map(mapInnerContainer.value);

    const point = new BMapGL.Point(TARGET_LOCATION.lng, TARGET_LOCATION.lat);
    mapInstance.centerAndZoom(point, 15);
    mapInstance.enableScrollWheelZoom(true);

    const zoomControl = new BMapGL.ZoomControl();
    mapInstance.addControl(zoomControl);

    markerInstance = new BMapGL.Marker(point);
    mapInstance.addOverlay(markerInstance);

    const content = `
      <div style="padding: 5px; font-family: sans-serif;">
        <h4 style="margin: 0 0 5px 0; color: #333; font-size: 16px;">${TARGET_LOCATION.companyName}</h4>
        <p style="margin: 0; color: #666; font-size: 14px;">
          📞 电话：<a href="tel:${TARGET_LOCATION.phone}" style="color: #007bff; text-decoration: none;">${TARGET_LOCATION.phone}</a>
        </p>
      </div>
    `;

    infoWindowInstance = new BMapGL.InfoWindow(content, {
      width: 250,
      height: 100,
      title: '当前位置'
    });

    markerInstance.openInfoWindow(infoWindowInstance);

    markerInstance.addEventListener('click', function () {
      if (!isUnmounted.value) {
        this.openInfoWindow(infoWindowInstance);
      }
    });

    if (!isUnmounted.value) {
      mapStatus.value = 'success';
      console.log('百度地图加载成功');
    }
  } catch (err) {
    console.error('地图实例化错误:', err);
    if (!isUnmounted.value) {
      mapStatus.value = 'error';
    }
    throw err;
  }
};

const attemptLoadMap = async () => {
  if (isUnmounted.value) return;

  try {
    const BMapGL = await loadBMapGL();
    if (!isUnmounted.value) {
      initMapLogic(BMapGL);
    }
  } catch (error) {
    if (isUnmounted.value) return;

    console.warn(`地图加载尝试 ${retryCount + 1} 失败:`, error.message);

    retryCount++;

    if (retryCount <= MAX_RETRY_COUNT) {
      const delay = RETRY_DELAY_BASE * Math.pow(2, retryCount - 1);
      setTimeout(() => {
        if (!isUnmounted.value) {
          attemptLoadMap();
        }
      }, delay);
    } else {
      console.error('地图加载最终失败');
      mapStatus.value = 'error';
      cleanupPreviousLoad();
    }
  }
};

const retryMap = () => {
  if (mapStatus.value === 'loading' || isUnmounted.value) return;

  mapStatus.value = 'loading';
  retryCount = 0;

  if (mapInstance) {
    try {
      mapInstance.destroy();
    } catch (e) { }
    mapInstance = null;
    markerInstance = null;
    infoWindowInstance = null;
  }

  // 清空内部容器
  if (mapInnerContainer.value) {
    mapInnerContainer.value.innerHTML = '';
  }

  attemptLoadMap();
};

onMounted(() => {
  isUnmounted.value = false;
  attemptLoadMap();
});

onUnmounted(() => {
  isUnmounted.value = true;

  if (mapInstance) {
    try {
      mapInstance.destroy();
    } catch (e) { }
    mapInstance = null;
  }

  markerInstance = null;
  infoWindowInstance = null;

  // 清理内部容器 DOM，防止内存泄漏
  if (mapInnerContainer.value) {
    mapInnerContainer.value.innerHTML = '';
  }

  cleanupPreviousLoad();
});
</script>

<style scoped lang="scss">
.baidu-map-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #f5f5f5;
  overflow: hidden;
}


.map-inner-container {
  width: 100%;
  height: 100%;
  display: block;

  z-index: 1;
}

.map-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.95);
  z-index: 10;

  color: #666;
  font-size: 14px;
  pointer-events: auto;


  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #e0e0e0;
    border-top: 4px solid #1969B4;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 15px;
  }

  &.error-state {
    background-color: #fff;
    color: #333;

    .error-icon {
      font-size: 48px;
      margin-bottom: 10px;
    }

    .error-hint {
      font-size: 12px;
      color: #999;
      margin-bottom: 20px;
    }

    .retry-btn {
      padding: 8px 20px;
      background-color: #1969B4;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background 0.2s;

      &:hover {
        background-color: #145591;
      }
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>