<template>
  <div class='waiting-room-container'>
    <div class='waiting-melee'>
      <div class='logo-wrapper'>
        <div class='flavordome-logo'></div>
      </div>
      <div class='waiting-melee-text'>
        <h1 class='instruction-text-pink'>Waiting for all scores</h1>
        <p class='instruction-text-dark'>We are still waiting for {{players - readyPlayers}} judges to give scores</p>
      </div>
      <div v-if="role==='host'">
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
      this.$store.commit('chooseNextChallenger')
      let nextChallenger = this.$store.getters.getCurrentChallenger
      if(nextChallenger === undefined){
        this.$store.state.newSocket.send(JSON.stringify({
          'method':'changeScene', 
          'payload':'PreFinals'
        })) 
        return
      }
      this.$store.state.newSocket.send(JSON.stringify({
        'method':'sendNextChallenger', 
        'payload':nextChallenger
      })) 
      this.$store.state.newSocket.send(JSON.stringify({
        'method':'forceMelee',
        'payload': null
      }))
    },

    
    
    // forceNextMelee:function() {
    //   this.resetMeleeScoreCount()
    //   this.$store.commit('chooseNextChallenger')
    //   let nextChallenger = this.$store.getters.getCurrentChallenger
    //   if(nextChallenger === undefined){
    //     this.$store.state.newSocket.send(JSON.stringify({
    //       'method':'changeScene', 
    //       'payload':'HeadToHead'
    //     })) 
    //   }
    //   this.$store.state.newSocket.send(JSON.stringify({
    //     'method':'sendNextChallenger', 
    //     'payload':nextChallenger
    //   })) 
    //   this.$store.state.newSocket.send(JSON.stringify({
    //     'method':'changeScene', 
    //     'payload': 'MeleeRating'
    //   })) 
    // }
  }
}
</script>

<style scoped>

h1 {
  color: #ff73d5;
}

.waiting-room-container {
  animation: 0.5s fadeIn;
}

@keyframes fadeIn {
  from {opacity:0;}
  to {opacity:1;}
}

.waiting-melee-body {
  padding-top: 100px;
}

.waiting-melee-text {
  margin-top: 20%;
}

</style>