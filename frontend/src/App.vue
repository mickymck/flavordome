<template>
  <div id="app">
    <!-- rendered component changes based on which one is dictated by fdComponent... moveToSetup method called by the listener on the setupScene event emitted on the Host button in HostWelcome -->
    <!-- <component v-bind:is="fdComponent" @setupScene='moveToSetup' @cancelTestName='backToWelcome'></component> -->
    <Champions></Champions>
  </div>
</template>

<script>
import Categories from './components/Categories.vue'
import HostWelcome from './components/HostWelcome.vue'
import TasteTestSetup from './components/TasteTestSetup.vue'
import Champions from './components/Champions.vue'

export default {
  name: 'app',
  components: {
    Categories,
    HostWelcome,
    TasteTestSetup,
    Champions,
  },

  // this will be responsible for determining which component is currently rendered in the app. default is HostWelcome, but it can be toggled
  data:() => {
    return {
      fdComponent: HostWelcome
    }
  },
  // method that toggles the rendered component to TasteTestSetup. currently being used when Host button is clicked, but can re-use this for going Back to the beginning of the setup, if desired
  methods: {
    moveToSetup() {
      this.fdComponent = TasteTestSetup
    },
    backToWelcome() {
      this.fdComponent = HostWelcome
    },
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

button {
  font-size: 32px;
}

</style>
