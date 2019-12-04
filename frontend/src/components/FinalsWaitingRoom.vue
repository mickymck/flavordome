<template>
  <div class='pre-finals-container'>
    <div class='logo-wrapper'>
      <div class='flavordome-logo'></div>
    </div>
    <div class="instructions-wrapper">
      <h1 class='scream-text'>Prepare for the Finals!</h1>
      <p class='instruction-text-dark'>Currently waiting on {{this.players - this.ready}} results to be submitted</p>
    </div>
    
    <div v-if="role==='host'">
      <!-- YOURE THE HOST -->
      <div v-if='players === ready'>
        <button @click='forceNext'>On to the Finals</button>
      </div>
      <div v-if='players !== ready'>
        <button @click='forceNext'>Force To the Finals</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'PreFinals',
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
    ready(){
      return this.$store.getters.getReadyPlayers
    }
  },
  methods:{
    forceNext:function(event) {
      this.$store.commit('setFinalists')
      this.$store.state.newSocket.send(JSON.stringify({
        'method':'setupFinals',
        'payload':this.$store.state
      }))
      this.$store.state.newSocket.send(JSON.stringify({
        'method':'changeScene',
        'payload':"Finals"
      }))
    }
  }
}
</script>

<style scoped>

h1 {
    padding-top: 20px;
    font-size:1.8rem;
}
.instructions-wrapper{
  margin-top:18%;
}

.pre-finals-container p {
  margin-top: 0;
}

</style>