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
import WaitingRoom from './components/WaitingRoom.vue'
import PreFinals from './components/PreFinals.vue'

export default {
  name: 'app',
  components: {
    PreFinals,
    Categories,
    HostWelcome,
    TasteTestSetup,
    MeleeRating,
    HeadToHead,
    HostInstructions,
    HostInstructionsTwo,
    WaitingRoom
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
  margin-top: 40px;
}

h1 {
  margin: 0 auto;
}

button {
  font-size: 30px;
  color: #a600d8;
  background: #eaeaea;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

li {
  padding: 5px 0;
}

.user-input-field {
  font-size: 20px;
  width: 90%;
  height: 50px;
  max-width: 400px;
  text-align: center;
  border: 2px solid #a600d8;
  color: #a600d8;
  margin: 50px auto 40px auto;
}

.challenger-card {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  background-color: #fbfbfb;
  box-shadow: -1px 2px 4px #d3d3d3;
  padding-left: 5px;
  padding-right: 20px;
}

.scream-text {
    font-weight: 900;
    font-size: 60px;
    color: #ff73d5;
    margin: 30px auto;
}

</style>
