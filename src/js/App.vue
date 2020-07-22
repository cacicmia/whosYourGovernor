<template>
  <div class="app-container">
    <div class="clip-container">

    </div>
    <Header/>
      
      
  </div>
</template>

<script>
import Header from './components/Header.vue'
export default {
  mounted() {
    console.log('mounted app');
  },
  components: {
    Header,

  }
}
</script>
