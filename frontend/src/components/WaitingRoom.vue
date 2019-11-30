<template>
  <div class='waiting-room-container'>
    <div>
      <p> logo here? something animated? </p>
    </div>
    <div>
      <h3>Waiting for other users</h3>
      <h4>There are currently {{players}} judges for this taste test</h4>
      <p>If you are the only current judge then something went wrong</p>
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

</style>