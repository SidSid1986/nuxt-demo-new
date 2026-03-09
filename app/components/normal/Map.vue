<template>
  <div ref="mapContainer" class="baidu-map"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'


const BAIDU_MAP_AK = 'j0sj2LjOtWfnr5TphkQuTnNQYS5NAZTK';

//  配置区域 
const TARGET_LOCATION = {
  lng: 121.544691, // 经度
  lat: 37.436106,  // 纬度
  companyName: '烟台阜瑞智能装备有限公司',
  phone: '0535-6666657'
};

const mapContainer = ref(null);
let mapInstance = null;
let loadPromise = null;
let markerInstance = null;
let infoWindowInstance = null;

/**
 * 动态加载百度地图 GL 版脚本
 */
const loadBMapGL = () => {
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    if (window.BMapGL) {
      resolve(window.BMapGL);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://api.map.baidu.com/api?v=1.0&type=webgl&ak=${BAIDU_MAP_AK}&callback=initBMapGLCallback`;
    script.type = 'text/javascript';

    window.initBMapGLCallback = () => {
      setTimeout(() => {
        if (window.BMapGL) {
          resolve(window.BMapGL);
        } else {
          reject(new Error('百度地图 GL 对象初始化失败'));
        }
      }, 100);
    };

    script.onerror = () => {
      reject(new Error('百度地图脚本加载失败，请检查 AK 或网络'));
    };

    document.head.appendChild(script);
  });

  return loadPromise;
};

const initMap = async () => {
  try {
    const BMapGL = await loadBMapGL();

    if (!mapContainer.value) return;

    //   创建地图实例
    mapInstance = new BMapGL.Map(mapContainer.value);

    //  设置中心点和缩放
    const point = new BMapGL.Point(TARGET_LOCATION.lng, TARGET_LOCATION.lat);
    mapInstance.centerAndZoom(point, 15);
    mapInstance.enableScrollWheelZoom(true);

    //   缩放控件 (NavigationControl)

    const zoomControl = new BMapGL.ZoomControl();
    mapInstance.addControl(zoomControl);

    //   添加标点 (Marker)
    markerInstance = new BMapGL.Marker(point);
    mapInstance.addOverlay(markerInstance);

    //  添加信息窗口 (InfoWindow)
    // 构建 HTML 内容
    const content = `
      <div style="padding: 5px; font-family: sans-serif;">
        <h4 style="margin: 0 0 5px 0; color: #333; font-size: 16px;">${TARGET_LOCATION.companyName}</h4>
        <p style="margin: 0; color: #666; font-size: 14px;">
          📞 电话：<a href="tel:${TARGET_LOCATION.phone}" style="color: #007bff; text-decoration: none;">${TARGET_LOCATION.phone}</a>
        </p>
      </div>
    `;

    // 创建信息窗口实例  
    infoWindowInstance = new BMapGL.InfoWindow(content, {
      width: 250,
      height: 100,
      title: '当前位置'
    });

    // 打开信息窗口
    markerInstance.openInfoWindow(infoWindowInstance);

    //  点击标记也重新打开窗口
    markerInstance.addEventListener('click', function () {
      this.openInfoWindow(infoWindowInstance);
    });

    console.log('百度地图 (GL版) 加载成功，已添加控件和标注');

  } catch (error) {
    console.error('地图加载错误:', error);
    alert('地图加载失败：' + error.message);
  }
};

onMounted(() => {
  setTimeout(initMap, 0);
});

onUnmounted(() => {
  if (mapInstance) {
    // 清除覆盖物
    if (markerInstance) mapInstance.removeOverlay(markerInstance);
    mapInstance.destroy();
    mapInstance = null;
    markerInstance = null;
    infoWindowInstance = null;
  }
  delete window.initBMapGLCallback;
});
</script>

<style scoped>
.baidu-map {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>