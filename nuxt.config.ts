/*
 * @Author: Sid Li
 * @Date: 2026-03-03 14:38:18
 * @LastEditors: Sid Li
 * @LastEditTime: 2026-03-12 14:34:51
 * @FilePath: \nuxt-free-new\nuxt.config.ts
 * @Description: 
 */
// nuxt.config.ts
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineNuxtConfig({

  // 开发服务器配置
  devServer: {
    host: '0.0.0.0', // 监听所有网络接口 
    port: 3000 // 端口可自定义，如 8080
  },

  // 1. 全局样式
  css: [
    'element-plus/dist/index.css',
    'element-plus/theme-chalk/display.css',
  ],

  // 2. 插件配置
  plugins: [
    '~/plugins/element-plus.ts',
    '~/plugins/rem-adaptation.client.js'
  ],

  // 3. App 配置  
  app: {
    head: {
      script: [
        {
          src: '/rem-init.js', // 指向 public/rem-init.js
          tagPosition: 'head', // 放在 head 中，阻塞渲染直到执行完毕
          tagPriority: 'high'  // 高优先级加载
        }
      ],

      style: [
        {
          textContent: `
            @font-face {
              font-family: 'SourceHanSansCN-Bold';
              src: url('/fonts/SourceHanSansCN-Bold.otf') format('opentype');
              font-weight: 700;
              font-style: normal;
              font-display: block;
            }
            @font-face {
              font-family: 'SourceHanSansCN-Medium';
              src: url('/fonts/SourceHanSansCN-Medium.otf') format('opentype');
              font-weight: 500;
              font-style: normal;
              font-display: block;
            }   
           @font-face {
              font-family: 'SourceHanSansCN-Regular';
              src: url('/fonts/SourceHanSansCN-Regular.otf') format('opentype');
              font-weight: 400;
              font-style: normal;
              font-display: block;
            }    
          @font-face {
              font-family: 'SourceHanSansCN-Normal';
              src: url('/fonts/SourceHanSansCN-Normal.otf') format('opentype');
              font-weight: 400;
              font-style: normal;
              font-display: block;
            }  
          `,

        }
      ],

    }
  },

  // 4. Vite 插件配置 自动导入
  vite: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [
          ElementPlusResolver({
            importStyle: false // 样式已由 css 数组全局引入
          })
        ]
      })
    ]
  },

  // 5. 运行时配置
  runtimeConfig: {
    private: {
      backendUrl: '',
      internalKey: ''
    },
    public: {
      apiBase: ''
    }
  },

  // 6. PostCSS 配置 (PX 转 REM)
  postcss: {
    plugins: {
      'postcss-pxtorem': {
        rootValue: 10, // 与 JS 中的 baseFontSize 逻辑匹配
        propList: ['*', '!border'],
        selectorBlackList: ['norem'],
        unitPrecision: 5,
        replace: true,
        mediaQuery: false,// 不处理媒体查询中的 px
        minPixelValue: 2
      },
      autoprefixer: {}
    }
  },


  compatibilityDate: '2024-11-01', // 建议添加兼容性日期
  devtools: { enabled: true }
})