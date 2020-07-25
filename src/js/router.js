import Vue from 'vue'
import Router from 'vue-router'
import { defaultLocale } from './config/i18n.js'
Vue.use(Router)

export default new Router({
    routes: [
       {
           path: '/',
           redirect: `/${defaultLocale}`
       },
       {
        path: '/:locale',
        component: {
            template: '<router-view />',
            },
       }
    ]
})