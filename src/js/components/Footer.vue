<template>
  <footer class="footer">
      <div class="content-container content-container--padded footer__container">
        <div class="footer__block">
            <p><a :href="$root.$options.i18n.t('footer.web')">{{$t("footer.web")}}</a></p>
            <p><a :href="`mailto:${$root.$options.i18n.t('footer.mail')}`">{{$t("footer.mail")}}</a></p>
        </div>
        <div class="footer__block">
            <p>{{$t("footer.name")}}</p>
            <p>{{$t("footer.location")}}</p>
        </div>
        <div class="footer__block">
            <p>{{$t("footer.app_name")}}</p>
            <p>{{$t("footer.app_text")}}</p>
        </div>
    </div>
  </footer>
</template>

<script>
export default {

}
</script>

<style>

</style>