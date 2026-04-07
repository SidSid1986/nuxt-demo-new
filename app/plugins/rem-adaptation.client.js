/*
 * @Author: Sid Li
 * @Date: 2026-02-26 17:19:12
 * @LastEditors: Sid Li
 * @LastEditTime: 2026-04-07 10:56:48
 * @FilePath: \nuxt-free-new\app\plugins\rem-adaptation.client.js
 * @Description: REM 适配插件 (优化版 - 移除多余延迟，修复 Premature close)
 */
// @ts-nocheck
export default defineNuxtPlugin((nuxtApp) => {
  const designWidth = 1920;
  const designHeight = 1080;
  const baseFontSize = 10;
  // 设计稿根字体大小计算：(1920 / 100) * 10 = 192px?
  // 注意：通常 designWidth/100 * baseFontSize 是为了让 1rem = baseFontSize * (currentWidth/designWidth)
  // 你的原逻辑：designRootFontSize = (1920/100)*10 = 192.
  // 如果 rootValue 在 postcss 是 10，这里逻辑可能需要确认是否符合预期，但此处仅修复报错，保持原算法。
  const designRootFontSize = (designWidth / 100) * baseFontSize;

  const resolutionConfig = {
    2560: 1.2,
    3840: 1.4,
    7680: 1.6,
  };

  const fontSizeMaxConfig = {
    default: 10,
    2560: 12,
    3840: 14,
    7680: 16,
  };

  function setRootFontSize() {
    if (typeof document === "undefined" || typeof window === "undefined")
      return;

    const currentWidth =
      document.documentElement.clientWidth || window.innerWidth;
    const currentHeight =
      document.documentElement.clientHeight || window.innerHeight;

    const widthRatio = currentWidth / designWidth;
    const heightRatio = currentHeight / designHeight;
    let scaleRatio = Math.min(widthRatio, heightRatio);

    let zoomFactor = 1;
    let currentMaxFontSize = fontSizeMaxConfig.default;

    if (currentWidth >= 7680) {
      zoomFactor = resolutionConfig[7680];
      currentMaxFontSize = fontSizeMaxConfig[7680];
    } else if (currentWidth >= 3840) {
      zoomFactor = resolutionConfig[3840];
      currentMaxFontSize = fontSizeMaxConfig[3840];
    } else if (currentWidth >= 2560) {
      zoomFactor = resolutionConfig[2560];
      currentMaxFontSize = fontSizeMaxConfig[2560];
    }

    scaleRatio = scaleRatio * zoomFactor;

    let fontSize = scaleRatio * designRootFontSize;
    const minFontSize = 7;

    // 限制字体大小范围
    fontSize = Math.max(Math.min(fontSize, currentMaxFontSize), minFontSize);

    // 直接操作 style，避免频繁重绘
    const htmlStyle = document.documentElement.style;
    if (htmlStyle.fontSize !== `${fontSize}px`) {
      htmlStyle.fontSize = `${fontSize}px`;
    }

    // 保持 body 字体基准
    document.body.style.fontSize = "16px";
  }

 
  //  仅在 app:mounted 钩子中执行一次初始化
  nuxtApp.hook("app:mounted", () => {
    // 初始化执行
    setRootFontSize();
    // 添加监听
    window.addEventListener("resize", setRootFontSize);
    window.addEventListener("orientationchange", setRootFontSize);
  });
});
