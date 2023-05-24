import CompressionPlugin from 'compression-webpack-plugin'
export default defineNuxtConfig({
  build: {
    transpile: ['gsap'],
    // ...pozostała część konfiguracji build...
    extend(config:any, { isDev }) {
      // Skompresuj pliki tylko w środowisku produkcyjnym
      if (!isDev) {
        // Skompresuj pliki JS i CSS za pomocą gzip i brotli
        config.plugins.push(
          new CompressionPlugin({
            algorithm: 'gzip',
            test: /\.(js|css)$/,
            threshold: 8192,
            minRatio: 0.8
          }),
          new CompressionPlugin({
            algorithm: 'brotliCompress',
            test: /\.(js|css)$/,
            threshold: 8192,
            minRatio: 0.8
          })
        )
      }
    }
  },
  target: 'server',
  ssr: false,
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', 'nuxt-icon', '@vueuse/nuxt', ['nuxt3-lazy-load', {
    // These are the default values
    images: true,
    videos: true,
    audios: true,
    iframes: true,
    native: false,
    directiveOnly: false,
    
    // Default image must be in the public folder
    // defaultImage: '/assets/file/placeholder-image.webp',

    // To remove class set value to false
    loadingClass: 'isLoading',
    loadedClass: 'isLoaded',
    appendClass: 'lazyLoad',
    
    observerConfig: {
      // See IntersectionObserver documentation
    }
  }]],
  css: ['@/assets/style/tailwind.css', '@/assets/style/style.scss'],
})