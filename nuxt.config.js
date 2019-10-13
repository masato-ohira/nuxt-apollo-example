const pkg = require('./package')
// const axios = require('axios')

require('dotenv').config()
const { NUXT_GITHUB_TOKEN } = process.env

module.exports = {
  mode: 'spa',
  // mode: 'spa',
  env: {
    NUXT_GITHUB_TOKEN
  },
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Noto+Sans+JP:300,400,500,700&subset=japanese' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Oswald:300,400,500,600,700&display=swap' },
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // '~/plugins/cmn',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    // '@nuxtjs/axios',
    // Doc:https://github.com/nuxt-community/modules/tree/master/packages/bulma
    // '@nuxtjs/bulma',
    // '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    '@nuxtjs/dotenv',
    '@nuxtjs/apollo',
  ],
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  apollo: {
    clientConfigs: {
      default: '~/apollo/client-configs/default.js'
    }
  },

  styleResources: {
    sass: [
      '~/assets/sass/core.sass'
    ]
  },

  server: {
    disableHostCheck: true,
    port: 3000, // デフォルト: 3000
    host: '0.0.0.0', // デフォルト: localhost
  },

  manifest: {
    name: 'nuxt-apollo-example',
    lang: 'ja',
    short_name: 'nuxt-apollo-example',
    title: 'nuxt-apollo-example',
    'og:title': 'nuxt-apollo-example',
    description: 'nuxt-apollo-example',
    'og:description': 'nuxt-apollo-example',
    theme_color: '#ffffff',
    background_color: '#ffffff'
  },

  /*
  ** Build configuration
  */
  srcDir: 'src/',
  build: {
    extractCSS: true,
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // aliasの設定
      let path = require('path')
      config.resolve.alias['@c'] = path.join(__dirname, 'src/components')

      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
}
