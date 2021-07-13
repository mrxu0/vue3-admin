import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import ViteComponents, {
  AntDesignVueResolver,
} from 'vite-plugin-components';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
    ViteComponents({
      globalComponentsDeclaration: true,
      customComponentResolvers: [
        AntDesignVueResolver(),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@p': '/src/pages',
      '@a': '/src/assets',
      '@c': '/src/components',
      '@': '/src',
    },
  },
});
