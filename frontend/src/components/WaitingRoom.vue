<template>
  <div class='waiting-room-container'>
    <div class='logo-wrapper'>
      <div class='flavordome-logo'></div>
    </div>
    <div class='waiting-message'>
      <h1 class='instruction-text-pink'>Waiting for other users</h1>
      <p class='instruction-text-dark'>There are currently {{players}} judges for this taste test</p>
      <!-- <p>If you are the only current judge then something went wrong</p> -->
    </div>
    <div v-if="role==='host'">
      YOURE THE HOST
      <button @click ='forceNext'>Force Next Round</button>
    </div>
  </div>
</template>

<script>
export default {
  name:'WaitingRoom',
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
    }
  },
  methods:{
    forceNext:(event) => {
      this.$store.state.newSocket.send(JSON.stringify({
        'method':'advanceRound',
        'payload':null
      }))
    }
  }
}
</script>

<style scoped>

.waiting-message {
  margin-top: 35%;
}

</style>