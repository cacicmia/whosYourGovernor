<template>
  <div class="page">
      <div class="block1 content-container content-container--padded">
        <div class="block1__heading-container">
            <h1>{{$t("block1.heading1")}} <b>{{$t("block1.heading2")}}</b></h1>
        </div>
        <div class="block1__flex-container">
            <div class="block1__form-container">
                <div class="block1__input-fields-container">
                    <label for="county">{{$t('block1.county_label')}}</label>
                    <input type="text" id="county" name="county" :placeholder="$t('block1.county_placeholder')">
                    <label for="town">{{$t('block1.town_label')}}</label>
                    <input type="text" id="town" name="town" :placeholder="$t('block1.town_placeholder')">
                </div>
                <div class="form__button-container">
                    <button class="btn btn-primary">
                        {{$t('block1.submit_button_text')}}
                    </button>
                </div>
            </div>
            <div class="block1__svg-container">
                <div class="block1__svg-background"></div>
            </div>
        </div>
      </div>
      <div class="block2">
            <div class="block2__heading-container">
                <h2>{{$t("block2.heading")}} </h2>
            </div>
            <div class="block2__info-wrappper content-container content-container--padded">

            </div>
        </div>

      </div>    
  </div>
</template>

<script>
export default {
   
}
</script>

<style>

</style>