<template>
  <div id="app">
    <!-- rendered component changes based on which one is dictated by fdComponent... moveToSetup method called by the listener on the setupScene event emitted on the Host button in HostWelcome -->
    <component v-bind:is="this.scene" @setupScene='moveToSetup' @cancelTestName='backToWelcome'></component>
  </div>
</template>

<script>
import HeadToHead from './components/HeadToHead.vue'
import Categories from './components/Categories.vue'
import HostWelcome from './components/HostWelcome.vue'
import TasteTestSetup from './components/TasteTestSetup.vue'
import MeleeRating from './components/MeleeRating.vue'
import HostInstructions from './components/HostInstructions.vue'
import HostInstructionsTwo from './components/HostInstructionsTwo.vue'

export default {
  name: 'app',
  components: {
    Categories,
    HostWelcome,
    TasteTestSetup,
    MeleeRating,
    HeadToHead,
    HostInstructions,
    HostInstructionsTwo
  },

  // this will be responsible for determining which component is currently rendered in the app. default is HostWelcome, but it can be toggled
  data:() => {
    return {
    }
  },
  // method that toggles the rendered component to TasteTestSetup. currently being used when Host button is clicked, but can re-use this for going Back to the beginning of the setup, if desired
  methods: {
    moveToSetup() {
      this.$store.commit('changeScene',"TasteTestSetup")
    },
    backToWelcome() {
      this.$store.commit('changeScene', "HostWelcome")
    },
    moveToHostInstructions() {
      this.$store.commit('changeScene',"HostInstructions")
    }
  },
  computed:{
    scene (){
      return this.$store.state.scene
    }
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
