<template>
  <div id="app">
    <HostWelcome msg="Welcome to FLAVORDOME"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import HostWelcome from './components/HostWelcome.vue'

export default {
  name: 'app',
  components: {
    HostWelcome
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
