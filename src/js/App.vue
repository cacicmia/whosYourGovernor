<template>
  <div class="app-container">
    <div class="clip-container">

    </div>
    <Header/>
    <Content/>
    <Footer/>
      
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Content from './components/Content.vue'
import Footer from './components/Footer.vue'

export default {
  mounted() {
    console.log('mounted app');
  },
  components: {
    Header,
    Footer,
    Content
  }
}
</script>
