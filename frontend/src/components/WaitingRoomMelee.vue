<template>
  <div class='waiting-room-container'>
      <div class='waiting-melee'>
      <div class='logo-wrapper'>
        <div class='flavordome-logo'></div>
      </div>
      <div class='waiting-melee-text'>
        <h1>Waiting for all scores</h1>
        <p class='instruction-text-dark'>We are still waiting for {{players - readyPlayers}} judges to give scores</p>
      </div>
      <div v-if="role==='host'">
        YOURE THE HOST
        <button @click ='forceNextMelee'>Force Next Round</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'WaitingRoomMelee',
  data:() =>{
    return{
    }
  },

  computed:{
    role(){
      return this.$store.getters.getRole
    },
    players(){
      return this.$store.getters.getPlayerCount
    },
    readyPlayers(){
      return this.$store.getters.getReadyPlayers
    }
  },
  methods:{

    resetMeleeScoreCount:function(){
      this.$store.state.newSocket.send(JSON.stringify({
        'method':'resetMeleeScoreCount',
        'payload': null
      }))
    },
    
    forceNextMelee:function() {
      this.resetMeleeScoreCount()
      let nextChallenger = this.$store.commit('getNextChallenger')
      this.$store.commit('setNextChallenger')
      this.$store.state.newSocket.send(JSON.stringify({
        'method':'setNextChallenger', 
        'payload':nextChallenger
      })) 
      this.$store.commit('changeScene', "MeleeRating") 
    }
  }
}
</script>

<style scoped>

.waiting-text {
  margin-top: 30px;
}

</style>