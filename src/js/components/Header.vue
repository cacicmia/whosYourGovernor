<template>
  <header class="header content-container content-container--padded">
      <div class="header__logo-container">
          <Logo/>
      </div>
      <LanguageSelection/> 
      
  </header>
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
