import svgLoader from 'vite-svg-loader';

// https://nuxt.com/docs/api/configuration/nuxt-config
const lifecycle = process.env.npm_lifecycle_event;
export default defineNuxtConfig({
  devtools: { enabled: true },
  // css
  css: ['~/assets/scss/index.scss'],

  // build
  build: {
    transpile: lifecycle === 'build' ? ['element-plus'] : [],
  },

  // build modules
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@element-plus/nuxt',
  ],

  // auto import components
  components: true,

  // vite plugins
  vite: {
    plugins: [svgLoader()],
  },
});
