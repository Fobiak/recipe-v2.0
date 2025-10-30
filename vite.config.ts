import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue({
      script: {
        propsDestructure: true,
      },
    }),
    vueDevTools(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/head',
        'pinia',
        {
          '@/store': ['useStore'],
          '@vueuse/head': ['useHead'],
        },
      ],
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
      },
    }),
    Components({
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      directives: true,
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
      dts: 'src/components.d.ts',
      dirs: [
        'src/shared/ui/Common',
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 8080,
  },
})
