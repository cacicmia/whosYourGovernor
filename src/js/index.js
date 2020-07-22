import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App.vue'
import router from './router'
import {translations} from './config/translations.js'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en',
  translations
})
new Vue({
    render: h => h(App),
    router,
    i18n
  }).$mount('#app')
  console.log('trrr', translations);
