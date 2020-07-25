import Vue from 'vue'

import VueI18n from 'vue-i18n'
import 'select2'
import App from './App.vue'
import router from './router'
import {messages} from './config/translations.js'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages
})

new Vue({
    render: h => h(App),
    router,
    i18n
   
  }).$mount('#app')


