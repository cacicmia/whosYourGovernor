<template>
  <div class="content-container content-container--padded header">
      <div class="header__logo-container">
          <Logo/>
      </div>
      <LanguageSelection/> 
      
  </div>
</template>

<script>
import Logo from '../../assets/Icon-Menu-logo.svg';
import LanguageSelection from './LanguageSelection.vue'

export default {
    components: {
        Logo,
        LanguageSelection
    }
}
</script>
