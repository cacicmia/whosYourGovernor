<template>
  <div class="header__language-selection">
        
    <router-link
        v-for="locale in locales"
        :key="locale.code"
        :to="`/${locale.code}`"
        class="header__locale-link"
    >
    <span class="header__locale-name">{{locale.code}}</span>
    </router-link>
  </div>
</template>

<script>
import { locales } from '../config/i18n.js'

export default {
    mounted() {
        this.$i18n.locale = this.$route.params.locale
    },
    data() {
      return {
        locales
      }
    },
    computed: {
      currentLocale() {
        
        return this.$route.params.locale
      },
    },
    watch: {
      currentLocale: function(val){
        this.$i18n.locale = val;
      }
    }
    
}
</script>

<style>

</style>