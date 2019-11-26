<template>
  <div>
    <div>
      <p> logo here? something animated? </p>
    </div>
    <div>
      <h3>Prepare for the Semifinals</h3>
      <h4>There are currently {{players}} judges for this taste test</h4>
    </div>
    <div v-if="role==='host'">
      YOURE THE HOST
      <button @click ='forceNext'>Force Next Round</button>
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
    forceNext:(event) => {
      this.$store.commit('setTopFour')
      this.$store.state.newSocket.send(JSON.stringify({
        'method':'changeScene',
        'payload':"HeadToHead"
      }))
    }
  }
}
</script>

<style scoped>

</style>