<template>
  <div class='pre-finals-container'>
    <div class='logo-wrapper'>
      <div class='flavordome-logo'></div>
    </div>
    <div>
      <h1>Prepare for the Semifinals</h1>
      <p class='instruction-text-dark'>Currently waiting on {{this.players - this.ready}} results to be submitted</p>
    </div>
    
    <div v-if="role==='host'">
      <!-- YOURE THE HOST -->
      <div v-if='players === ready'>
        <button @click='forceNext'>On To The Finals</button>
      </div>
      <div v-if='players !== ready'>
        <button @click='forceNext'>Force Next Round</button>
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
      this.$store.state.newSocket.send(JSON.stringify({
        'method':'setTopFour',
        'payload':null
      }))
      this.$store.state.newSocket.send(JSON.stringify({
        'method':'changeScene',
        'payload':"HeadToHead"
      }))
    }
  }
}
</script>

<style scoped>

h1 {
    padding-top: 20px;
    color: white;
}

.pre-finals-container p {
  margin-top: 0;
}

</style>