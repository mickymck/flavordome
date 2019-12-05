<template>
  <div id="app">
    <!-- rendered component changes based on which one is dictated by fdComponent... moveToSetup method called by the listener on the setupScene event emitted on the Host button in HostWelcome -->
    <component v-bind:is="this.scene" @setupScene='moveToSetup' @cancelTestName='backToWelcome'></component>
    <!-- <Champions></Champions> -->
  </div>
</template>

<script>
import HeadToHead from './components/HeadToHead.vue'
import Categories from './components/Categories.vue'
import HostWelcome from './components/HostWelcome.vue'
import TasteTestSetup from './components/TasteTestSetup.vue'
import Champions from './components/Champions.vue'
import MeleeRating from './components/MeleeRating.vue'
import FinalRankings from './components/FinalRankings.vue'
import HostInstructions from './components/HostInstructions.vue'
import HostInstructionsTwo from './components/HostInstructionsTwo.vue'
import WaitingRoom from './components/WaitingRoom.vue'
import PreFinals from './components/PreFinals.vue'
import WaitingRoomMelee from './components/WaitingRoomMelee.vue'
import Beyond from './components/Beyond.vue'
import FinalsWaitingRoom from './components/FinalsWaitingRoom.vue'
import Finals from './components/Finals.vue'
import RankingsWaitingRoom from './components/RankingsWaitingRoom.vue'
import ContestantsWrapper from './components/ContestantsWrapper.vue'


export default {
  name: 'app',
  components: {
    PreFinals,
    Categories,
    HostWelcome,
    TasteTestSetup,
    MeleeRating,
    HeadToHead,
    FinalRankings,
    HostInstructions,
    HostInstructionsTwo,
    WaitingRoom,
    WaitingRoomMelee,
    Beyond,
    FinalsWaitingRoom,
    Finals,
    RankingsWaitingRoom,
    Champions,
    ContestantsWrapper
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
    },
    waitForNextMeleeRound(){
      this.$store.commit('changeScene',"MeleeWaitingRoom")
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
*{
  margin:0;
  padding:0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #707070;
  margin-top: 0;
  background: url('https://flavordome.s3.us-east-2.amazonaws.com/flavordome-background-mobile.png') no-repeat;
  background-position: center top;
  background-size: 100%;
  height: 700px;
}

.flavordome-logo {
  width: 80%;
  min-width: 250px;
  max-width: 500px;
  height: 100px;
  max-height: 210px;
  background-image: url('https://flavordome.s3.us-east-2.amazonaws.com/flavordome-logo-small.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  margin: 0 auto;
}

.beyond-flavordome-logo {
  width: 40%;
  min-width: 150px;
  max-width: 200px;
  min-height: 50px;
  background-image: url('https://flavordome.s3.us-east-2.amazonaws.com/beyond-flavordome-logo-big.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  margin: 0 auto;
}

.logo-wrapper {
  max-height: 180px;
  padding-top: 20px;
}

h1 {
  margin: 0 auto;
  font-size: 30px;
  color: white;
}

button {
  font-size: 30px;
  text-align: center;
  padding: 5px 20px;
  background-color: #45c3f6;
  border: 2px solid white;
  color: white;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: transform .1s ease-out;
  margin-top: 30px;
}

.cancel-button {
  background-color: white;
  border: 2px solid #ff73d5;
  color: #ff73d5;
}

button:hover {
  cursor: pointer;
  transform: scale(1.1);
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

li {
  padding: 5px 0;
}

input.user-input-field {
  font-size: 20px;
  width: 90%;
  height: 50px;
  max-width: 400px;
  text-align: center;
  border: 2px solid #a600d8;
  color: #a600d8;
  margin: 30px auto 0 auto;
  border-radius: 5px;
}

input.user-input-field:focus {
  border-color: #ff73d5;
}

::placeholder {
  color: #bbbbbb;
}

/* .challenger-card {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  background-color: #fbfbfb;
  box-shadow: -1px 2px 4px #d3d3d3;
  padding-left: 5px;
  padding-right: 20px;
} */

.challenger-card {
  display: flex;
  justify-content: space-between;
  margin: 10px auto 0 auto;
  color: #a600d8;
  background-color: #fbfbfb;
  box-shadow: -1px 2px 4px #b4b4b4;
  padding: 10px;
  max-width: 800px;
}

.go-back-text {
  color: #ff73d5;
  margin: 0 auto;
  padding-top: 30px;
  font-size: 24px;
  font-weight: 500;
  transition: transform .1s ease-out;
}

.go-back-text:hover {
  cursor: pointer;
  transform: scale(1.1);
}

.scream-text {
    font-weight: 900;
    font-size: 48px;
    color: #ff73d5;
    margin: 0 auto;
    padding-top: 30px;
    width: 90%;
    max-width: 800px;
}

.instruction-text {
  color: white;
  font-weight: 700;
  padding-top: 20px;
  font-size: 20px;
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
}

.instruction-text-dark {
  color: #707070;
  font-weight: 700;
  padding-top: 20px;
  font-size: 20px;
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
}

.instruction-text-pink {
  color: #ff73d5;
  font-weight: 700;
  padding-top: 20px;
  font-size: 20px;
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
}

</style>
