<template>
  <div class="header__language-selection">
        <!-- {{$t("blah")}} -->
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
import { locales } from '../config/i18n'

export default {
    mounted() {
        console.log(this.$route.params);
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
}
</script>

<style>

</style>