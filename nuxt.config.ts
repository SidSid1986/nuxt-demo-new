// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config';
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'



export default defineNuxtConfig({

  // 1. 开发服务器基础配置 (只留 host/port)
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },


  css: [
    'element-plus/dist/index.css',
    'element-plus/theme-chalk/display.css',
  ],

  // (此处省略中间未变动的代码，保持你原有的即可)
  plugins: [
    '~/plugins/element-plus.ts',
    '~/plugins/rem-adaptation.client.js'
  ],
  app: {
    head: {
      script: [
        {
          src: '/rem-init.js',
          tagPosition: 'head',
          tagPriority: 'high'
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
  vite: {
    server: {
      proxy: {
        '/api': {
          target: process.env.NUXT_PUBLIC_API_BASE || "http://127.0.0.1:8000",
          changeOrigin: true,
          ws: false,
        },
        '/static': {
          target: process.env.NUXT_PUBLIC_API_BASE || "http://127.0.0.1:8000",
          changeOrigin: true,
          ws: false,
        }
      }
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [
          ElementPlusResolver({
            importStyle: false
          })
        ]
      })
    ]
  },
  runtimeConfig: {
    private: {
      backendUrl: '',
      internalKey: ''
    },
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://127.0.0.1:8000'
    }
  },
  postcss: {
    plugins: {
      'postcss-pxtorem': {
        rootValue: 10,
        propList: ['*', '!border'],
        selectorBlackList: ['norem'],
        unitPrecision: 5,
        replace: true,
        mediaQuery: false,
        minPixelValue: 2
      },
      autoprefixer: {}
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }
})