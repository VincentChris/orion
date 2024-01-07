// https://nuxt.com/docs/api/configuration/nuxt-config
const lifecycle = process.env.npm_lifecycle_event;
export default defineNuxtConfig({
  devtools: { enabled: true },
  // meta
  $meta: {
    title: 'ElementPlus + Nuxt3',
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'ElementPlus + Nuxt3',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // css
  css: ['~/assets/scss/index.scss'],

  // build
  build: {
    transpile: lifecycle === 'build' ? ['element-plus'] : [],
  },

  // build modules
  modules: ['@pinia/nuxt', '@nuxtjs/svg', '@vueuse/nuxt', '@unocss/nuxt'],

  // auto import components
  components: true,

  // vite plugins
  vite: {
    plugins: [],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/index.scss" as *;',
        },
      },
    },
  },
});
